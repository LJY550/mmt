# 黑白像素猫猫 · PIXEL CAT BLOG

一个只用黑与白的像素风个人博客。**纯静态、零后端**：`next build` 的产物是一个 `out/` 文件夹，丢到任何静态托管上都能跑。

## 特性

- 🖤 严格黑白配色（1-bit 风），支持整站反色切换（右上角 ☾ / ☀），偏好存入 localStorage
- 🐱 全站素材（坐/走/睡的猫、猫爪、鱼、毛线球等）为 16×16 原创像素画，由 `scripts/gen_sprites.py` 生成
- 📝 Markdown 写作：frontmatter 元信息、GFM 表格、标题锚点目录、代码高亮（单色系样式）
- 🏷 标签分类：标签总览页 + 每个标签的独立列表页
- 📄 页面：文章列表 / 文章详情 / 标签 / 关于 / 404（睡觉的猫）
- ⚡ 静态导出：`output: 'export'`，每页生成 `index.html`，任意子路径可托管

## 快速开始

```bash
npm install
npm run dev      # 开发模式 http://localhost:3000
npm run build    # 产出纯静态 out/
npx serve out    # 本地预览静态产物
```

## 写文章

在 `content/posts/` 新建 `.md`：

```markdown
---
title: 文章标题
date: 2026-10-02
tags: [像素, 随笔]
excerpt: 一句话摘要，不写会自动截取正文。
---

正文支持 Markdown。
```

保存后重新 `npm run build` 即可。无需任何数据库或接口。

## 目录结构

```
├── app/                  # 页面（App Router）
│   ├── page.tsx          # 文章列表 + 标签云
│   ├── posts/[slug]/     # 文章详情（含目录）
│   ├── tags/[tag]/       # 标签筛选页
│   ├── about/            # 关于页
│   └── globals.css       # 像素风全局样式
├── components/           # 头部 / 卡片 / 精灵图 / 主题切换
├── content/posts/        # Markdown 文章
├── lib/posts.ts          # 读取与渲染 Markdown
├── public/sprites/       # 像素素材 PNG
└── scripts/gen_sprites.py  # 素材生成脚本（Python + Pillow）
```

## 素材说明

站内所有像素猫素材为原创手绘网格（Pillow 渲染，透明底、纯黑 `#000`），
参考了 OpenGameArt「Cats - Pixel Art」（CC-BY 4.0）等公开素材的造型思路后自行绘制，
可自由修改与使用。重新生成：`python scripts/gen_sprites.py`。

## 技术栈

Next.js 15 · React 19 · TypeScript · gray-matter · unified (remark/rehype) · Pillow
