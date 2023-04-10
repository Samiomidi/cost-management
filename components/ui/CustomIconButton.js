import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";

function CustomIconButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { icon, title } = props;
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box>
      <Button
        sx={{
          backgroundColor: colors.calm[700],
          color: colors.gray[100],
          fontSize: `${isMobile ? "9.5px" : "14px"}`,
          fontWeight: "bold",
          padding: `${isMobile ? "5px 10px" : "10px 20px"}`,
        }}
      >
        <Box sx={{ mr: `${isMobile ? "0px" : "10px"}` }}>{icon}</Box>
        {!isMobile && title}
      </Button>
    </Box>
  );
}

export default CustomIconButton;
