import { StateCreator } from "zustand";

export type Theme = "light" | "dark" | "system";

export interface ThemeStoreState {
  theme: Theme;
}

export interface ThemeStoreActions {
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
  initTheme: () => void;
}

export type ThemeStore = ThemeStoreState & ThemeStoreActions;

const defaultThemeStore: ThemeStoreState = {
  theme: "system",
};

const applyThemeToDocument = (theme: Theme) => {
  try {
    const el = document.documentElement;
    el.classList.remove("light", "dark");
    if (theme === "light") {
      el.classList.add("light");
    } else if (theme === "dark") {
      el.classList.add("dark");
    }
    // system の場合はクラスを付けず、CSSのprefers-color-schemeに委ねる
  } catch (_) {
    // SSR環境などでdocumentがない場合は何もしない
  }
};

export const createThemeStoreSlice: StateCreator<ThemeStore> = (set, get) => {
  return {
    ...defaultThemeStore,
    setTheme: (theme) => {
      set({ theme });
      try {
        localStorage.setItem("theme", theme);
      } catch (_) {}
      applyThemeToDocument(theme);
    },
    cycleTheme: () => {
      const current = get().theme;
      const next: Theme =
        current === "system"
          ? "light"
          : current === "light"
            ? "dark"
            : "system";
      get().setTheme(next);
    },
    initTheme: () => {
      try {
        const saved = localStorage.getItem("theme") as Theme | null;
        const initial: Theme =
          saved === "light" || saved === "dark" || saved === "system"
            ? saved
            : "system";
        set({ theme: initial });
        applyThemeToDocument(initial);
      } catch (_) {
        // localStorage未使用時はsystemにしてクラス適用なし
        set({ theme: "system" });
      }
    },
  };
};
