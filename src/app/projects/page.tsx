import ComingSoon from "@/components/ComingSoon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects — Coming Soon",
  robots: { index: false, follow: false },
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ComingSoon
          title="Projects"
          blurb="A portfolio index with write-ups, screenshots, architecture diagrams, and links to live demos & GitHub."
        />
      </main>
      <Footer />
    </>
  );
}
