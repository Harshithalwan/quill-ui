import { createContext, useCallback, useState } from "react";

export const ThemeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

const ThemeContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () =>
    useCallback(() => {
      setDarkMode(!darkMode);
    }, [darkMode]);
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;