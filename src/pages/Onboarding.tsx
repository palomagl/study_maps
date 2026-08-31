import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import { progressStore } from "@/lib/progress-store";
import {
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  recommendTrail,
  type Option,
} from "@/lib/onboarding";
import { getFirstLesson, getTrail } from "@/content";

type Step = "name" | "goal" | "experience" | "result";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);

  const recommendation = useMemo(
    () => recommendTrail(goal, experience),
    [goal, experience],
  );
  const trail = getTrail(recommendation.trailId);
  const first = getFirstLesson(recommendation.trailId);

  const finish = (go: "lesson" | "roadmap") => {
    progressStore.completeOnboarding({
      name: name.trim() || null,
      goal,
      experience,
    });
    if (go === "lesson" && first) {
      navigate(`/roadmap/${recommendation.trailId}/aula/${first.lesson.id}`);
    } else {
      navigate(`/roadmap/${recommendation.trailId}`);
    }
  };

  const stepIndex = ["name", "goal", "experience", "result"].indexOf(step);

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-24">
        {/* progresso */}
        <div className="mb-8 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= stepIndex ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === "name" && (
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Vamos montar sua trilha
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Leva menos de um minuto. Primeiro: como podemos te chamar?
                </p>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setStep("goal")}
                  placeholder="Seu nome (opcional)"
                  className="mt-5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary/50"
                />
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("goal")}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    Continuar <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    to="/"
                    className="text-xs text-muted-foreground underline hover:text-foreground"
                  >
                    pular
                  </Link>
                </div>
              </div>
            )}

            {step === "goal" && (
              <ChoiceStep
                title="Qual é o seu objetivo?"
                options={GOAL_OPTIONS}
                selected={goal}
                onSelect={(id) => {
                  setGoal(id);
                  setStep("experience");
                }}
                onBack={() => setStep("name")}
              />
            )}

            {step === "experience" && (
              <ChoiceStep
                title="Qual seu nível hoje?"
                options={EXPERIENCE_OPTIONS}
                selected={experience}
                onSelect={(id) => {
                  setExperience(id);
                  setStep("result");
                }}
                onBack={() => setStep("goal")}
              />
            )}

            {step === "result" && trail && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Recomendação
                </p>
                <h1 className={`mt-1 text-2xl font-extrabold ${trail.colorClass}`}>
                  Trilha {trail.title}
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {recommendation.reason}
                </p>

                <div className="mt-4 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                  {trail.description}
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => finish("lesson")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    Começar a primeira aula <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => finish("roadmap")}
                    className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Ver o roadmap
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("goal")}
                  className="mt-3 text-xs text-muted-foreground underline hover:text-foreground"
                >
                  refazer respostas
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

function ChoiceStep({
  title,
  options,
  selected,
  onSelect,
  onBack,
}: {
  title: string;
  options: Option[];
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
        {title}
      </h1>
      <div className="mt-5 space-y-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o.id)}
            className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
              selected === o.id
                ? "border-primary/50 bg-primary/10"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold text-foreground">
                {o.label}
              </span>
              {o.hint && (
                <span className="block text-xs text-muted-foreground">{o.hint}</span>
              )}
            </span>
            {selected === o.id && <Check className="h-4 w-4 text-primary" />}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-xs text-muted-foreground underline hover:text-foreground"
      >
        voltar
      </button>
    </div>
  );
}

export default Onboarding;
