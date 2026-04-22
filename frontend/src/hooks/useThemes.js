import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { generateId } from "../utils/idGenerator";

export function useThemes() {
  const { themes, setThemes } = useContext(AppContext);

  function addTheme(name, description) {
    const existing = themes.find((t) => t.name === name);
    if (existing) {
      return existing;
    }

    const newTheme = {
      id: generateId("theme_"),
      name,
      description,
    };
    setThemes((prev) => [...prev, newTheme]);
    return newTheme;
  }

  function getThemeById(id) {
    return themes.find((t) => t.id === id);
  }

  function getThemeByName(name) {
    return themes.find((t) => t.name === name);
  }

  return {
    themes,
    addTheme,
    getThemeById,
    getThemeByName,
  };
}
