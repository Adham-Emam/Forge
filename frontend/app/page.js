import {
  HeroSection,
  About,
  Features,
  HowItWorks,
  Testimonials,
  CTA,
  Footer,
} from "./components";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
