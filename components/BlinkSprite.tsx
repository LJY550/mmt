import { asset } from '@/lib/basePath';

type Props = {
  src: string;
  blinkSrc: string;
  size: number;
  ratio?: number;
  alt?: string;
  className?: string;
};

/** 会眨眼的像素猫：两张帧图叠放，用 CSS steps 定时切换（纯 CSS，无 JS 定时器） */
export default function BlinkSprite({
  src,
  blinkSrc,
  size,
  ratio = 1,
  alt = '',
  className,
}: Props) {
  const h = Math.round(size * ratio);
  const px: React.CSSProperties = {
    width: size,
    height: h,
    imageRendering: 'pixelated',
  };
  return (
    <span className="blink-wrap" style={{ width: size, height: h }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(src)} alt={alt} width={size} height={h} style={px} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(blinkSrc)}
        alt=""
        aria-hidden
        className="blink-closed"
        width={size}
        height={h}
        style={px}
      />
    </span>
  );
}
