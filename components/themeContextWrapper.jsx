import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './themeContext';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.light);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    const enableDarkMode = () => {
      document.body.classList.remove(themes.light);
      document.body.classList.add(themes.dark);
      localStorage.setItem('theme', 'dark');
    }
    const enableLightMode = () => {
      document.body.classList.remove(themes.dark);
      document.body.classList.add(themes.light);
      localStorage.setItem('theme', 'light');
      console.log("I'm called");
    }
    // window.matchMedia('(prefers-color-scheme: dark)').matches ? setTheme(themes.dark) : setTheme(themes.light);
    theme === themes.light ? enableLightMode() : enableDarkMode();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}