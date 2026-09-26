import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import SwiperBadges from "@/components/SwiperBadges";
import { certifications } from "@/components/certifications";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Skills />
        {/* Certifications Section */}
        <section className="pt-8 pb-14">
          <div className="text-center">
            <div className="flex justify-center">
              <SwiperBadges items={certifications} />
            </div>
          </div>
        </section>
        <Projects />
        <Experience />
        <Education />
        <Footer />
      </main>
    </>
  );
}