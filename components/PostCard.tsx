import Link from 'next/link';
import { formatDate, type PostMeta } from '@/lib/posts';
import Sprite from './Sprite';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <li>
      <Link href={`/posts/${post.slug}/`} className="post-card">
        <div className="post-card__head">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>· 约 {post.minutes} 分钟</span>
          <span>· {post.words} 字</span>
        </div>
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <div className="post-card__foot">
          <Sprite src="/sprites/paw.png" size={18} alt="猫爪" className="post-card__paw" />
          {post.tags.map((t) => (
            <span key={t} className="pixel-tag">
              #{t}
            </span>
          ))}
        </div>
      </Link>
    </li>
  );
}
