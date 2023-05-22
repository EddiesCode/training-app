import React, { useContext, createContext, useState } from "react";

const ThemeContext = createContext();

export const useDarkMode = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider
      value={{
        darkMode: darkMode,
        setDarkMode: setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
