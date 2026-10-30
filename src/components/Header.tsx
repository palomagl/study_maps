import { Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import { LevelPill } from "@/components/gamification/LevelBadge";
import { Agent } from "@/components/agents/Agent";

const Header = () => {
  const { xp, streak } = useProgress();
  const { level } = useGamification();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="StudyMaps — início">
          <Agent kind="julgamento" size={30} />
          {/* O wordmark da identidade: "study" claro, "maps" em menta. */}
          <span className="font-display text-[17px] font-extrabold tracking-tight text-foreground [font-stretch:112%]">
            study<span className="text-primary">maps</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Trilhas
          </Link>
          {xp > 0 && (
            <>
              <Link
                to="/painel"
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Painel
              </Link>
              {streak.current > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                  {streak.current}
                </span>
              )}
              <LevelPill level={level} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
