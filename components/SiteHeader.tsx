'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BlinkSprite from './BlinkSprite';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: '/', label: '首页' },
  { href: '/tags/', label: '标签' },
  { href: '/about/', label: '关于' },
];

export default function SiteHeader() {
  const pathname = usePathname() || '/';

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="brand" aria-label="黑白像素猫猫 首页">
          <span className="brand__logo">
            <BlinkSprite
              src="/sprites/cat-face.png"
              blinkSrc="/sprites/cat-face-blink.png"
              size={38}
              ratio={0.65}
              alt="像素猫头像"
            />
          </span>
          <span>像素猫猫</span>
        </Link>

        <nav className="nav">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                data-active={active ? 'true' : 'false'}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
