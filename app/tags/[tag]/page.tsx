import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag, formatDate } from '@/lib/posts';
import PostCard from '@/components/PostCard';

type Params = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.tag }));
}

export async function generateMetadata({ params }: Params) {
  const { tag } = await params;
  const real = decodeURIComponent(tag);
  return { title: `#${real}`, description: `标签「${real}」下的全部文章` };
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params;
  const real = decodeURIComponent(tag);
  const posts = getPostsByTag(real);
  if (posts.length === 0) notFound();

  const allTags = getAllTags();

  return (
    <>
      <p style={{ marginTop: 36, fontSize: 13 }}>
        <Link href="/tags/" style={{ borderBottom: '2px solid currentColor' }}>
          ← 全部标签
        </Link>
      </p>
      <h1 className="post-title">#{real}</h1>
      <p style={{ color: 'var(--fg-soft)', fontSize: 13, marginBottom: 24 }}>
        这个标签下共有 {posts.length} 篇文章。
      </p>

      <div className="tag-cloud" style={{ marginBottom: 30 }}>
        {allTags.map((t) => (
          <Link
            key={t.tag}
            href={`/tags/${encodeURIComponent(t.tag)}/`}
            className="tag-cloud__item"
            data-active={t.tag === real ? 'true' : 'false'}
            style={t.tag === real ? { background: 'var(--fg)', color: 'var(--bg)' } : undefined}
          >
            #{t.tag}
            <span className="tag-cloud__count">{t.count}</span>
          </Link>
        ))}
      </div>

      <ul className="post-list">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </ul>
    </>
  );
}
