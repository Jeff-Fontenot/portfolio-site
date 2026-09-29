"use client";

import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";
import { Github } from "lucide-react";

const GITHUB_USERNAME = "Jeff-Fontenot";

// Amber theme matching the site's accent, low → high activity.
const calendarTheme = {
  dark: ["#161616", "#4d3a0f", "#8a6510", "#c99512", "#fde047"],
};

export default function GitHubActivity() {
  return (
    <div className="glass-container mt-8 w-full p-6 md:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Github size={20} className="text-white/70" />
          <h3 className="text-lg font-semibold text-white">GitHub Activity</h3>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/50 transition-colors hover:text-yellow-300"
        >
          @{GITHUB_USERNAME}
        </a>
      </div>

      <div className="overflow-x-auto">
        <GitHubCalendar
          username={GITHUB_USERNAME}
          colorScheme="dark"
          theme={calendarTheme}
          fontSize={12}
          blockSize={11}
          blockMargin={4}
          errorMessage="Couldn't load GitHub activity right now."
        />
      </div>
    </div>
  );
}
