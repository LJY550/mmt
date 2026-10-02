import { asset } from '@/lib/basePath';

type Props = {
  src: string;
  size: number;
  alt?: string;
  className?: string;
  ratio?: number; // 高 = size * ratio
};

/** 像素素材渲染器：统一关闭抗锯齿、按整数倍放大 */
export default function Sprite({ src, size, alt = '', className, ratio = 1 }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      width={size}
      height={Math.round(size * ratio)}
      style={{ width: size, height: Math.round(size * ratio), imageRendering: 'pixelated' }}
      loading="lazy"
      decoding="async"
    />
  );
}
