---
title: 用 Next.js 做纯静态博客：从 0 到 out/
date: 2026-10-01
tags: [Next.js, 教程, 前端]
excerpt: App Router 静态导出加本地 Markdown，构建出一个可以直接丢到任何静态托管的博客。
---

这篇记录本站的完整搭建思路。核心诉求只有三条：**无后端**、**Markdown 写作**、**构建产物是一个文件夹**。

## 目录结构

```
pixel-cat-blog/
├── app/
│   ├── layout.tsx            # 外壳 + 主题脚本
│   ├── page.tsx              # 文章列表
│   ├── posts/[slug]/page.tsx # 文章详情
│   ├── tags/page.tsx         # 标签总览
│   ├── tags/[tag]/page.tsx   # 单标签
│   ├── about/page.tsx        # 关于
│   └── globals.css           # 像素风样式
├── components/               # 头部、卡片、精灵图组件
├── lib/posts.ts              # Markdown 读取 + 渲染
├── content/posts/*.md        # 内容本体
└── public/sprites/*.png      # 像素素材
```

## 打开静态导出

`next.config.mjs` 里一行就够：

```js
const nextConfig = {
  output: 'export',        // 构建成静态文件
  trailingSlash: true,     // 每页生成 index.html，任意静态托管都能认
  images: { unoptimized: true },
};
```

有了 `output: 'export'`，`next build` 不再产出 `.next` 服务器产物，而是 `out/`：

```
out/index.html
out/posts/hello-pixel-cat/index.html
out/tags/像素/index.html
out/about/index.html
```

## 读取 Markdown

所有文章都是本地文件，用 `fs` 在**构建期**读出来：

```ts
import matter from 'gray-matter';

export function getAllPosts() {
  return fs.readdirSync(POSTS_DIR)
    .map((f) => matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')))
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}
```

因为整个页面都在构建期求值，最终 HTML 里没有任何运行时数据请求——这就是"无后端"的含义。

## 渲染管线

用 unified 生态把 Markdown 变成 HTML 字符串：

```ts
const html = await unified()
  .use(remarkParse)        // Markdown → mdast
  .use(remarkGfm)          // 表格、删除线
  .use(remarkRehype)       // mdast → hast
  .use(rehypeSlug)         // 标题加 id
  .use(rehypeHighlight)    // 代码高亮
  .use(rehypeStringify)    // hast → HTML
  .process(content);
```

然后用 `dangerouslySetInnerHTML` 塞进页面。内容是自己写的本地文件，没有用户输入，没有 XSS 面。

## 预生成所有页面

动态路由必须给出全部参数，否则静态导出会失败：

```ts
export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}
```

标签页同理，`generateStaticParams()` 返回所有 tag。

## 三个容易踩的坑

1. **Next 15 的 params 是 Promise** —— 必须 `const { slug } = await params`
2. **不要在静态导出里用 `next/image` 的默认 loader** —— 要么 `unoptimized: true`，要么直接用 `<img>`
3. **客户端组件不能少** —— 需要 `usePathname` 做导航高亮、需要 `localStorage` 做主题记忆的部分，加 `'use client'`

## 部署

`out/` 是纯静态文件：

```bash
npm run build      # 产出 out/
npx serve out      # 本地预览
```

丢给 GitHub Pages、对象存储、Netlify、任何 Nginx 都行。没有 Node，没有数据库，没有月费。

> 猫 approval：一个能在 1998 年的机器上打开的站点，才是好站点。
