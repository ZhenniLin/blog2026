# Jennie's Blog

像素风个人博客，基于 [Astro](https://astro.build) 的静态站点（纯静态输出，可直接部署）。

## 快速开始

```bash
npm run dev
```

打开 http://localhost:4321 即可预览，改文件会自动刷新。

其他命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 构建到 `dist/`（就是要部署的静态文件） |
| `npm run preview` | 本地预览构建结果 |

## 目录结构

```
src/
├─ config.ts               站点标题、首页文案、首页展示数量
├─ content.config.ts       文章/日常的字段定义（schema）
├─ content/
│  ├─ articles/            文章 Markdown，一篇一个文件
│  └─ daily/               日常 Markdown，一条一个文件
├─ pages/
│  ├─ index.astro          首页
│  ├─ about.md             「关于」页面（直接改 Markdown 即可）
│  ├─ articles/            文章列表页 + 文章详情页
│  └─ daily/               日常列表页
├─ data/sprites.ts         像素小动画的「字符画」，改造型来这里
├─ components/             页头、页脚、列表行、像素精灵等组件
├─ layouts/                页面骨架
└─ styles/global.css       全部配色与像素风样式
public/
├─ images/                 图片放这里，Markdown 里写 /images/xxx.jpg
└─ favicon.svg
```

## 怎么发一篇新文章

在 `src/content/articles/` 下新建一个 `.md` 文件，文件名就是网址（例如 `my-post.md` → `/articles/my-post/`）：

```markdown
---
title: '文章标题'
date: 2026-08-01
category: '跨境电商'      # 会自动出现在文章页顶部的筛选标签里
summary: '一句话摘要，用于 SEO'
featured: true            # true = 出现在首页「精选文章」
draft: false              # true = 不会被构建出来
---

正文用 Markdown 写就行。
```

分类不需要提前登记，写什么就有什么标签。

首页精选与文章列表按 `updatedAt`（最近内容更新时间）倒序排列，未填写时使用 `date`（发布日期）。新建或更新文章正文时，请同步填写 `updatedAt`，使用带时区的完整时间，例如 `2026-10-14T18:00:00+08:00`，以便区分同一天的更新；原有 `date` 保持不变。排版与全站样式调整无需改变文章更新时间。

## 怎么发一条日常

在 `src/content/daily/` 下新建 `.md`：

```markdown
---
date: 2026-08-01
image: /images/my-photo.jpg   # 可选，图片先放进 public/images/
imageAlt: '图片描述'
---

今天的碎碎念写在这里。
```

## 改文案 / 改配色

- 首页大标题、副标题、站点名：`src/config.ts`
- 关于页全部内容：`src/pages/about.md`
- 配色：`src/styles/global.css` 顶部的 `:root` 变量

```css
--c-orange: #ca6702;
--c-amber: #ee9b00;
--c-mint: #94d2bd;
```

## 像素小动画

`src/data/sprites.ts` 里每个小动画就是几帧 16×16 的「字符画」，构建时会转成 SVG 方块，用 CSS `steps()` 逐帧播放——没有任何图片请求，放大也不糊。

```ts
// . 透明 / o 深橙 / a 亮黄 / m 薄荷 / w 米白 / d 深色
'..ooo......ooo..',
'..oooooooooooo..',
'..ooodoooodooo..',   // 眼睛
```

现有的：`rabbit` 兔子（首页，耳朵交替抖动 + 眨眼，持续上下跳，鼠标移上去会跳一下）、`coffee` 咖啡（日常，冒热气）、`star` 星星（精选文章，一闪一闪）、`disk` 软盘（文章页，指示灯闪）、`ghost` 幽灵（404）、`mail` 信封（关于页）。

用法：`<PixelSprite name="rabbit" size={64} motion="bob" />`，`motion` 可选 `none` / `bob`（持续上下浮动，悬停时改成跳一下）/ `jump`（只在悬停时跳）。想新增一只，就在 `sprites.ts` 里照着写一组 16 行 × 16 列的字符画，帧数支持 2 / 3 / 4。

另外导航栏那枚金币、页脚三个方块、列表箭头的抖动都是纯 CSS 动画。所有动画都遵循系统的「减少动态效果」设置，开了就自动静止。

## 关于像素字体

- 英文/数字：`Press Start 2P`（npm 包，随项目安装）
- 中文：[Fusion Pixel 12px](https://github.com/TakWolf/fusion-pixel-font)，完整简体覆盖，**SIL OFL 1.1 协议**（商用免费），许可证在 `public/fonts/fusion/OFL.txt`

原始字体 647KB，已用 [cn-font-split](https://www.npmjs.com/package/cn-font-split) 按字频切成 54 片放在 `public/fonts/fusion/`，浏览器只下载页面实际用到的分片——实测「关于」页只加载 11 片约 200KB，且 `font-display: swap` 不阻塞首屏。

想换字体（比如换成 [Zpix](https://github.com/SolidZORO/zpix-pixel-font)，注意它是商业授权、个人使用免费）：

```bash
npx cn-font-split -i 你的字体.woff2 -o public/fonts/fusion
```

切完把 `result.css` 里的 `font-family` 名字填进 `global.css` 的 `--font-body` 即可。

字体是 12px 设计网格的点阵字，正文设成 12 / 24 这类整倍数字号最锐利；现在用的是 15px，可读性更好但边缘会稍微柔一点，想调就改 `global.css` 里 `body` 的 `font-size`。

## 部署

先把 `astro.config.mjs` 里的 `site` 改成你的正式域名。

- **Vercel / Netlify**：把代码推到 GitHub，导入仓库即可，会自动识别 Astro（构建命令 `npm run build`，输出目录 `dist`）。
- **Cloudflare Pages**：同上，构建命令 `npm run build`，输出目录 `dist`。
- **任意静态托管 / 自己的服务器**：`npm run build` 后把 `dist/` 整个目录传上去。
- **GitHub Pages**（项目页而非自定义域名时）：还需要在 `astro.config.mjs` 里加 `base: '/仓库名'`。
