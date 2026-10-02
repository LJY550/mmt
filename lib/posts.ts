import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  excerpt: string;
  tags: string[];
  minutes: number;
  words: number;
  draft?: boolean;
};

export type Post = PostMeta & {
  html: string;
  toc: TocItem[];
};

function readFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.markdown'));
}

function countWords(text: string) {
  const zh = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const en = (text.match(/[A-Za-z0-9]+/g) || []).length;
  return zh + en;
}

function toMeta(fileName: string, raw: string): PostMeta {
  const { data, content } = matter(raw);
  const slug = String(data.slug || fileName.replace(/\.md(?:own)?$/, ''));
  const plain = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = countWords(plain);
  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || '1970-01-01'),
    updated: data.updated ? String(data.updated) : undefined,
    excerpt: String(data.excerpt || plain.slice(0, 90) + (plain.length > 90 ? '…' : '')),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    minutes: Math.max(1, Math.round(words / 350)),
    words,
    draft: Boolean(data.draft),
  };
}

/** 全部文章，按时间倒序 */
export function getAllPosts(): PostMeta[] {
  return readFiles()
    .map((f) => toMeta(f, fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')))
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** 单篇文章 + 渲染后的 HTML + 目录 */
export async function getPost(slug: string): Promise<Post | null> {
  const file = readFiles().find(
    (f) => toMeta(f, fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')).slug === slug
  );
  if (!file) return null;
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { content } = matter(raw);
  const meta = toMeta(file, raw);

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHighlight, { detect: true, ignoreMissing: true })
      .use(rehypeStringify)
      .process(content)
  );

  const toc = buildToc(content);
  return { ...meta, html, toc };
}

function buildToc(md: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of md.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*`_]/g, '').trim();
    items.push({ id: slugger.slug(text), text, level: m[1].length });
  }
  return items;
}

export type TagInfo = { tag: string; count: number };

export function getAllTags(): TagInfo[] {
  const map = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) map.set(t, (map.get(t) || 0) + 1);
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function formatDate(d: string) {
  const [y, m, day] = d.split('-');
  return `${y}.${m}.${day}`;
}
