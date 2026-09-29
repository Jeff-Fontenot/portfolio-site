import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Contact() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            Based in New Orleans, LA. Open to remote roles in
            <br />
            <span className="whitespace-nowrap">Cloud, DevOps, and Platform Engineering.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:jeff@itodyssey.io" className="btn-primary px-6 py-3">
              <Mail className="mr-2 h-4 w-4" />
              Email Me
            </a>
            <Link
              href="https://www.linkedin.com/in/jeff-fontenot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-6 py-3"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Jeff-Fontenot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-6 py-3"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
