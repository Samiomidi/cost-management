import React from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  useTheme,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import { tokens } from "../../styles/theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ExpenseDate from "./ExpenseDate";

function ExpenseItem(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: `${colors.primary[400]}`,
        color: `${colors.gray[800]}`,
        padding: "10px",
        marginBottom: "5px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        gap="20px"
        alignItems="center"
      >
        <ExpenseDate date={props.date} />
        <Typography variant="h4" color={colors.gray[100]} fontWeight="bold">
          {props.title}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        gap="20px"
        alignItems="center"
      >
        <Typography variant="h6" color={colors.gray[100]} fontWeight="bold">
          {props.amount
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <ButtonGroup>
          <IconButton
            sx={{ color: `${colors.primary[200]}` }}
            aria-label="edit item"
            component="label"
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{ color: `${colors.redAccent[500]}` }}
            aria-label="delete item"
            component="label"
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </ButtonGroup>
      </Box>
    </Card>
  );
}

export default ExpenseItem;
