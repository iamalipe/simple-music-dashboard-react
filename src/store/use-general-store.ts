import { create } from "zustand";

const themeStorageKey = "app-theme";

export type GeneralStore = {
  theme: "dark" | "light" | "system";
  setTheme: (theme: GeneralStore["theme"]) => void; // Updated type for setTheme
};

const onThemeChange = (theme: GeneralStore["theme"]) => {
  localStorage.setItem(themeStorageKey, theme);

  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
};

const useGeneralStore = create<GeneralStore>((set) => ({
  theme:
    (localStorage.getItem(themeStorageKey) as GeneralStore["theme"]) || "light",
  setTheme: (theme) => {
    set({ theme });
    onThemeChange(theme); // Ensure `onThemeChange` is called on theme update
  },
}));

// Initialize the theme on app load
(() => {
  const initialTheme =
    (localStorage.getItem(themeStorageKey) as GeneralStore["theme"]) || "light";
  onThemeChange(initialTheme);
})();

export default useGeneralStore;
