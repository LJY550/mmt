import Link from 'next/link';
import { getAllTags, getPostsByTag, formatDate } from '@/lib/posts';
import Sprite from '@/components/Sprite';

export const metadata = { title: '标签' };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <>
      <h1 className="post-title" style={{ marginTop: 36 }}>
        标签分类
      </h1>
      <p style={{ color: 'var(--fg-soft)', fontSize: 13, marginBottom: 24 }}>
        共 {tags.length} 个标签。点一个进去看看猫都写了些什么。
      </p>

      <div className="tag-cloud" style={{ marginBottom: 36 }}>
        {tags.map((t) => (
          <Link key={t.tag} href={`/tags/${encodeURIComponent(t.tag)}/`} className="tag-cloud__item">
            #{t.tag}
            <span className="tag-cloud__count">{t.count}</span>
          </Link>
        ))}
      </div>

      {tags.map((t) => (
        <section key={t.tag} style={{ marginBottom: 30 }}>
          <h2 className="section-title" id={t.tag}>
            #{t.tag}
            <span style={{ fontFamily: 'var(--body-font)', fontSize: 12, color: 'var(--fg-soft)' }}>
              {t.count} 篇
            </span>
          </h2>
          <ul className="post-list">
            {getPostsByTag(t.tag).map((p) => (
              <li key={p.slug}>
                <Link href={`/posts/${p.slug}/`} className="post-card">
                  <div className="post-card__head">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span>· 约 {p.minutes} 分钟</span>
                  </div>
                  <h3 className="post-card__title" style={{ fontSize: 14 }}>
                    {p.title}
                  </h3>
                  <p className="post-card__excerpt">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Sprite src="/sprites/yarn.png" size={80} ratio={0.77} alt="毛线球" />
      </div>
    </>
  );
}
