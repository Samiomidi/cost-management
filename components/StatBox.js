import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../styles/theme";
import ProgressCircle from "./ProgressCircle";
import { useMediaQuery } from "react-responsive";
const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
const isMobile = useMediaQuery({ maxWidth: 600 })
  return (
    <Box width="100%" m={isMobile ? "0 10px":"0 30px"} textAlign={isMobile ? "center":undefined }>
      <Box display="flex" justifyContent= {isMobile ? "center":"space-between" }>
        <Box >
          {icon}
          <Typography
            variant={isMobile ? "h5":"h4" }
            fontWeight="bold"
            sx={{ color: colors.gray[100] }}
          >
            {title}
          </Typography>
        </Box>
        {!isMobile && <Box>
          <ProgressCircle progress={progress} />
        </Box>}
        
      </Box>
      <Box display="flex" justifyContent= {isMobile ? "center":"space-between"} mt="2px">
        <Typography variant={isMobile ? "h6":"h5" } sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {isMobile? "":increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
