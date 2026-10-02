/** @type {import('next').NextConfig} */

// GitHub Pages 是「项目站点」时，访问地址带仓库名前缀，例如 /mmt/。
// 本地开发 / 直接托管在根域名时不加前缀。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出：不依赖任何后端 / Node 运行时
  output: 'export',
  // 便于直接以任意子路径托管
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
