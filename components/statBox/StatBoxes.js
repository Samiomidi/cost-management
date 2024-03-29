import React from "react";
import StatBox from "./StatBox";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

function StatBoxes({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:1080px)");

  return data.map((stat) => {
    return (
      <StatBox
        key={stat.title}
        title={stat.title}
        subtitle={stat.subtitle}
        progress={stat.progress}
        change={stat.change}
        icon={isMobile ? stat.icon("18px") : stat.icon("35px")}
        desc={stat.desc}
        iconBg={stat.iconBg}
        iconShadow={stat.iconShadow}
      />
    );
  });
}

export default StatBoxes;
