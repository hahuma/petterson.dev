import Link from 'next/link';
import { Nav, Footer } from '@/components/layout';
import { TerminalHeader, TerminalPrompt, Card } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="max-w-[600px] w-full">
          <Card className="rounded-xl overflow-hidden">
            <TerminalHeader title="error@petterson: ~" variant="flat" />
            <div className="p-8 bg-bg-secondary">
              <TerminalPrompt command="cat /var/log/error.log" />

              <div className="my-6">
                <span className="font-mono text-6xl font-bold text-accent-cyan">404</span>
                <h1 className="font-mono text-2xl text-text-primary mt-2">
                  Page not found
                </h1>
              </div>

              <TerminalPrompt command="echo $ERROR_MESSAGE" />
              <p className="font-mono text-text-secondary my-4 leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>

              <TerminalPrompt command="./navigate.sh" />
              <div className="flex gap-4 mt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium rounded-lg bg-accent-cyan text-bg-primary hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(34,211,238,0.3)] transition-all duration-300"
                >
                  <span>&lt;-</span>
                  <span>back to home</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium rounded-lg bg-transparent text-text-primary border border-white/10 hover:bg-white/5 hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300"
                >
                  <span>view blog</span>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
