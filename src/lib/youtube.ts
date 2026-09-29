// No API key needed: YouTube publishes a public Atom feed per channel.
// Channel ID resolved once from the @Jeff-fontenot handle page (channelId
// never changes even if the handle does), so we skip that lookup at runtime.
const CHANNEL_ID = "UCR4Oiqaj39Hp0ON7VjvqlRg";

export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  url: string;
  thumbnail: string;
};

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function getLatestVideo(): Promise<YouTubeVideo | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const xml = await res.text();
    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
    if (!entry) return null;

    const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
    const publishedAt = entry.match(/<published>(.*?)<\/published>/)?.[1];
    if (!id || !title || !publishedAt) return null;

    return {
      id,
      title: decodeXmlEntities(title),
      publishedAt,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  } catch {
    return null;
  }
}
