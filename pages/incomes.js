import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button, MenuItem } from "@mui/material";
import { data, states } from "../data/makeData";
import Header from "../components/Header";
import ActionMenu from "../components/dataGridTable/ActionMenu";
import { Delete, Edit, AccountCircle } from "@mui/icons-material";
import CreateNewAccountModal from "../components/modals/CreateNewAccountModal";
import { useRouter } from "next/router";
const Incomes = ({ isLoading }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setTableData(() => data);
  }, []);
  const handleCreateNewRow = (values) => {
    tableData.unshift(values);
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
            tableData
              ? tableData.map((data) => {
                  return {
                    ...data,
                    date: data.date.toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }),
                  };
                })
              : []
          }
          editingMode="modal" //default
          enableColumnOrdering
          enableStickyHeader
          enableColumnResizing
          enablePinning
          enableGrouping
          enableRowSelection
          state={{ isLoading: isLoading }}
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          enableRowActions
          positionActionsColumn="first"
          renderRowActionMenuItems={({ table, closeMenu, row }) => (
            <ActionMenu
              table={table}
              row={row}
              items={[
                {
                  title: "View Profile",
                  key: "0",
                  onClick: () => closeMenu(),
                  sx: { m: 0 },
                  icon: <AccountCircle />,
                },
                {
                  title: "Edit",
                  key: "1",
                  onClick: () => table.setEditingRow(row),
                  sx: { m: 0 },
                  icon: <Edit />,
                },
                {
                  title: "Remove",
                  key: "2",
                  onClick: () => handleDeleteRow(row),
                  sx: { m: 0 },
                  icon: <Delete />,
                },
              ]}
            />
          )}
          enableMultiRemove={true}
          renderTopToolbarCustomActions={({ table }) => {
            const handleMultiDelete = () => {};

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
