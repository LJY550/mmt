import Link from 'next/link';
import Sprite from '@/components/Sprite';

export const metadata = { title: '关于' };

export default function AboutPage() {
  return (
    <>
      <h1 className="post-title" style={{ marginTop: 36 }}>
        关于 · About
      </h1>

      <div className="about-grid" style={{ marginTop: 10 }}>
        <aside className="about-card">
          <Sprite src="/sprites/cat-sit.png" size={120} ratio={1.15} alt="站长的像素猫形象" />
          <p className="about-card__name">MEOW</p>
          <p className="about-card__meta">黑白像素猫猫 · 站长</p>
          <hr className="pixel-rule" />
          <p className="about-card__meta">品种：1-bit</p>
          <p className="about-card__meta">毛色：#000 / #fff</p>
          <p className="about-card__meta">爱好：晒太阳、踩键盘</p>
        </aside>

        <div className="prose">
          <p>
            你好，我是这个博客的站长 —— 一只住在显示器里的黑白像素猫。
            白天我趴在代码编辑器上打呼噜，晚上我把白天踩出来的字符整理成文章。
          </p>
          <p>
            这个站点的主题只有两个颜色：<b>黑</b>与<b>白</b>。
            没有圆角，没有渐变阴影，没有会转动的加载圈。
            所有图形都是一格一格画出来的像素点，包括你右上角那只一直在上下点头的猫。
          </p>

          <h2>我喜欢的三件事</h2>
          <ul>
            <li>
              <b>晒太阳</b> —— 窗台上那一格像素温度刚好。
            </li>
            <li>
              <b>踩键盘</b> —— 人类说这是 bug，我说这是 feature。
            </li>
            <li>
              <b>吃小鱼干</b> —— 见下图。
            </li>
          </ul>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center', margin: '24px 0' }}>
            <Sprite src="/sprites/fish.png" size={70} ratio={0.5} alt="小鱼" />
            <Sprite src="/sprites/yarn.png" size={60} ratio={0.77} alt="毛线球" />
            <Sprite src="/sprites/heart.png" size={40} ratio={0.75} alt="爱心" />
            <Sprite src="/sprites/cat-sleep.png" size={110} ratio={0.45} alt="睡觉的猫" />
          </div>

          <blockquote>
            <p>
              「如果一个网站在 1998 年的显示器上还能看，那它才算真的好看。」
              <br />
              —— 猫，趴在路由器上说的
            </p>
          </blockquote>

          <h2>站点技术规格</h2>
          <ul className="spec-list">
            <li>
              <b>框架</b>
              <span>Next.js（App Router）+ TypeScript</span>
            </li>
            <li>
              <b>渲染</b>
              <span>纯静态导出（output: &apos;export&apos;），构建产物是一个 out/ 文件夹</span>
            </li>
            <li>
              <b>内容</b>
              <span>本地 Markdown 文件，gray-matter 解析 frontmatter</span>
            </li>
            <li>
              <b>渲染管线</b>
              <span>remark + rehype（GFM 表格、标题锚点、代码高亮）</span>
            </li>
            <li>
              <b>后端</b>
              <span>无。没有数据库，没有接口，没有评论服务</span>
            </li>
            <li>
              <b>字体</b>
              <span>Press Start 2P（拉丁）+ DotGothic16（中文像素字）</span>
            </li>
            <li>
              <b>素材</b>
              <span>
                站内所有像素猫素材由 Python + Pillow 按 16×16 网格原创绘制，纯黑白、透明底，
                可自由使用
              </span>
            </li>
          </ul>

          <h2>怎么更新文章</h2>
          <p>在 <code>content/posts/</code> 里新建一个 <code>.md</code> 文件，写几行 frontmatter：</p>
          <pre>
            <code>{`---
title: 文章标题
date: 2026-10-02
tags: [像素, 随笔]
excerpt: 一句话摘要，不写就自动截取正文。
---

正文写在这里，支持 Markdown。`}</code>
          </pre>
          <p>
            然后跑一次 <code>npm run build</code>，新的静态页面就生成了。
            把 <code>out/</code> 丢到任何静态托管上都能跑。
          </p>

          <hr className="pixel-rule" />
          <p style={{ fontSize: 13 }}>
            想看文章？去
            <Link href="/" style={{ borderBottom: '2px solid currentColor' }}>
              首页
            </Link>
            ，或者逛逛
            <Link href="/tags/" style={{ borderBottom: '2px solid currentColor' }}>
              标签页
            </Link>
            。
          </p>
        </div>
      </div>
    </>
  );
}
