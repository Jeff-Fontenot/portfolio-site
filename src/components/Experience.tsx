import FadeIn from "./FadeIn";

const responsibilities = [
  {
    title: "Incident Management & Troubleshooting",
    detail:
      "Handle 20–30 enterprise support calls daily via Cisco Finesse, conducting root cause analysis and detailed documentation in Remedy with complete audit trails.",
  },
  {
    title: "Identity & Access Management",
    detail:
      "Manage user lifecycle and access provisioning using ADAC, ADUC, and Entra ID, including group membership validation, role assignments, and cross-forest authentication issues.",
  },
  {
    title: "Hybrid Cloud Operations",
    detail:
      "Troubleshoot Exchange hybrid configurations, validating SMTP proxy/target addresses, ECP redirection, and Azure AD Connect sync issues.",
  },
  {
    title: "Privileged Access Management",
    detail: "Use Azure PIM daily for just-in-time elevation to manage O365, Exchange, and Azure AD roles.",
  },
  {
    title: "License & Service Management",
    detail:
      "Resolve GAL mismatches and distribution list visibility problems; validate O365 licensing and service entitlements based on security group memberships.",
  },
  {
    title: "Infrastructure Support",
    detail:
      "Perform network diagnostics (IP conflict, proxy/PAC config, domain trust failures), certificate checks for CAC logins, and Outlook optimization/cache resets.",
  },
  {
    title: "Mobile Device Management",
    detail: "Use Intune for device inventory, IMEI lookup, and basic configuration management of mobile assets.",
  },
  {
    title: "Security Compliance",
    detail:
      "Review SAAR forms and DoD training certificates to validate account requests and enforce role-based access controls.",
  },
  {
    title: "Process Automation",
    detail:
      "Developed a menu-based PowerShell tool for user, workstation, and printer lookup for call documentation automation, improving queries from 3-4 minutes to several seconds per service call.",
  },
  {
    title: "Professional Development",
    detail:
      "Pursuing certifications in Azure (AZ-104), AWS (Solutions Architect, SysOps, Developer), and CCSP to transition into DevOps and cloud engineering roles.",
  },
];

export default function Experience() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Building expertise in enterprise cloud infrastructure and hybrid environments.
          </p>
        </FadeIn>

        {/* Experience Card */}
        <FadeIn className="glass-container w-full p-8 md:p-10">
          {/* Job Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-1.5">
              Enterprise Service Desk Analyst
            </h3>
            <p className="text-lg text-yellow-400 mb-1">
              Leidos via TEKSystems &middot; Marine Corps Enterprise Support
            </p>
            <p className="text-white/50 text-sm">Jan 2025 – Present</p>
          </div>

          {/* Security Clearance */}
          <div className="mb-6">
            <p className="text-lg text-yellow-400 mb-1">Active Secret Security Clearance</p>
          </div>

          {/* Environment */}
          <div className="mb-6 pt-4 border-t border-white/10">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="font-semibold text-white">Environment: </span>
              Hybrid Microsoft Enterprise — Active Directory, Azure AD, Exchange Online, O365, Intune
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {responsibilities.map((r) => (
              <div key={r.title}>
                <p className="text-sm font-semibold text-yellow-400 mb-1">{r.title}</p>
                <p className="text-sm text-white/60 leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
