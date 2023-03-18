import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { ColorModeContext, setMode } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../components/layout/Topbar";
import SideMenu from "../components/layout/SideMenu";
import Loading from "../components/ui/Loading";
import { ProSidebarProvider } from "react-pro-sidebar";
import NextNProgress from "nextjs-progressbar";
import Backdrop from "@mui/material";
function App({ Component, pageProps }) {
  const [theme, colorMode] = setMode();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <NextNProgress height={3} color="#fff" stopDelayMs={0} />
          {isLoading && <Loading />}
          <CssBaseline />
          <div className="app">
            <SideMenu />
            <main className="content">
              <Topbar />
              <Component {...pageProps} />
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
