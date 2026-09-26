import FadeIn from "./FadeIn";

export default function Education() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Continuous <span className="gradient-text">Learning</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Combining formal education with hands-on experimentation and emerging technology
            exploration.
          </p>
        </FadeIn>

        {/* Main Content Layout - Two Equal Columns */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column - Formal Education */}
          <FadeIn className="h-full">
            <div className="glass-container h-full p-8">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                Formal Education
              </h3>

              {/* Current Bachelor's */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                    Bachelor of Science in Cloud Computing
                  </h4>
                  <p className="text-white/70 mb-1">Western Governors University</p>
                  <p className="text-sm font-medium gradient-text-blue mb-3">
                    Expected January 2026 &middot; 101 of 121 Credits Complete
                  </p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: "83%" }}
                    />
                  </div>
                </div>

                <div className="border-l-2 border-yellow-400/30 pl-6">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Associate of General Studies
                  </h4>
                  <p className="text-white/70 mb-1">Delgado Community College, New Orleans</p>
                  <p className="text-sm text-emerald-300/90">2010 &middot; 4.0 GPA Honor Graduate</p>
                </div>
              </div>

              {/* Future Plans */}
              <div className="pt-6 border-t border-white/10">
                <h5 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Future Consideration
                </h5>
                <p className="text-white/60 text-sm">
                  {`AI/ML Master's Program at WGU following Bachelor's completion`}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Learning Philosophy */}
          <FadeIn delay={0.1} className="h-full">
            <div className="glass-container h-full p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Beyond the Classroom</h3>

              <div className="space-y-5">
                <p className="text-white/70 leading-relaxed text-sm">
                  While formal education provides the foundation, I believe the most valuable
                  learning in technology comes from hands-on experimentation and real-world
                  problem solving.
                </p>

                <p className="text-white/70 leading-relaxed text-sm">
                  My homelab serves as a continuous learning environment where I explore
                  cutting-edge technologies, test infrastructure patterns, and experiment with
                  emerging tools before they become mainstream in enterprise environments.
                </p>

                <div className="rounded-xl bg-white/[0.03] p-4 border-l-2 border-yellow-400/60">
                  <p className="text-white/80 italic mb-2 text-sm leading-relaxed">
                    {`"Technology is ever progressing, ever changing, and so a career in IT should also be a continuous journey of growth and development. Never stop learning."`}
                  </p>
                  <p className="text-yellow-400 font-semibold text-sm">
                    — Seek Always A New Horizon
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {["Self-Directed Learning", "Homelab Experimentation", "Open Source"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
