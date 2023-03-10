import { useState, useContext } from "react";
import Layout from "../components/layout/layout";
import ThemeSwitch from "../components/ui/ThemeSwitch";
import ThemeContext from "../store/ThemeContext";
// Import MUI stuff
// import "@fontsource/roboto"; // Loading Roboto font. MUI was designed with this font in mind.
import {
  Card,
  CardHeader,
  Switch,
  CardContent,
  Box,
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define theme settings
const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

const App = ({ Component, pageProps }) => {
  // The light theme is used by default
  const ctx = useContext(ThemeContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  console.log(ctx.isDarkTheme);
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>

      {/* <ThemeSwitch label="Dark Theme" /> */}
      <Container>
        <div className="App">
          <Box component="div" p={5}></Box>

          <CardHeader
            action={
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={isDarkTheme} onChange={changeTheme} />
                  }
                  label="Dark Theme"
                />
              </FormGroup>
            }
          />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;
