// @ts-check
import { defineConfig } from 'astro/config';

// 部署前把 site 换成你的正式域名（影响 sitemap / canonical / RSS 等绝对链接）
export default defineConfig({
  site: 'https://jennie.example.com',
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
