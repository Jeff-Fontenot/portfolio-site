import ComingSoon from "@/components/ComingSoon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Coming Soon",
  robots: { index: false, follow: false }, // remove when page is ready
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ComingSoon
          title="About"
          blurb="I’m polishing the story behind IT Odyssey—mission, background, and what I’m building next."
        />
      </main>
      <Footer />
    </>
  );
}
