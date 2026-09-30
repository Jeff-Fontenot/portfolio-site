import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import MediaChannels from "@/components/MediaChannels";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Education />
        {/* <MediaChannels /> */}
        <Contact />
        <Footer />
      </main>
    </>
  );
}