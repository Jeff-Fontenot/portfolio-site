import { Client } from "@notionhq/client";
import { fetchBlocksRecursive } from "./notion-blocks";

const notion = new Client({ auth: process.env.NOTION_PROJECTS_TOKEN });
const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID!;

export type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  cover: string | null;
  githubUrl: string | null;
  featured: boolean;
};

function plainText(rt: any[] | undefined): string {
  if (!rt || !Array.isArray(rt)) return "";
  return rt.map((r) => r.plain_text ?? "").join("");
}

function mapPageToProject(page: any): Project | null {
  const props = page.properties;

  const title = plainText(props?.Name?.title) || "Untitled";

  const slug =
    plainText(props?.slug?.rich_text) ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (!slug) return null;

  const description = plainText(props?.description?.rich_text) || undefined;

  const tags: string[] = Array.isArray(props?.tags?.multi_select)
    ? props.tags.multi_select.map((t: any) => t.name)
    : [];

  const coverFile = props?.cover?.files?.[0];
  const cover =
    coverFile?.file?.url ??
    coverFile?.external?.url ??
    page.cover?.external?.url ??
    page.cover?.file?.url ??
    null;

  const githubUrl = props?.["GitHub Repo"]?.url ?? null;
  const featured = !!props?.Featured?.checkbox;

  return { id: page.id, title, slug, description, tags, cover, githubUrl, featured };
}

export async function getProjects(): Promise<Project[]> {
  const res = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "status", select: { equals: "published" } },
    sorts: [{ timestamp: "created_time", direction: "descending" }],
  });

  return res.results.map(mapPageToProject).filter(Boolean) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "status", select: { equals: "published" } },
        { property: "slug", rich_text: { equals: slug } },
      ],
    },
    page_size: 1,
  });

  const page = res.results[0];
  return page ? mapPageToProject(page) : null;
}

export async function getProjectBlocks(pageId: string) {
  return fetchBlocksRecursive(notion, pageId);
}
