// src/app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlocks, getPostBySlug, getPosts } from "@/lib/notion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 300;

type Params = { slug: string };

// Define proper types for Notion blocks
interface NotionRichText {
  plain_text: string;
  href?: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
  };
}

interface NotionBlock {
  id: string;
  type: string;
  [key: string]: unknown;
}

interface NotionHeading {
  rich_text: NotionRichText[];
}

interface NotionParagraph {
  rich_text: NotionRichText[];
}

interface NotionListItem {
  rich_text: NotionRichText[];
}

interface NotionQuote {
  rich_text: NotionRichText[];
}

interface NotionCode {
  rich_text: NotionRichText[];
}

interface NotionImage {
  type: "external" | "file";
  external?: { url: string };
  file?: { url: string };
  caption?: NotionRichText[];
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Odyssey Blog`,
    description: post.description,
    openGraph: { images: post.cover ? [post.cover] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(resolvedParams.slug),
    getPosts(),
  ]);
  if (!post) notFound();

  const i = allPosts.findIndex((p) => p.slug === resolvedParams.slug);
  const prev = i > 0 ? allPosts[i - 1] : null;
  const next = i < allPosts.length - 1 ? allPosts[i + 1] : null;

  const blocks = await getBlocks(post.id);

  return (
    <>
    <Header />
    <main>
      {/* Centered mini-hero */}
      <section className="relative min-h-[30vh] md:min-h-[36vh] overflow-hidden pt-28">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Link
            href="/blog"
            className="my-5 inline-flex gap-2 text-sm text-yellow-400 hover:underline"
          >
            ← All posts
          </Link>
          <h1 className="my-5 text-4xl md:text-5xl font-bold tracking-tight leading-tight gradient-text">
            {post.title}
          </h1>
          <h3 className="mb-10 mx-auto text-xl max-w-2xl text-white/60 font-normal">
            {post.description}
          </h3>
        </div>
      </section>

      {/* Cover */}
      {post.cover && (
        <div className="mx-auto -mt-6 max-w-3xl px-4">
          <div className="glass-container overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              width={1600}
              height={840}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>

      )}

      {/* Article */}
      <section className="mx-auto max-w-3xl px-4 pt-8">
        <article className="glass-container p-6 md:p-8">
          <div
            className="prose prose-invert max-w-none
                       prose-a:text-yellow-400
                       prose-headings:text-yellow-400 prose-headings:font-bold prose-headings:tracking-tight
                       prose-h2:text-2xl md:prose-h2:text-3xl
                       prose-h3:text-xl md:prose-h3:text-2xl
                       prose-blockquote:border-yellow-400/40
                       prose-hr:border-white/10"
          >
            <PostContent blocks={blocks} />
          </div>
        </article>

        {/* Prev / Next */}
        <nav className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="glass-container glass-hover block p-4 hover:underline"
              >
                <div className="text-xs text-white/50">← Newer</div>
                <div className="mt-1 font-medium text-yellow-400">
                  {prev.title}
                </div>
              </Link>
            )}
          </div>
          <div className="sm:text-right">
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="glass-container glass-hover block p-4 hover:underline"
              >
                <div className="text-xs text-white/50">Older →</div>
                <div className="mt-1 font-medium text-yellow-400">
                  {next.title}
                </div>
              </Link>
            )}
          </div>
        </nav>

        <div className="h-10" />
      </section>
    <Footer />
    </main>
    </>
  );
}

/* ---------- Notion renderer ---------- */
function PostContent({ blocks }: { blocks: NotionBlock[] }) {
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
          case "bulleted_list_item":
            return (
              <ul key={b.id}>
                <li>{(data?.rich_text as NotionRichText[])?.map((t, i) => <Span key={i} t={t} />)}</li>
              </ul>
            );
          case "numbered_list_item":
            return (
              <ol key={b.id}>
                <li>{(data?.rich_text as NotionRichText[])?.map((t, i) => <Span key={i} t={t} />)}</li>
              </ol>
            );
          case "quote":
            return (
              <blockquote key={b.id}>
                {(data?.rich_text as NotionRichText[])?.map((t, i) => <Span key={i} t={t} />)}
              </blockquote>
            );
          case "code":
            return (
              <pre key={b.id}>
                <code>{(data?.rich_text as NotionRichText[])?.map((t) => t.plain_text).join("") || ""}</code>
              </pre>
            );
          case "image": {
            const imageData = data as Record<string, unknown>;
            const type = imageData?.type as string;
            const src = type === "external" 
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