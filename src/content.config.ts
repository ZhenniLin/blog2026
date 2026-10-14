import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章：src/content/articles/*.md
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // 最近内容更新时间，决定文章列表与首页精选的顺序
    updatedAt: z.coerce.date().optional(),
    // 文章创作或生活所在的 base 地
    base: z.string(),
    // 分类会自动变成「文章」页面顶部的筛选标签
    category: z.string().default('未分类'),
    summary: z.string().optional(),
    // 首页「精选文章」只展示 featured: true 的文章
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// 日常：src/content/daily/*.md（正文即碎碎念内容）
const daily = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/daily' }),
  schema: z.object({
    date: z.coerce.date(),
    // 图片放 public/images/ 下，这里写 /images/xxx.jpg
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    imageWidth: z.number().int().positive().default(300),
    imageHeight: z.number().int().positive().default(300),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, daily };
