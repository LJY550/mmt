import Link from 'next/link';
import Sprite from '@/components/Sprite';

export default function NotFound() {
  return (
    <div className="notfound">
      <Sprite src="/sprites/cat-sleep.png" size={200} ratio={0.45} alt="睡着的像素猫" />
      <h1 className="post-title">404 · 猫把这页叼走了</h1>
      <p style={{ color: 'var(--fg-soft)' }}>
        你要找的页面不存在，或者被猫埋进了猫砂盆。
      </p>
      <p style={{ marginTop: 24 }}>
        <Link href="/" className="pixel-btn">
          ← 回到首页
        </Link>
      </p>
    </div>
  );
}
