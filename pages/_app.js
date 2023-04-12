import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { ColorModeContext, setMode } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../components/layout/Topbar";
import SideMenu from "../components/layout/SideMenu";
import { ProSidebarProvider } from "react-pro-sidebar";

function App({ Component, pageProps }) {
  const [theme, colorMode] = setMode();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
  });
  const [menuOnClick, setMenuOnClick] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <div className="app">
            <SideMenu menuOnClick={menuOnClick} />
            <main
              className="content"
              style={{
                backgroundColor: menuOnClick ? "#ffffff29" : "",
                backdropFilter: menuOnClick ? "blur(4px)" : "",
              }}
              onClick={menuOnClick ? () => setMenuOnClick(false) : null}
            >
              <Topbar menuOnClick={() => setMenuOnClick(!menuOnClick)} />
              <Component {...pageProps} isLoading={isLoading} />
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
