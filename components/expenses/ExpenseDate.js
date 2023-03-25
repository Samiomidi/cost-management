import React from "react";
import styled from "styled-components";
import { Card, Typography, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
const ExpenseDate = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const monthMobile = props.date.toLocaleString("en-US", { month: "short" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: `${isMobile ? "2.5rem" : "4rem"}`,
        height: `${isMobile ? "2.5rem" : "4rem"}`,
        border: "1px solid #ececec",
        backgroundColor: `${colors.primary[600]}`,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize={`${isMobile ? "0.5rem" : "0.75rem"}`}
      >
        {isMobile ? monthMobile : month}
      </Typography>
      <Typography fontSize={`${isMobile ? "0.4rem" : "0.6rem"}`}>
        {year}
      </Typography>
      <Typography fontSize={`${isMobile ? "0.4rem" : "0.6rem"}`}>
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
