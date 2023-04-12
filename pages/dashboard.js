import { useState } from "react";
import { Box, IconButton, Typography, useTheme, Tooltip } from "@mui/material";
import { tokens } from "../styles/theme";
import { mockTransactions, mockDataStatBox } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import GeographyChart from "../components/GeographyChart";
import BarChart from "../components/BarChart";
import CustomIconButton from "../components/ui/CustomIconButton";
import ProgressCircle from "../components/ProgressCircle";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import StatBoxes from "../components/statBox/StatBoxes";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
const Dashboard = ({ isLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1080px)");
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: isMobile ? 50 : 250,
      },
    },
  };

  const names = ["Personal", "Villa", "Work", "Tehran", "Tabriz"];

  const [project, setProject] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProject(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <CustomIconButton
          icon={<DownloadOutlinedIcon />}
          title={"Download Reports"}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap="20px">
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            "& .css-75gcxd-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
              color: `${colors.primary[100]}`,
            },
          }}
        >
          <Tooltip title="Project Balance" placement="right-start" arrow>
            <Typography
              variant={isMobile ? "h2" : "h1"}
              color={colors.secondary[600]}
              fontWeight="bold"
              sx={{ mb: "5px" }}
            >
              2520 $
            </Typography>
          </Tooltip>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Project</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={project}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={project.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Define Project in Projects Tab.</FormHelperText>
          </FormControl>
        </Box>
        <Box
          display="grid"
          flexDirection="column"
          gridTemplateColumns={isMobile ? "repeat(4, 1fr)" : "repeat(12, 1fr)"}
          gridAutoRows="140px"
          gap="20px"
        >
          <StatBoxes data={mockDataStatBox} />
          {/* ROW 2 */}
          {!isMobile && (
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  onClick={() => {
                    router.push("/line");
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.gray[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.secondary[500]}
                  >
                    $59,342.32
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.secondary[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box
                height="250px"
                m="-20px 0 0 0"
                onClick={() => {
                  router.push("/line");
                }}
                sx={{ cursor: "pointer" }}
              >
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          )}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            borderRadius="5px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.gray[100]}
              p="15px"
            >
              <Typography
                color={colors.gray[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.secondary[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.gray[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.gray[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={
                    transaction.cost >= 0
                      ? colors.secondary[500]
                      : colors.danger[500]
                  }
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>

          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
            borderRadius="5px"
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle
                selectedValue={65}
                maxValue={100}
                textColor={colors.gray[100]}
                activeStrokeColor={colors.secondary[500]}
                withGradient
                backgroundColor={colors.primary[400]}
                strokeWidth={5}
                radius={60}
                valueFontSize={20}
              />
              <Typography
                variant="h5"
                color={colors.secondary[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            onClick={() => {
              router.push("/bar");
            }}
            sx={{ cursor: "pointer" }}
            borderRadius="5px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
            onClick={() => {
              router.push("/geography");
            }}
            sx={{ cursor: "pointer" }}
            borderRadius="5px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
