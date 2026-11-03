import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/*
 * O app fala com "tu" — nas aulas e fora delas. Este teste lê o texto de
 * todos os arquivos da interface (e o título da página e do atalho no
 * celular), tira os comentários e os ids em kebab-case, e procura "você",
 * "seu" e "sua". O teste das aulas sozinho deixou passar as telas.
 *
 * As aulas ficam de fora: elas têm o próprio teste de "você" em
 * curriculum.test.ts, e citam de propósito texto genérico de propaganda
 * ("Soluções inovadoras para o seu negócio") pra ensinar a reconhecer ele.
 */
const PALAVRAS = /(^|[^\p{L}])(você|vocês|seu|sua|seus|suas)(?=[^\p{L}]|$)/iu;

function arquivosDaInterface(raiz: string): string[] {
  const src = readdirSync(join(raiz, "src"), { recursive: true })
    .map(String)
    .filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\.|archive|lessons/.test(f))
    .map((f) => join("src", f));
  return [...src, "index.html", join("public", "site.webmanifest")];
}

function semComentariosNemIds(texto: string): string {
  return texto
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, "")) // mantém as linhas
    .replace(/(^|[^:])\/\/.*$/gm, "$1") // sem pegar o // de https://
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ""))
    .replace(/[a-z]+(?:-[a-z]+)+/g, ""); // ids como site-com-sua-cara
}

describe("o app inteiro fala com 'tu'", () => {
  it("nenhum texto usa 'você', 'seu' ou 'sua'", () => {
    const raiz = process.cwd();
    const achados: string[] = [];
    for (const f of arquivosDaInterface(raiz)) {
      semComentariosNemIds(readFileSync(join(raiz, f), "utf8"))
        .split("\n")
        .forEach((linha, i) => {
          if (PALAVRAS.test(linha)) achados.push(`${f}:${i + 1}: ${linha.trim()}`);
        });
    }
    expect(achados).toEqual([]);
  });
});
