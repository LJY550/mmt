import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, formatDate } from '@/lib/posts';
import Sprite from '@/components/Sprite';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <article>
      <header className="post-head">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>约 {post.minutes} 分钟</span>
          <span>{post.words} 字</span>
          <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {post.tags.map((t) => (
              <Link key={t} href={`/tags/${encodeURIComponent(t)}/`} className="pixel-tag">
                #{t}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <div className="post-layout">
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.toc.length > 1 && (
          <aside className="toc">
            <p className="toc__title">▚ 目录</p>
            <ul className="toc__list">
              {post.toc.map((item) => (
                <li key={item.id} data-level={item.level}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <Sprite src="/sprites/paw.png" size={32} alt="猫爪" />
            </div>
          </aside>
        )}
      </div>

      <hr className="pixel-rule" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Sprite src="/sprites/heart.png" size={26} alt="爱心" />
        <span style={{ fontSize: 13, color: 'var(--fg-soft)' }}>
          感谢读到这里 —— 猫说它可以赏你一条小鱼干。
        </span>
      </div>

      <nav className="post-nav">
        {older ? (
          <Link href={`/posts/${older.slug}/`}>← {older.title}</Link>
        ) : (
          <span style={{ color: 'var(--fg-soft)' }}>已经是最早的一篇了</span>
        )}
        {newer ? (
          <Link href={`/posts/${newer.slug}/`}>{newer.title} →</Link>
        ) : (
          <span style={{ color: 'var(--fg-soft)' }}>已经是最新的一篇了</span>
        )}
      </nav>
    </article>
  );
}
