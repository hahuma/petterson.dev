import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav, Footer } from '@/components/layout';
import { Badge } from '@/components/ui';
import { getPostBySlug, getAllPostSlugs, lexicalToHtml } from '@/lib/payload';
import { generateMetadata as createMetadata } from '@/lib/metadata';
import { formatDate } from '@/lib/format';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createMetadata({ title: 'Post Not Found' });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt || post.meta?.description || '',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt ? formatDate(post.publishedAt) : null;

  const htmlContent = lexicalToHtml(post.content);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-20">
        <article className="max-w-200 mx-auto px-6">
          <header className="mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent-cyan transition-colors mb-8"
            >
              <span>&lt;-</span>
              <span>back to blog</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <Badge variant="cyan">{post.category.name}</Badge>
              )}
              {formattedDate && (
                <span className="font-mono text-sm text-text-muted">{formattedDate}</span>
              )}
            </div>

            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-text-primary leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-text-secondary mt-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          <div
            className="prose text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent-cyan hover:text-text-primary transition-colors"
            >
              <span>&lt;-</span>
              <span>back to all posts</span>
            </Link>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
