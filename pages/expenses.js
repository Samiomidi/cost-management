import React from "react";
import { Box, useTheme, Card, Typography } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Header from "../components/Header";
import { tokens } from "../styles/theme";
import ExpenseItem from "../components/expenses/ExpenseItem";
import { mockDataExpenses } from "../data/mockData";
import CustomIconButton from "../components/ui/CustomIconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
function Expenses() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EXPENSES"
          subtitle="Welcome to your expense management"
        />
        <CustomIconButton icon={<AddCircleOutlinedIcon />} title="Add Item" />
      </Box>
      <Box
        display="grid"
        flexDirection="column"
        gridTemplateColumns={isMobile ? "repeat(4, 1fr)" : "repeat(12, 1fr)"}
        gridAutoRows="140px"
        gap="20px"
      >
        <Box gridColumn="span 8" gridRow="span 2" sx={{ overflowY: "scroll" }}>
          {mockDataExpenses.map((data) => {
            return (
              <li key={data.id}>
                <ExpenseItem
                  title={data.title}
                  amount={data.amount}
                  date={data.date}
                />
              </li>
            );
          })}
        </Box>
        <Box gridColumn="span 4" gridRow="span 2">
          <Typography variant="h3" color={colors.primary[100]}>
            Total Expenses
          </Typography>
          <Card>
            {mockDataExpenses
              .map((amount) => {
                return amount.amount;
              })
              .reduce((acc, cur) => acc + cur)}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Expenses;
