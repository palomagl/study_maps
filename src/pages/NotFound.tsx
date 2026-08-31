import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass } from "lucide-react";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404: rota inexistente acessada —",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <Compass className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="mb-2 text-4xl font-extrabold text-foreground">404</h1>
          <p className="mb-6 text-muted-foreground">
            Essa página saiu do mapa. O endereço{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              {location.pathname}
            </code>{" "}
            não existe.
          </p>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
