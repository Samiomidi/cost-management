import React from "react";
import StatBox from "./StatBox";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

function StatBoxes({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");

  return data.map((stat) => {
    return (
      <Box
        gridColumn={isMobile ? "span 2" : "span 3"}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <StatBox
          key={stat.title}
          title={stat.title}
          subtitle={stat.subtitle}
          progress={stat.progress}
          increase={stat.increase}
          icon={stat.icon}
          desc={stat.desc}
        />
      </Box>
    );
  });
}

export default StatBoxes;
