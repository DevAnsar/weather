import { useDarkMode } from "../../hooks/useDarkMode";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const DarkModeToggleButton = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const renderThemeChanger = () => {
    if (!mounted) return null;
    if (darkMode) {
      return (
        <SunIcon
          className="w-6 h-6 text-yellow-500 hover:scale-105"
          role="button"
          onClick={() => setDarkMode(false)}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-6 h-6 text-teal-600 hover:scale-105"
          role="button"
          onClick={() => setDarkMode(true)}
        />
      );
    }
  };

  return <>{renderThemeChanger()}</>;
};

export default DarkModeToggleButton;
