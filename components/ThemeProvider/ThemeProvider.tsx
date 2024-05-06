"use client";
import { ThemeContext } from "@/context/ThemeContext";
import useTheme from "@/hooks/useTheme";
import { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`h-full ${darkMode ? "dark" : ""}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
