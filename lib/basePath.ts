/**
 * 站点基础路径。
 * 本地开发 / 部署在根域名时为空；
 * 部署在 GitHub Pages 项目站点时为 `/<仓库名>`（构建期通过 NEXT_PUBLIC_BASE_PATH 注入）。
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** 给 public/ 下的静态资源路径加上基础路径前缀（next/link 会自动加，<img src> 需要手动加） */
export function asset(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}
