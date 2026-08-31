/**
 * Normalização de links do YouTube.
 *
 * Aceita todos os formatos comuns (watch?v=, youtu.be/, /embed/, /shorts/,
 * /live/, com parâmetros extras como &list= e &t=) e devolve o id de 11
 * caracteres. A partir dele, montamos URLs canônicas de assistir e de embed.
 */

const ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeId(input: string | undefined | null): string | null {
  if (!input) return null;
  const s = input.trim();
  if (ID_RE.test(s)) return s;

  let url: URL;
  try {
    url = new URL(s.startsWith("http") ? s : `https://${s}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");

  if (host === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return ID_RE.test(id) ? id : null;
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const v = url.searchParams.get("v");
    if (v && ID_RE.test(v)) return v;

    const m = url.pathname.match(
      /^\/(?:embed|shorts|live|v)\/([A-Za-z0-9_-]{11})/,
    );
    if (m) return m[1];
  }

  return null;
}

export function isYouTubeUrl(input: string | undefined | null): boolean {
  return parseYouTubeId(input) !== null;
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeEmbedUrl(id: string, autoplay = false): string {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function youtubeThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
