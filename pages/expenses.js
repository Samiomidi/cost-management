import React from "react";
import { Box, useTheme } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Header from "../components/Header";
import { tokens } from "../styles/theme";
import ExpenseItem from "../components/expenses/ExpenseItem";
import { mockDataExpenses } from "../data/mockData";
import CustomIconButton from "../components/ui/CustomIconButton";

function Expenses() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  );
}

export default Expenses;
