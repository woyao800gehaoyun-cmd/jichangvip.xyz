# 硬核极客测速站

面向真实测速、晚高峰跑分、流媒体解锁检测与线路拓扑分析的纯静态中文博客。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`，可直接部署到 GitHub Pages 或 Cloudflare Pages。

## 发布

- GitHub Pages：仓库已包含 `.github/workflows/deploy.yml`，在仓库 Settings → Pages 中选择 GitHub Actions 即可。
- Cloudflare Pages：构建命令填写 `npm run build`，输出目录填写 `dist`。
- 自定义域名：`public/CNAME` 当前配置为 `jichangvip.xyz`。

## 内容说明

首页测速数字为上线界面样本，站内已明确标注，不作为实际购买建议。发布正式测评时，请同步保存原始截图、测试时间、客户端版本、测试节点和路由记录。
