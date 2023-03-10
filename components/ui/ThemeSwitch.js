import {
  CardHeader,
  Switch,
  Box,
  Container,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useState, useContext } from "react";
import ThemeContext from "../../store/ThemeContext";
const ThemeSwitch = (props) => {
  const ctx = useContext(ThemeContext);
  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    ctx.onSetIsDarkTheme(!ctx.isDarkTheme);
  };
  console.log(ctx);
  return (
    <Container>
      <div className="App">
        <Box component="div" p={5}></Box>

        <CardHeader
          action={
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={changeTheme} />}
                label={props.lable}
              />
            </FormGroup>
          }
        />
      </div>
    </Container>
  );
};

export default ThemeSwitch;
