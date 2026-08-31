/**
 * Camada de armazenamento.
 *
 * Toda persistência do StudyMaps passa por `StorageAdapter`. Hoje é
 * localStorage; trocar por um backend (fetch a uma API) depois é só
 * implementar esta interface — nenhum componente ou store precisa mudar.
 */
export interface StorageAdapter {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
  /**
   * Notifica mudanças feitas em OUTRO contexto (outra aba, outro dispositivo).
   * Retorna uma função de cleanup. Mudanças locais não disparam o callback.
   */
  subscribe(key: string, onExternalChange: () => void): () => void;
}

/** localStorage + evento `storage` para sincronizar abas. */
export class LocalStorageAdapter implements StorageAdapter {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* cota cheia ou storage indisponível: ignora, estado segue em memória */
    }
  }

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  }

  subscribe(key: string, onExternalChange: () => void): () => void {
    const handler = (e: StorageEvent) => {
      if (e.key === key || e.key === null) onExternalChange();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }
}

/** Sem efeitos colaterais — usado em testes e quando não há `window`. */
export class InMemoryStorageAdapter implements StorageAdapter {
  private store = new Map<string, string>();

  get(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  subscribe(): () => void {
    return () => {};
  }
}

export function createDefaultStorage(): StorageAdapter {
  if (typeof window !== "undefined" && "localStorage" in window) {
    return new LocalStorageAdapter();
  }
  return new InMemoryStorageAdapter();
}
