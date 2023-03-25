import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../styles/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
function Header({ title, subtitle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box mb="30px">
      <Typography
        variant={isMobile?"h4":"h2"}
        color={colors.gray[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant={isMobile?"h6":"h5"} color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
