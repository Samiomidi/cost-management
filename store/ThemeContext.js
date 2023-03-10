import React from "react";

const ThemeContext = React.createContext({
  isDarkTheme: false,
  onSetIsDarkTheme: () => {},
});
export default ThemeContext;
