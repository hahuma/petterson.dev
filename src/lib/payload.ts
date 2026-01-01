const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api';

export interface PayloadPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: LexicalContent;
  featuredImage: PayloadMedia | null;
  category: PayloadCategory | null;
  tags: PayloadTag[];
  author: number | PayloadUser;
  status: 'draft' | 'published';
  publishedAt: string | null;
  meta: {
    title: string | null;
    description: string | null;
  };
  updatedAt: string;
  createdAt: string;
}

export interface PayloadCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PayloadTag {
  id: number;
  name: string;
  slug: string;
}

export interface PayloadUser {
  id: number;
  name: string;
  email: string;
}

export interface PayloadMedia {
  id: number;
  url: string;
  alt: string;
  filename: string;
}

export interface LexicalContent {
  root: LexicalNode;
}

export interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  listType?: string;
  url?: string;
  fields?: {
    url?: string;
  };
  [key: string]: unknown;
}

interface PayloadResponse<T> {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  totalDocs: number;
  totalPages: number;
}

export async function getPosts(): Promise<PayloadPost[]> {
  const response = await fetch(
    `${PAYLOAD_API_URL}/posts?where[status][equals]=published&sort=-publishedAt&depth=1`
  );

  if (!response.ok) {
    console.error('Failed to fetch posts:', response.statusText);
    return [];
  }

  const data: PayloadResponse<PayloadPost> = await response.json();
  return data.docs;
}

export async function getPostBySlug(slug: string): Promise<PayloadPost | null> {
  const response = await fetch(
    `${PAYLOAD_API_URL}/posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=1`
  );

  if (!response.ok) {
    console.error('Failed to fetch post:', response.statusText);
    return null;
  }

  const data: PayloadResponse<PayloadPost> = await response.json();
  return data.docs[0] || null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map(post => post.slug);
}

// Convert Lexical JSON to HTML
export function lexicalToHtml(content: LexicalContent): string {
  if (!content?.root?.children) {
    return '';
  }

  return content.root.children.map(node => nodeToHtml(node)).join('');
}

function nodeToHtml(node: LexicalNode): string {
  switch (node.type) {
    case 'paragraph':
      const pContent = node.children?.map(child => nodeToHtml(child)).join('') || '';
      return `<p>${pContent}</p>`;

    case 'heading':
      const tag = node.tag || 'h2';
      const hContent = node.children?.map(child => nodeToHtml(child)).join('') || '';
      return `<${tag}>${hContent}</${tag}>`;

    case 'text':
      let text = escapeHtml(node.text || '');
      const format = typeof node.format === 'number' ? node.format : 0;

      // Apply formatting (bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code)
      if (format & 1) text = `<strong>${text}</strong>`;
      if (format & 2) text = `<em>${text}</em>`;
      if (format & 4) text = `<s>${text}</s>`;
      if (format & 8) text = `<u>${text}</u>`;
      if (format & 16) text = `<code>${text}</code>`;

      return text;

    case 'link':
      const linkContent = node.children?.map(child => nodeToHtml(child)).join('') || '';
      const url = node.fields?.url || node.url || '#';
      return `<a href="${escapeHtml(String(url))}" target="_blank" rel="noopener noreferrer">${linkContent}</a>`;

    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul';
      const listContent = node.children?.map(child => nodeToHtml(child)).join('') || '';
      return `<${listTag}>${listContent}</${listTag}>`;

    case 'listitem':
      const liContent = node.children?.map(child => nodeToHtml(child)).join('') || '';
      return `<li>${liContent}</li>`;

    case 'quote':
      const quoteContent = node.children?.map(child => nodeToHtml(child)).join('') || '';
      return `<blockquote>${quoteContent}</blockquote>`;

    case 'code':
      const codeContent = node.children?.map(child => {
        if (child.type === 'code-highlight' || child.type === 'text') {
          return escapeHtml(child.text || '');
        }
        return nodeToHtml(child);
      }).join('') || '';
      return `<pre><code>${codeContent}</code></pre>`;

    case 'horizontalrule':
      return '<hr />';

    case 'linebreak':
      return '<br />';

    default:
      // For unknown node types, try to render children
      if (node.children) {
        return node.children.map(child => nodeToHtml(child)).join('');
      }
      return '';
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
