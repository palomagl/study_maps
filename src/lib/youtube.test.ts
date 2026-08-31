import { describe, expect, it } from "vitest";
import {
  isYouTubeUrl,
  parseYouTubeId,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/youtube";

const ID = "nlO5hySqJFA";

describe("parseYouTubeId", () => {
  it("extrai o id dos formatos comuns", () => {
    const cases = [
      `https://www.youtube.com/watch?v=${ID}`,
      `http://youtube.com/watch?v=${ID}`,
      `https://m.youtube.com/watch?v=${ID}`,
      `https://www.youtube.com/watch?v=${ID}&list=PLabc&index=2&t=90s`,
      `https://youtu.be/${ID}`,
      `https://youtu.be/${ID}?t=42`,
      `https://www.youtube.com/embed/${ID}`,
      `https://www.youtube-nocookie.com/embed/${ID}?rel=0`,
      `https://www.youtube.com/shorts/${ID}`,
      `https://www.youtube.com/live/${ID}`,
      `www.youtube.com/watch?v=${ID}`,
      ID,
    ];
    for (const c of cases) {
      expect(parseYouTubeId(c), c).toBe(ID);
    }
  });

  it("rejeita entradas que não são YouTube ou estão malformadas", () => {
    expect(parseYouTubeId("")).toBeNull();
    expect(parseYouTubeId(undefined)).toBeNull();
    expect(parseYouTubeId("https://vimeo.com/123456")).toBeNull();
    expect(parseYouTubeId("https://www.youtube.com/watch?v=tooShort")).toBeNull();
    expect(parseYouTubeId("https://www.youtube.com/results?search_query=x")).toBeNull();
    expect(parseYouTubeId("not a url")).toBeNull();
  });

  it("isYouTubeUrl reflete parseYouTubeId", () => {
    expect(isYouTubeUrl(`https://youtu.be/${ID}`)).toBe(true);
    expect(isYouTubeUrl("https://example.com")).toBe(false);
  });
});

describe("construtores de URL", () => {
  it("watch/embed/thumbnail usam o id", () => {
    expect(youtubeWatchUrl(ID)).toBe(`https://www.youtube.com/watch?v=${ID}`);
    expect(youtubeThumbnailUrl(ID)).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
    const embed = youtubeEmbedUrl(ID);
    expect(embed.startsWith(`https://www.youtube-nocookie.com/embed/${ID}?`)).toBe(true);
    expect(embed).not.toContain("autoplay");
    expect(youtubeEmbedUrl(ID, true)).toContain("autoplay=1");
  });
});
