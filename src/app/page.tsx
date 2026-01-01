import { Nav, Footer } from '@/components/layout';
import { Hero, About, Experience, Skills, Contact } from '@/components/home';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
