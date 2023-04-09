import { Box, Typography, useTheme, Tooltip, Fade } from "@mui/material";
import { tokens } from "../../styles/theme";
import ProgressCircle from "../ProgressCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
const StatBox = ({ title, subtitle, icon, progress, increase, desc }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      width="100%"
      m={isMobile ? "0 10px" : "0 30px"}
      textAlign={isMobile ? "center" : undefined}
    >
      <Box
        display="flex"
        justifyContent={isMobile ? "center" : "space-between"}
      >
        <Box>
          {icon}

          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            sx={{ color: colors.gray[100] }}
          >
            {title}
          </Typography>
        </Box>
        {!isMobile && (
          <Box>
            <ProgressCircle
              selectedValue={progress * 100}
              maxValue={100}
              textColor={colors.gray[100]}
              activeStrokeColor={colors.greenAccent[500]}
              withGradient
              backgroundColor={colors.primary[400]}
              strokeWidth={3}
              radius={20}
              valueFontSize={12}
            />
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent={isMobile ? "center" : "space-between"}
        mt="2px"
      >
        <Tooltip
          title={desc}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          followCursor
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{ color: colors.greenAccent[500] }}
          >
            {subtitle}
          </Typography>
        </Tooltip>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {isMobile ? "" : increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
