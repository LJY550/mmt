import Link from 'next/link';
import BlinkSprite from '@/components/BlinkSprite';
import PostCard from '@/components/PostCard';
import { getAllPosts, getAllTags } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <section className="hero">
        <div>
          <h1 className="hero__title">
            <span className="cursor-blink">黑白像素猫猫</span>
          </h1>
          <p className="hero__desc">
            一个只用黑与白写作的博客。这里记录前端代码、像素画练习，
            以及一只猫对世界的全部看法。没有后端，没有数据库，只有一堆 Markdown 文件。
          </p>
          <div className="hero__stats">
            <span className="pixel-tag">{posts.length} 篇文章</span>
            <span className="pixel-tag">{tags.length} 个标签</span>
            <span className="pixel-tag">纯静态 · 0 KB 后端</span>
          </div>
        </div>
        <BlinkSprite
          src="/sprites/cat-sit.png"
          blinkSrc="/sprites/cat-sit-blink.png"
          size={130}
          ratio={1.15}
          alt="坐着的像素猫"
          className="hero__cat"
        />
      </section>

      <h2 className="section-title">最新文章</h2>
      <ul className="post-list">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </ul>

      <h2 className="section-title">标签</h2>
      <div className="tag-cloud">
        {tags.map((t) => (
          <Link key={t.tag} href={`/tags/${encodeURIComponent(t.tag)}/`} className="tag-cloud__item">
            #{t.tag}
            <span className="tag-cloud__count">{t.count}</span>
          </Link>
        ))}
      </div>

      <hr className="pixel-rule" />
      <p style={{ color: 'var(--fg-soft)', fontSize: 13 }}>
        想了解这个站点是怎么搭起来的？翻翻《
        <Link href="/posts/nextjs-static-blog/" style={{ borderBottom: '2px solid currentColor' }}>
          用 Next.js 做纯静态博客
        </Link>
        》，或者直接去
        <Link href="/about/" style={{ borderBottom: '2px solid currentColor' }}>
          关于页
        </Link>
        撸猫。
      </p>
    </>
  );
}
