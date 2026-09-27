import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

// Notion's code-block language values don't always match Shiki's grammar ids.
const SHIKI_LANG_ALIASES: Record<string, string> = {
  "plain text": "text",
  shell: "bash",
  "c++": "cpp",
  "c#": "csharp",
  "f#": "fsharp",
  docker: "dockerfile",
  "objective-c": "objc",
};

const LANGUAGE_LABELS: Record<string, string> = {
  powershell: "PowerShell",
  javascript: "JavaScript",
  typescript: "TypeScript",
  json: "JSON",
  yaml: "YAML",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  graphql: "GraphQL",
  "c++": "C++",
  "c#": "C#",
  "f#": "F#",
  php: "PHP",
  xml: "XML",
  "plain text": "Plain Text",
};

function toShikiLang(lang: string) {
  return SHIKI_LANG_ALIASES[lang] || lang;
}

function labelFor(lang: string) {
  return LANGUAGE_LABELS[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
}

export default async function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const lang = (language || "plain text").toLowerCase();

  let html: string;
  try {
    html = await codeToHtml(code, { lang: toShikiLang(lang), theme: "github-dark-default" });
  } catch {
    html = await codeToHtml(code, { lang: "text", theme: "github-dark-default" });
  }

  return (
    <div className="not-prose relative my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium text-white/50">{labelFor(lang)}</span>
        <CopyButton code={code} />
      </div>
      <div
        className="shiki-code overflow-x-auto p-4 text-sm font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
