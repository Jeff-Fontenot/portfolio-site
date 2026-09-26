"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

const projects = [
  {
    title: "Cloud Resume Challenge 2.0",
    description:
      "Rebuilt the Cloud Resume Challenge with a modern Next.js + Tailwind stack, leveraging server-side rendering for performance and interactivity. Integrated dynamic features for resume updates and portfolio visibility, aligning with enterprise-grade web development practices.",
    tech: ["Next.js", "Tailwind", "AWS Lambda", "DynamoDB", "Terraform", "GitHub Actions"],
    link: "https://github.com/Jeff-Fontenot",
    span: "md:col-span-3",
  },
  {
    title: "Kubernetes Platform",
    description:
      "Deployed a production-style k3s cluster with AWS-hosted master and homelab worker nodes. Automated provisioning and security groups using Terraform. Integrated Prometheus & Grafana for real-time monitoring and alerting, demonstrating hybrid-cloud resiliency and observability.",
    tech: ["Kubernetes", "Terraform", "Ansible"],
    link: "https://github.com/Jeff-Fontenot",
    span: "md:col-span-2",
  },
  {
    title: "Enterprise Grade Homelab",
    description:
      "Designed and deployed containerized services with Docker/Portainer, fronted by Traefik reverse proxy with automated TLS. Implemented Prometheus/Grafana monitoring and recursive DNS filtering with PiHole and Unbound, creating a secure production-style sandbox for testing cloud-native architectures.",
    tech: ["Proxmox", "Ubuntu Server", "Docker", "Traefik", "Zero Trust", "Prometheus", "Grafana"],
    link: "https://github.com/Jeff-Fontenot",
    span: "md:col-span-3",
  },
  {
    title: "Menu-Based PowerShell Automation",
    description:
      "Developed a modular PowerShell tool adopted by coworkers to streamline user, printer, and workstation lookups in Active Directory. Saved 2-3 minutes per call, reducing daily ticket resolution time across the team and reinforcing repeatable documentation practices.",
    tech: ["PowerShell", "Active Directory"],
    link: "https://github.com/Jeff-Fontenot/ESD_Summary_Tool.git",
    span: "md:col-span-2",
  },
];

export default function Projects() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            A selection of personal and professional projects that highlight my skills in
            cloud computing, DevOps, and web development.
          </p>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-5">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08} className={project.span}>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} repository`}
                className="glass-container glass-hover group block h-full cursor-pointer p-8"
              >
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-yellow-300">
                  {project.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-white/60">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70 transition-colors group-hover:border-yellow-300/30 group-hover:text-yellow-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
