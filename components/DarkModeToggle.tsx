import { useEffect, useState } from "react";
import { MoonIcon } from "./icons/moon";
import { SunIcon } from "./icons/sun";

const DarkModeToggle = () => {
  let [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }

    setIsDarkMode(!isDarkMode);
  };

  return (
    <label className="cursor-pointer relative" htmlFor="dark-mode-toggle">
      <div className="flex items-center">
        <span className="absolute top-1 right-1 flex items-center h-4 pr-1" aria-hidden="true">
          <MoonIcon />
        </span>
        <span className="absolute top-1 left-1 flex items-center h-4 pl-1" aria-hidden="true">
          <SunIcon />
        </span>
        <input
          type="checkbox"
          id="dark-mode-toggle"
          className="sr-only"
          checked={!isDarkMode}
          onChange={toggleTheme}
        />
        <div className="toggle-bg bg-toggle-light dark:bg-toggle-dark h-6 w-11 rounded-full" aria-hidden="true"></div>
        <span className="sr-only">Dark Mode</span>
      </div>
    </label>
  );
};

export default DarkModeToggle;
