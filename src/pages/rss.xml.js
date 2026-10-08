import { posts } from '../data/posts';

export async function GET(context) {
  const site = context.site ?? new URL('https://jichangvip.xyz');
  const escape = (value) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char]);
  const items = posts.map(post => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${new URL(`/posts/${post.slug}/`, site)}</link>
      <guid>${new URL(`/posts/${post.slug}/`, site)}</guid>
      <pubDate>${new Date(`${post.date}T08:00:00+08:00`).toUTCString()}</pubDate>
      <description>${escape(post.excerpt)}</description>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0"><channel><title>硬核极客测速站</title><link>${site}</link><description>真实测速、流媒体解锁与线路拆解</description><language>zh-CN</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
