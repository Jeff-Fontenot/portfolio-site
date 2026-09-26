import Link from "next/link";

export default function ComingSoon({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <section className="min-h-[80vh] grid place-items-center px-4 pt-24">
      <div className="glass-container max-w-2xl w-full mx-auto p-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          {title} <span className="gradient-text">Coming Soon</span>
        </h1>
        <p className="text-white/60 mb-8">
          {blurb ??
            "This page is being built. Check back soon for the full write-up and demos."}
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary px-5 py-2.5">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
