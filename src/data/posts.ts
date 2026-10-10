import { seoPosts } from './seoPosts';
import { airportReviews } from './airportReviews';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: '红黑榜' | '客户端实操' | '线路探秘' | '机场推荐' | '机场评测' | '机场指南' | '客户端教程' | '故障排查';
  date: string;
  dateLabel: string;
  readTime: string;
  tag: string;
  featured?: boolean;
  score?: number;
  verdict?: '推荐' | '观望' | '预警';
  affiliateName?: string;
  affiliateHref?: string;
  content: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: 'october-2026-red-black-list',
    title: '10 月红黑榜：别只看峰值，稳定性才是硬通货',
    excerpt: '以晚高峰丢包、跨网波动、节点可用率与工单响应为四条主轴，建立可复测的月度观察框架。',
    category: '红黑榜',
    date: '2026-10-06',
    dateLabel: '2026.10.06',
    readTime: '8 min',
    tag: 'MONTHLY / 010',
    featured: true,
    score: 8.7,
    verdict: '推荐',
    content: [
      {
        heading: '本月结论先行',
        paragraphs: ['一条线路是否值得长期使用，答案通常不在凌晨测速的峰值里，而在连续四周的晚高峰波动中。本期采用相同设备、相同落地与固定时间窗进行复测，优先观察 P95 延迟和持续丢包。'],
        bullets: ['推荐区：晚高峰波动小于 15%，节点可用率保持在 98% 以上', '观望区：峰值不错，但跨网一致性不足', '预警区：频繁更换入口、工单响应明显变慢或订阅域名异常']
      },
      {
        heading: '为什么不做“一次测速定输赢”',
        paragraphs: ['单次 Speedtest 很容易被测试节点、突发带宽和本地网络状态影响。我们更看重 20:00—23:30 的多时段采样，并将 TCP 下载、UDP 丢包和流媒体首开速度拆开记录。', '当前页面中的榜单卡片是站点上线样例，正式榜单会附上原始截图时间、测试节点、客户端版本与脱敏后的路由记录。']
      },
      {
        heading: '风险观察清单',
        paragraphs: ['价格突然大幅下探不是原罪，但当超售促销、节点缩减、客服失联同时出现时，就需要降低续费周期。任何服务都不建议一次性购买过长周期。'],
        bullets: ['优先月付或季付，避免沉没成本', '保留至少一条不同上游的备用线路', '关注入口 IP 与 ASN 是否频繁变化', '不要把“全解锁”当成永久承诺']
      }
    ]
  },
  {
    slug: 'sing-box-rule-set-practice',
    title: 'Sing-box 规则分流：从能用到可维护',
    excerpt: '用 rule-set、DNS 分流与 selector 组合，搭一套不会越改越乱的配置骨架。',
    category: '客户端实操',
    date: '2026-10-03',
    dateLabel: '2026.10.03',
    readTime: '12 min',
    tag: 'CONFIG / 024',
    content: [
      {
        heading: '先把配置分成三层',
        paragraphs: ['稳定的配置不应该把所有逻辑塞进一条巨大的规则列表。更可控的方式是拆成入口层、策略层和规则层：入口只处理协议，策略组负责选择，规则只描述流量去向。'],
        bullets: ['入口层：TUN、mixed inbound 与 sniff', '策略层：自动选择、手动选择与故障转移', '规则层：局域网、国内、流媒体、AI 服务与兜底']
      },
      {
        heading: 'DNS 是分流的一半',
        paragraphs: ['很多“规则没生效”其实是 DNS 路径与流量路径不一致。为直连域名和代理域名分别指定解析器，并确保 fake-ip 或 real-ip 策略与客户端环境一致，可以减少污染、绕路与首开缓慢。']
      },
      {
        heading: '维护策略',
        paragraphs: ['给每个远程规则集设置明确版本和更新间隔。变更前先保留上一个可用配置，并用小范围规则验证，而不是一次性替换整套订阅。'],
        bullets: ['规则集固定来源与版本', '策略组命名表达意图，不写供应商名', '为重要服务保留单独的手动覆盖入口']
      }
    ]
  },
  {
    slug: 'iplc-iepl-bgp-explained',
    title: 'IPLC、IEPL、BGP：三个标签到底在说什么',
    excerpt: '不背营销词，从入口、承载、出口和故障域四个维度看清线路结构。',
    category: '线路探秘',
    date: '2026-09-28',
    dateLabel: '2026.09.28',
    readTime: '10 min',
    tag: 'ROUTE / 017',
    featured: true,
    content: [
      {
        heading: '标签不等于体验',
        paragraphs: ['IPLC、IEPL 和 BGP 描述的是不同层面的网络特征，不能直接换算成速度排名。真正影响体验的，是入口距离、承载拥塞、跨境段稳定性、出口质量以及落地负载。']
      },
      {
        heading: '用四段模型读懂拓扑',
        paragraphs: ['把一条链路拆成用户到入口、入口到跨境承载、跨境到落地、落地到目标网站四段。每一段都可能成为瓶颈，也可能由不同运营方负责。'],
        bullets: ['入口：决定本地接入延迟与跨网表现', '承载：决定晚高峰稳定性与故障隔离', '落地：决定出口带宽、IP 质量与流媒体能力', '目标站：决定最终握手和内容分发速度']
      },
      {
        heading: '怎么验证而不是猜',
        paragraphs: ['普通 traceroute 只能看到部分表象，遇到隧道和不回 ICMP 的设备时尤其如此。应结合多地入口测试、不同协议对照、MTR 长时采样和故障时的路径变化做判断。']
      }
    ]
  },
  {
    slug: 'clash-verge-rev-health-check',
    title: 'Clash Verge Rev：健康检查与自动切换避坑',
    excerpt: '合理设置测试地址、间隔与容差，避免策略组在两个节点间反复横跳。',
    category: '客户端实操',
    date: '2026-09-22',
    dateLabel: '2026.09.22',
    readTime: '7 min',
    tag: 'CONFIG / 023',
    content: [
      {
        heading: '健康检查测到的不是全部',
        paragraphs: ['低延迟不一定等于高吞吐。健康检查适合判断可用性和基础响应，不适合单独决定所有业务的最佳节点。测试地址应稳定、轻量，并尽量贴近实际使用场景。']
      },
      {
        heading: '避免策略抖动',
        paragraphs: ['容差太小、间隔太短，会让策略组在相近节点之间频繁切换，反而打断长连接。建议根据线路波动设置合理容差，并为游戏或会议保留手动锁定策略。'],
        bullets: ['自动选择用于普通网页和下载', '故障转移用于高可用场景', '延迟敏感业务使用手动固定节点']
      }
    ]
  },
  {
    slug: 'dmit-route-observation-method',
    title: '上游观察：如何读一条 DMIT 路由',
    excerpt: '从 ASN、回程与跨网入口入手，建立一套可复用的上游线路观察方法。',
    category: '线路探秘',
    date: '2026-09-16',
    dateLabel: '2026.09.16',
    readTime: '9 min',
    tag: 'ROUTE / 016',
    content: [
      {
        heading: '先确认你在看去程还是回程',
        paragraphs: ['用户侧 traceroute 展示的是去程，服务商 Looking Glass 展示的通常是从机房出发的路径。两者可能完全不同，不能把一侧的结果直接当成双向结论。']
      },
      {
        heading: '记录比结论更重要',
        paragraphs: ['上游策略会变化。每次观察都应记录时间、测试端运营商、目标 IP、协议和工具参数，让后续变化有对照基线。'],
        bullets: ['分别测试电信、联通、移动', '保留至少 100 次 MTR 采样', '区分 ICMP 限速与真实丢包', '用业务下载验证路由推断']
      }
    ]
  },
  {
    slug: 'streaming-unlock-test-baseline',
    title: '流媒体解锁检测：通过不等于好用',
    excerpt: '把区域识别、内容可见、播放稳定与账号风控分开测，拒绝一行“全绿”截图。',
    category: '红黑榜',
    date: '2026-09-10',
    dateLabel: '2026.09.10',
    readTime: '6 min',
    tag: 'LAB / 031',
    score: 8.2,
    verdict: '观望',
    content: [
      {
        heading: '四层检测模型',
        paragraphs: ['解锁脚本显示通过，只能证明测试当下的区域判断。真正可用还包括首页内容是否完整、高清视频能否稳定播放、字幕和版权内容是否匹配，以及账号是否触发额外验证。'],
        bullets: ['区域层：IP 被识别到哪里', '目录层：目标版权内容是否出现', '播放层：首开、码率和持续缓冲', '账号层：登录、验证与家庭组限制']
      },
      {
        heading: '测试记录格式',
        paragraphs: ['每次检测应标注时间、落地地区、服务名称与播放结果。IP 库会变化，任何解锁结论都必须带有效期意识。']
      }
    ]
  }
];

posts.push(...seoPosts);
posts.push(...airportReviews);
posts.sort((a, b) => b.date.localeCompare(a.date));

export const categoryPath: Record<Post['category'], string> = {
  '红黑榜': '/reviews/',
  '客户端实操': '/guides/',
  '线路探秘': '/routes/',
  '机场推荐': '/recommendations/',
  '机场评测': '/reviews/',
  '机场指南': '/guides/',
  '客户端教程': '/guides/',
  '故障排查': '/guides/'
};
