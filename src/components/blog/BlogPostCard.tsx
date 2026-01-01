import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import type { PayloadPost } from '@/lib/payload';
import { formatDate } from '@/lib/format';

interface BlogPostCardProps {
  post: PayloadPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = post.publishedAt ? formatDate(post.publishedAt) : null;

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card hover="up" className="p-6 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <Badge variant="cyan">{post.category.name}</Badge>
            )}
            {formattedDate && (
              <span className="font-mono text-xs text-text-muted">{formattedDate}</span>
            )}
          </div>

          <h2 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent-cyan transition-colors">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 mt-auto">
            <span className="font-mono text-sm text-accent-cyan">Read more</span>
            <span className="font-mono text-accent-cyan">-&gt;</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
