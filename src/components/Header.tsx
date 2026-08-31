import { Flame, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import { LevelPill } from "@/components/gamification/LevelBadge";

const Header = () => {
  const { xp, streak } = useProgress();
  const { level } = useGamification();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Map className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">
            Study<span className="text-primary">Maps</span>
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
