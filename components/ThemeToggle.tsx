'use client';

import { useEffect, useState } from 'react';

/** 黑白反色切换（写入 localStorage + <html data-theme>） */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('pixelcat-theme', next ? 'dark' : 'light');
    } catch {
      /* 忽略隐私模式报错 */
    }
  }

  return (
    <button
      type="button"
      className="pixel-btn theme-toggle"
      onClick={toggle}
      aria-label={dark ? '切换为白底黑字' : '切换为黑底白字'}
      title={dark ? '白底黑字' : '黑底白字'}
    >
      {dark ? '☀' : '☾'}
    </button>
  );
}
