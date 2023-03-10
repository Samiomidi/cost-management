import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState();

  const themeContext = {
    isDarkTheme: isDarkTheme,
    setIsDarkTheme: (data) => {
      setIsDarkTheme(data);
    },
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
