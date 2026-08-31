import { useState } from "react";
import { BookText, FileCode2, GraduationCap, Play, PlayCircle, ExternalLink } from "lucide-react";
import type { FreeResource, RecommendedVideo } from "@/content/types";
import {
  parseYouTubeId,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/youtube";

const kindMeta = {
  video: { icon: PlayCircle, label: "Vídeo" },
  article: { icon: BookText, label: "Artigo" },
  docs: { icon: FileCode2, label: "Documentação" },
  course: { icon: GraduationCap, label: "Curso" },
} as const;

const langLabel: Record<string, string> = {
  "pt-BR": "PT",
  en: "EN",
  es: "ES",
};

function VideoMeta({ video }: { video: RecommendedVideo }) {
  return (
    <>
      <p className="text-xs text-muted-foreground">
        {video.channel ? `${video.channel} · ` : ""}
        {video.provider}
        {video.lang ? ` · ${langLabel[video.lang] ?? video.lang}` : ""}
      </p>
      {video.description && (
        <p className="mt-1 text-xs text-muted-foreground/80">{video.description}</p>
      )}
    </>
  );
}

export function VideoCard({
  video,
  accentHsl,
}: {
  video: RecommendedVideo;
  accentHsl: string;
}) {
  const youTubeId = parseYouTubeId(video.url);
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  // Não é um link de YouTube reconhecível: mantém o card de link simples.
  if (!youTubeId) {
    return (
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:border-primary/30"
      >
        <div
          className="flex-shrink-0 rounded-lg p-2.5"
          style={{ backgroundColor: `hsl(${accentHsl} / 0.15)` }}
        >
          <PlayCircle className="h-5 w-5" style={{ color: `hsl(${accentHsl})` }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
            {video.title}
          </p>
          <VideoMeta video={video} />
        </div>
        <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
      </a>
    );
  }

  const watchUrl = youtubeWatchUrl(youTubeId);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-secondary/30">
      <div className="relative aspect-video w-full bg-[hsl(215_28%_6%)]">
        {playing ? (
          <iframe
            src={youtubeEmbedUrl(youTubeId, true)}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Assistir ao vídeo: ${video.title}`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {!thumbFailed && (
              <img
                src={youtubeThumbnailUrl(youTubeId)}
                alt=""
                loading="lazy"
                onError={() => setThumbFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
            <span
              className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105"
              style={{ backgroundColor: `hsl(${accentHsl})` }}
            >
              <Play className="h-6 w-6 translate-x-0.5 text-primary-foreground" fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      <div className="flex items-start gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{video.title}</p>
          <VideoMeta video={video} />
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
        >
          YouTube
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export function ResourceList({ resources }: { resources: FreeResource[] }) {
  return (
    <ul className="space-y-2">
      {resources.map((r, i) => {
        const meta = kindMeta[r.kind];
        const Icon = meta.icon;
        return (
          <li key={i}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-border bg-secondary/20 p-3 transition-colors hover:border-primary/30"
            >
              <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary">
                  {r.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {meta.label} · {r.provider}
                  {r.lang ? ` · ${langLabel[r.lang] ?? r.lang}` : ""}
                  {r.durationLabel ? ` · ${r.durationLabel}` : ""}
                </p>
                {r.description && (
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    {r.description}
                  </p>
                )}
              </div>
              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
