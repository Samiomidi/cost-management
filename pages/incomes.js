import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { Delete, Edit, AccountCircle } from "@mui/icons-material";
import { tokens } from "../styles/theme";

import { data, states } from "../data/makeData";
import Header from "../components/Header";

const Incomes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue("firstName")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        minSize: 90,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 160,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },

      {
        accessorKey: "amount",
        header: "Amount",
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 160,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "date",
        }),
      },
      {
        accessorKey: "pool",
        header: "Pool",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "user",
        header: "User",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "state",
        header: "State",
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      },
    ],
    [getCommonEditTextFieldProps]
  );

  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   {
  //     field: "title",
  //     headerName: "Title",
  //     flex: 1,
  //     minWidth: 150,
  //     cellClassName: "name-column--cell",
  //     editable: true,
  //   },

  //   {
  //     field: "amount",
  //     headerName: "Amount",
  //     editable: true,
  //     type: "number",
  //     minWidth: 150,
  //     renderCell: (params) => (
  //       <Typography color={colors.greenAccent[500]}>
  //         ${params.row.amount}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "date",
  //     headerName: "Date",
  //     editable: true,
  //     type: "date",
  //     minWidth: 150,
  //     backgroundColor: "#fff",
  //     renderCell: (params) =>
  //       params.row.date.toLocaleString("en-US", {
  //         day: "2-digit",
  //         month: "short",
  //         year: "numeric",
  //       }),
  //   },
  //   {
  //     field: "pool",
  //     headerName: "Pool",
  //     minWidth: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "user",
  //     headerName: "User",
  //     minWidth: 150,
  //     // editable: true,
  //   },
  // ];

  return (
    <Box m="20px" overflow="hidden">
      <Header title="INCOMES" subtitle="List of Incomes" />
      <Box m="40px 0 0 0">
        <MaterialReactTable
          initialState={{ isLoading: false }}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              header: "",
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 40,
            },
          }}
          defaultColumn={{
            minSize: 60, //allow columns to get smaller than default
            maxSize: 9001, //allow columns to get larger than default
          }}
          columns={columns}
          data={
            tableData.map((data) => {
              return {
                id: data.id,
                title: data.title,
                date: data.date.toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                }),
                amount: data.amount,
                pool: data.pool,
                user: data.user,
                state: data.state,
              };
            }) ?? []
          }
          editingMode="modal" //default
          enableColumnOrdering
          enableStickyHeader
          enableColumnResizing
          enablePinning
          enableGrouping
          enableRowSelection
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          enableRowActions
          positionActionsColumn="first"
          renderRowActionMenuItems={({ closeMenu, row, table }) => [
            <MenuItem
              key={0}
              onClick={() => {
                // View profile logic...
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              View Profile
            </MenuItem>,
            <MenuItem
              key={1}
              onClick={() => table.setEditingRow(row)}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Edit
            </MenuItem>,
            <MenuItem
              key={2}
              onClick={() => handleDeleteRow(row)}
              sx={{ m: 0 }}
            >
              <ListItemIcon color="error">
                <Delete />
              </ListItemIcon>
              Remove
            </MenuItem>,
          ]}
          // renderRowActionMenuItems={({ row, table }) => (
          //   <Fragment>
          //     <MenuItem>
          //       <Tooltip arrow placement="left" title="Edit">
          //         <IconButton onClick={() => table.setEditingRow(row)}>
          //           <Edit />
          //         </IconButton>
          //       </Tooltip>
          //     </MenuItem>
          //     <MenuItem>
          //       <Tooltip arrow placement="right" title="Delete">
          //         <IconButton
          //           color="error"
          //           onClick={() => handleDeleteRow(row)}
          //           title="Remove"
          //         >
          //           <Delete />
          //         </IconButton>
          //       </Tooltip>
          //     </MenuItem>
          //   </Fragment>
          // )}

          renderTopToolbarCustomActions={({ table }) => {
            const handleMultiDelete = () => {
              alert("Are you sure you want to remove these items?");
            };

            return (
              <div style={{ display: "flex", gap: "1rem" }}>
                <Button
                  color="secondary"
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Create New Account
                </Button>
                <Button
                  color="error"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  onClick={handleMultiDelete}
                  variant="contained"
                >
                  Remove
                </Button>
              </div>
            );
          }}
          // renderTopToolbarCustomActions={() => (
          //   <Button
          //     color="secondary"
          //     onClick={() => setCreateModalOpen(true)}
          //     variant="contained"
          //   >
          //     Create New Account
          //   </Button>
          // )}
        />
      </Box>

      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </Box>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button sx={{ color: `${colors.primary[100]}` }} onClick={onClose}>
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;
export default Incomes;
