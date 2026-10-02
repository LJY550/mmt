import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { asset } from '@/lib/basePath';

export const metadata: Metadata = {
  title: {
    default: '黑白像素猫猫 · PIXEL CAT BLOG',
    template: '%s · 黑白像素猫猫',
  },
  description:
    '一只黑白像素猫的私人博客：记录代码、像素画与猫猫哲学。纯静态站点，使用 Next.js 构建。',
  keywords: ['像素猫', '博客', 'Next.js', '像素画', 'Markdown'],
  icons: { icon: asset('/sprites/cat-face.png') },
  openGraph: {
    title: '黑白像素猫猫 · PIXEL CAT BLOG',
    description: '记录代码、像素画与猫猫哲学的纯静态博客',
    type: 'website',
  },
};

// 首屏前应用主题，避免闪白/闪黑
const themeScript = `(function(){try{var t=localStorage.getItem('pixelcat-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=DotGothic16&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main className="site-main wrap">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
