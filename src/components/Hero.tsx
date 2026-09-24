import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
      {/* Mobile Background Portrait */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/B&W_Ghost_Portrait.png"
          alt="Jeff Fontenot"
          fill
          priority
          className="object-cover opacity-30 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center">

          {/* Left Column - Logo & Text Stack */}
          <div className="text-center space-y-2">
            {/* Logo */}
            <div className="flex justify-center md:justify-center">
              <Image
                src="/Triquetra-Logo2.png"
                alt="IT Odyssey Logo"
                width={200}
                height={200}
                priority
                className="h-50 w-auto"
              />
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold gradient-text leading-tight">
              Jeff Fontenot
            </h1>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-yellow-400">
              Cloud | DevOps | Systems
            </h2>

            {/* Subtitle/Description */}
            <p className="text-lg text-center text-white/80 font-semibold leading-relaxed max-w-6xl mx-auto">
              Building hands-on cloud infrastructure, automation, and observability projects with AWS, Terraform, Linux, Docker, and Kubernetes.
            </p>

            <p className="text-2xl md:text-2xl lg:text-3xl font-semibold text-yellow-400">
              Active Secret Security Clearance
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/projects"
                className="
                  inline-flex items-center justify-center
                  w-full sm:w-auto
                  rounded-full px-6 py-3
                  bg-yellow-400 text-slate-950 font-semibold
                  transition-all
                  hover:bg-yellow-300
                  hover:shadow-[0_0_20px_rgba(250,204,21,0.6)]
                  focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                View Projects
              </Link>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  w-full sm:w-auto
                  rounded-full px-6 py-3
                  border border-yellow-200/40
                  bg-blue-200/10 text-yellow-300 font-semibold
                  outline-none
                  transition-all
                  focus:ring-offset-3
                  focus:ring-2 focus:ring-yellow-300/30
                  hover:animate-pulse
                  hover:shadow-[0_0_15px_rgba(250,204,21,0.8)]"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Column - Desktop Portrait */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[600px]">
              <Image
                src="/B&W_Ghost_Portrait.png"
                alt="Jeff Fontenot"
                fill
                priority
                className="object-cover rounded-2xl opacity-60 filter grayscale shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
