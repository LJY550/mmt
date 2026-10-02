import Link from 'next/link';
import Sprite from './Sprite';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <span className="footer-walk">
          <Sprite src="/sprites/cat-walk.png" size={60} ratio={0.6} alt="行走的像素猫" />
        </span>
        <span>
          © {new Date().getFullYear()} 黑白像素猫猫 ·{' '}
          <Link href="/about/" style={{ borderBottom: '2px solid currentColor' }}>
            关于本站
          </Link>
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--pixel-font)', fontSize: 9 }}>
          NEXT.JS · STATIC · NO BACKEND
        </span>
      </div>
    </footer>
  );
}
