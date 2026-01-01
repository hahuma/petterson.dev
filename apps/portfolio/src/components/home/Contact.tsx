import { SectionHeader, TerminalHeader, TerminalPrompt, Card } from '@/components/ui';
import { ContactLinkCard } from './ContactLinkCard';
import { contactLinks } from '@/data/contact';

export function Contact() {
  return (
    <section className="py-20 md:py-30" id="contact">
      <div className="max-w-300 mx-auto px-6">
        <SectionHeader number="04" title="contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-15 items-start">
          <Card className="rounded-xl overflow-hidden">
            <TerminalHeader title="contact@petterson: ~" variant="flat" />
            <div className="p-6 bg-bg-secondary">
              <TerminalPrompt command="cat message.txt" />
              <p className="font-mono text-[0.95rem] text-text-secondary my-4 leading-[1.8]">
                I&apos;m always open to discussing new opportunities,
                <br />
                interesting projects, or just having a chat about
                <br />
                backend architecture and scalable systems.
              </p>
              <TerminalPrompt command="echo $STATUS" />
              <p className="flex items-center gap-2.5 font-mono text-[0.9rem] text-accent-green">
                <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse-dot" />
                Open to remote opportunities
              </p>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            {contactLinks.map((link) => (
              <ContactLinkCard key={link.href} link={link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
