import React from "react";
import styled from "styled-components";
import { Card, Typography, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
const ExpenseDate = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "4rem",
        height: "4rem",
        border: "1px solid #ececec",
        backgroundColor: `${colors.primary[600]}`,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography fontWeight="bold" fontSize="0.75rem">
        {month}
      </Typography>
      <Typography fontSize="0.6rem">{year}</Typography>
      <Typography fontSize="0.6rem" fontWeight="bold">
        {day}
      </Typography>
    </Card>
  );
};

const Year = styled.div`
  font-size: 0.75rem;
`;

const Day = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export default ExpenseDate;
