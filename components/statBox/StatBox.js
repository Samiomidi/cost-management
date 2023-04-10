import { Box, Typography, useTheme, Tooltip, Fade } from "@mui/material";
import { tokens } from "../../styles/theme";
import ProgressCircle from "../ProgressCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fragment } from "react";

const StatBox = ({ title, subtitle, icon, progress, change, desc }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      p="20px"
      textAlign={isMobile ? "center" : undefined}
      width="100%"
      display="flex"
      justifyContent="space-between"
      gridColumn={isMobile ? "span 2" : "span 3"}
      backgroundColor={colors.primary[400]}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ color: colors.secondary[500] }}
        >
          {icon}
        </Typography>
        <Tooltip
          title={desc}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          followCursor
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ color: colors.secondary[500] }}
          >
            {subtitle}
          </Typography>
        </Tooltip>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          sx={{
            color: change >= 0 ? colors.secondary[600] : colors.danger[600],
          }}
        >
          {`${change} %`}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          sx={{ color: colors.gray[100] }}
        >
          {title}
        </Typography>
        <ProgressCircle
          selectedValue={progress * 100}
          maxValue={100}
          textColor={colors.gray[100]}
          activeStrokeColor={colors.secondary[500]}
          withGradient
          backgroundColor={colors.primary[400]}
          strokeWidth={3}
          radius={20}
          valueFontSize={12}
        />
      </Box>
    </Box>
  );
};

export default StatBox;
