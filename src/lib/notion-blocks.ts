import type { Client } from "@notionhq/client";

// Notion only returns one level of children per call. Structural blocks like
// columns and toggles nest their real content a level deeper, so recurse into
// any block that reports having children. Shared by every Notion-backed
// section (blog, about, projects) regardless of which client/token they use.
export async function fetchBlocksRecursive(notion: Client, blockId: string): Promise<any[]> {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;
  while (true) {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 50,
    });
    blocks.push(...res.results);
    if (!res.has_more) break;
    cursor = res.next_cursor || undefined;
  }

  await Promise.all(
    blocks.map(async (b) => {
      if (b.has_children) {
        b.children = await fetchBlocksRecursive(notion, b.id);
      }
    })
  );

  return blocks;
}
