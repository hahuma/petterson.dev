import { Nav, Footer } from '@/components/layout';
import { SectionHeader } from '@/components/ui';
import { BlogPostCard } from '@/components/blog';
import { getPosts } from '@/lib/payload';
import { generateMetadata as createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Blog',
  description: 'Articles about backend development, system design, and software engineering.',
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-31 pb-20">
        <div className="max-w-300 mx-auto px-6">
          <SectionHeader number="01" title="blog" />

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-mono text-text-muted text-lg mb-4">
                // No posts found
              </p>
              <p className="text-text-secondary">
                Check back soon for new articles about backend development and system design.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
