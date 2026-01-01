'use client';

import { useTypingEffect, useCursorGlow } from '@/hooks';
import { TerminalHeader, TerminalPrompt } from '@/components/ui';

const phrases = [
  'Backend Software Engineer',
  'Node.js Specialist',
  'API Architect',
  'Database Designer',
  'System Builder',
];

export function Hero() {
  const typingText = useTypingEffect({ phrases });
  const { glowRef, isVisible } = useCursorGlow();

  return (
    <section
      className="min-h-screen flex items-center justify-center relative py-30 px-6 overflow-hidden"
      id="hero"
    >
      {/* Cursor Glow Effect */}
      <div
        ref={glowRef}
        className={`fixed w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute font-mono text-xs text-text-muted opacity-0 animate-float left-[10%] top-[20%]" style={{ animationDelay: '0s' }}>
            const server = new Server();
          </span>
          <span className="absolute font-mono text-xs text-text-muted opacity-0 animate-float left-[75%] top-[15%]" style={{ animationDelay: '2s' }}>
            await db.connect();
          </span>
          <span className="absolute font-mono text-xs text-text-muted opacity-0 animate-float left-[60%] top-[70%]" style={{ animationDelay: '4s' }}>
            app.listen(3000);
          </span>
          <span className="absolute font-mono text-xs text-text-muted opacity-0 animate-float left-[5%] top-[60%]" style={{ animationDelay: '1s' }}>
            {'export { router };'}
          </span>
          <span className="absolute font-mono text-xs text-text-muted opacity-0 animate-float left-[80%] top-[45%]" style={{ animationDelay: '3s' }}>
            return Response.ok();
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[800px] w-full">
        <TerminalHeader title="petterson@dev: ~" variant="rounded-top" />

        <div className="bg-bg-secondary border border-white/5 border-t-0 rounded-b-xl p-8">
          <TerminalPrompt command="whoami" />

          <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.1] my-4 tracking-tight">
            <span className="block text-text-primary">Petterson</span>
            <span className="block bg-linear-to-br from-accent-cyan to-cyan-500 bg-clip-text text-transparent">
              Firmino
            </span>
          </h1>

          <TerminalPrompt command="cat role.txt" />

          <h2 className="font-mono text-[clamp(1rem,3vw,1.5rem)] font-normal text-accent-cyan mb-6 min-h-[2em]">
            <span>{typingText}</span>
            <span className="animate-blink">_</span>
          </h2>

          <TerminalPrompt command="echo $SUMMARY" />

          <p className="text-lg text-text-secondary mb-8 max-w-[600px]">
            Building <span className="text-accent-cyan font-medium">scalable backend systems</span> with 5+ years of experience.
            <br />
            Specializing in high-volume APIs, payment integrations, and multi-tenant SaaS platforms.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-sm font-medium rounded-lg bg-linear-to-br from-accent-cyan to-cyan-500 text-bg-primary hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(34,211,238,0.3)] transition-all duration-300 group"
            >
              <span>./contact.sh</span>
              <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-sm font-medium rounded-lg bg-transparent text-text-primary border border-white/10 hover:bg-white/5 hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300"
            >
              <span>view experience</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-scroll">
        <span className="font-mono text-xs text-text-muted uppercase tracking-widest">scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-accent-cyan to-transparent" />
      </div>
    </section>
  );
}
