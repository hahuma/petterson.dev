export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-300 mx-auto flex justify-between items-center text-sm text-text-muted">
        <span className="font-mono">// Built with Next.js</span>
        <span className="font-mono">
          <span className="text-accent-purple">const</span> year ={' '}
          <span className="text-accent-cyan">{currentYear}</span>;
        </span>
      </div>
    </footer>
  );
}
