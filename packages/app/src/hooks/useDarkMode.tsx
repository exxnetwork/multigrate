import React, { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage &&
      localStorage?.theme === "dark"
  );

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const html = window.document.documentElement;

      const prevTheme = isDarkMode ? "light" : "dark";
      html.classList.remove(prevTheme);

      // isDarkMode || window.matchMedia("(prefers-color-scheme: dark)")

      const nextTheme = isDarkMode ? "dark" : "light";
      html.classList.add(nextTheme);

      localStorage.setItem("theme", nextTheme);
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
