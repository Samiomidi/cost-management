import { Box, Typography, useTheme, Tooltip, Fade, Icon } from "@mui/material";
import { tokens } from "../../styles/theme";
import ProgressCircle from "../ProgressCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fragment } from "react";

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  change,
  desc,
  iconBg,
  iconShadow,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:1080px)");

  return (
    <Box
      p="20px"
      textAlign={isMobile ? "center" : undefined}
      width="100%"
      display="flex"
      justifyContent="space-between"
      gridColumn={isMobile ? "span 2" : "span 3"}
      backgroundColor={colors.primary[400]}
      position="relative"
      borderRadius="5px"
    >
      <Box
        position="absolute"
        width={isMobile ? "35px" : "60px"}
        height={isMobile ? "35px" : "60px"}
        boxShadow={iconShadow}
        borderRadius="5px"
        left="10px"
        top={isMobile ? "-10px" : "-20px"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: iconBg }}
      >
        {icon}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          sx={{
            color: change >= 0 ? colors.secondary[500] : colors.danger[600],
          }}
        >
          {`${change} %`}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        <Tooltip
          title={desc}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          followCursor
        >
          <Typography variant="subtitle2" sx={{ color: colors.gray[400] }}>
            {subtitle}
          </Typography>
        </Tooltip>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          sx={{ color: colors.gray[100] }}
          mb="15px"
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
