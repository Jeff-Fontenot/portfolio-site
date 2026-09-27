// Shared renderer for basic Notion block content, used by the blog and the About page.

import CodeBlock from "./CodeBlock";

export interface NotionRichText {
  plain_text: string;
  href?: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
  };
}

export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: unknown;
}

export default function NotionContent({ blocks }: { blocks: NotionBlock[] }) {
  return (
    <>
      {blocks.map((b) => {
        const type = b.type;
        const data = b[type] as Record<string, unknown>;

        switch (type) {
          case "heading_1":
            return (
              <h2 key={b.id} className="text-yellow-400 font-bold">
                {(data?.rich_text as NotionRichText[])?.map((t, i) => (
                  <Span key={i} t={t} />
                )) || null}
              </h2>
            );
          case "heading_2":
            return (
              <h3 key={b.id} className="text-yellow-400 font-semibold">
                {(data?.rich_text as NotionRichText[])?.map((t, i) => (
                  <Span key={i} t={t} />
                )) || null}
              </h3>
            );
          case "heading_3":
            return (
              <h4 key={b.id} className="text-yellow-400 font-bold">
                {(data?.rich_text as NotionRichText[])?.map((t, i) => (
                  <Span key={i} t={t} />
                )) || null}
              </h4>
            );
          case "paragraph":
            return (
              <p key={b.id}>
                {!data?.rich_text || (data.rich_text as NotionRichText[]).length === 0 ? (
                  <br />
                ) : (
                  (data.rich_text as NotionRichText[]).map((t, i) => <Span key={i} t={t} />)
                )}
              </p>
            );
          case "bulleted_list_item": {
            const children = (b.children as NotionBlock[]) || [];
            return (
              <ul key={b.id}>
                <li>
                  {(data?.rich_text as NotionRichText[])?.map((t, i) => <Span key={i} t={t} />)}
                  {children.length > 0 && <NotionContent blocks={children} />}
                </li>
              </ul>
            );
          }
          case "numbered_list_item": {
            const children = (b.children as NotionBlock[]) || [];
            return (
              <ol key={b.id}>
                <li>
                  {(data?.rich_text as NotionRichText[])?.map((t, i) => <Span key={i} t={t} />)}
                  {children.length > 0 && <NotionContent blocks={children} />}
                </li>
              </ol>
            );
          }
          case "quote":
            return (
              <blockquote key={b.id}>
                {(data?.rich_text as NotionRichText[])?.map((t, i) => <Span key={i} t={t} />)}
              </blockquote>
            );
          case "code": {
            const code = (data?.rich_text as NotionRichText[])?.map((t) => t.plain_text).join("") || "";
            const language = data?.language as string | undefined;
            return <CodeBlock key={b.id} code={code} language={language} />;
          }
          case "image": {
            const imageData = data as Record<string, unknown>;
            const imgType = imageData?.type as string;
            const src = imgType === "external"
              ? (imageData?.external as { url?: string })?.url
              : (imageData?.file as { url?: string })?.url;
            const caption = (imageData?.caption as NotionRichText[])?.[0]?.plain_text;
            return (
              <figure key={b.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={caption || "image"} />
                {caption && <figcaption>{caption}</figcaption>}
              </figure>
            );
          }
          case "divider":
            return <hr key={b.id} />;
          case "column_list": {
            const columns = (b.children as NotionBlock[]) || [];
            return (
              <div
                key={b.id}
                className="not-prose my-6 grid gap-6"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
              >
                <NotionContent blocks={columns} />
              </div>
            );
          }
          case "column": {
            const children = (b.children as NotionBlock[]) || [];
            return (
              <div key={b.id} className="prose prose-invert min-w-0 max-w-none">
                <NotionContent blocks={children} />
              </div>
            );
          }
          case "toggle": {
            const children = (b.children as NotionBlock[]) || [];
            return (
              <details key={b.id} className="my-4">
                <summary className="cursor-pointer font-semibold text-yellow-400">
                  {(data?.rich_text as NotionRichText[])?.map((t, i) => (
                    <Span key={i} t={t} />
                  ))}
                </summary>
                <div className="mt-2">
                  <NotionContent blocks={children} />
                </div>
              </details>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}

function Span({ t }: { t: NotionRichText }) {
  const text = t.plain_text || "";
  const href = t.href;

  let el: React.ReactNode = text;
  if (href) el = <a href={href}>{text}</a>;
  if (t.annotations?.bold) el = <strong>{el}</strong>;
  if (t.annotations?.italic) el = <em>{el}</em>;
  if (t.annotations?.code) el = <code>{text}</code>;

  return <>{el}</>;
}
