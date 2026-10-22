const site = new URL('https://jichangvip.xyz');
const key = '6f6b41a107584efdb1862e288805b095';
const keyLocation = new URL(`/${key}.txt`, site).href;
const sitemapIndex = new URL('/sitemap-index.xml', site).href;
const endpoint = 'https://api.indexnow.org/indexnow';

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchText(url, attempts = 6) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'jichangvip-indexnow/1.0' },
        signal: AbortSignal.timeout(20_000),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await wait(10_000);
    }
  }

  throw new Error(`Unable to read ${url}: ${lastError?.message ?? 'unknown error'}`);
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function extractLocations(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeXml(match[1]));
}

async function collectUrls() {
  const indexXml = await fetchText(sitemapIndex);
  const locations = extractLocations(indexXml);
  const sitemapUrls = locations.filter((url) => url.endsWith('.xml'));

  const pageUrls = sitemapUrls.length
    ? (await Promise.all(sitemapUrls.map(async (url) => extractLocations(await fetchText(url))))).flat()
    : locations;

  return [...new Set(pageUrls)].filter((url) => {
    try {
      return new URL(url).host === site.host;
    } catch {
      return false;
    }
  });
}

async function submit(urlList) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: site.host,
      key,
      keyLocation,
      urlList,
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (![200, 202].includes(response.status)) {
    const responseBody = await response.text();
    throw new Error(`IndexNow returned ${response.status}: ${responseBody || response.statusText}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URLs with status ${response.status}.`);
}

const publishedKey = (await fetchText(keyLocation)).trim();
if (publishedKey !== key) {
  throw new Error(`The published IndexNow key at ${keyLocation} does not match.`);
}

const urls = await collectUrls();
if (urls.length === 0) throw new Error('No published URLs were found in the sitemap.');

for (let offset = 0; offset < urls.length; offset += 10_000) {
  await submit(urls.slice(offset, offset + 10_000));
}
