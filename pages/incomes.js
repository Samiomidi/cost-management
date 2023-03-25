import { Box, Typography, useTheme, Button, ButtonGroup } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { DataGrid, GridLogicOperator, GridCellModes } from "@mui/x-data-grid";
import { tokens } from "../styles/theme";
import { mockDataIncomes } from "../data/mockData";
import Header from "../components/Header";
import CustomGridToolbar from "../components/layout/CustomGridToolbar";
import CustomIconButton from "../components/ui/CustomIconButton";

const Incomes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
      cellClassName: "name-column--cell",
      editable: true,
    },

    {
      field: "amount",
      headerName: "Amount",
      editable: true,
      type: "number",
      minWidth: 150,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.amount}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      editable: true,
      type: "date",
      minWidth: 150,
      backgroundColor: "#fff",
      renderCell: (params) =>
        params.row.date.toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      field: "pool",
      headerName: "Pool",
      minWidth: 150,
      editable: true,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 150,
      // editable: true,
    },
    // {
    //   field: "deleteButton",
    //   headerName: "Actions",
    //   description: "Actions column.",
    //   sortable: false,
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <Button
    //         onClick={(e) => onButtonClick(e, params.row)}
    //         variant="contained"
    //       >
    //         Delete
    //       </Button>
    //     );
    //   },
    // },
  ];
  function EditToolbar(props) {
    const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
      props;

    const handleSaveOrEdit = () => {
      if (!selectedCellParams) {
        return;
      }
      const { id, field } = selectedCellParams;
      if (cellMode === "edit") {
        setCellModesModel({
          ...cellModesModel,
          [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.View },
          },
        });
      } else {
        setCellModesModel({
          ...cellModesModel,
          [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.Edit },
          },
        });
      }
    };

    const handleCancel = () => {
      if (!selectedCellParams) {
        return;
      }
      const { id, field } = selectedCellParams;
      setCellModesModel({
        ...cellModesModel,
        [id]: {
          ...cellModesModel[id],
          [field]: { mode: GridCellModes.View, ignoreModifications: true },
        },
      });
    };

    const handleMouseDown = (event) => {
      // Keep the focus in the cell
      event.preventDefault();
    };

    return (
      <ButtonGroup sx={{ gap: "2px" }}>
        <Button
          onClick={handleSaveOrEdit}
          onMouseDown={handleMouseDown}
          disabled={!selectedCellParams}
          variant="outlined"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.gray[100],
          }}
        >
          {cellMode === "edit" ? "Save" : "Edit"}
        </Button>
        <Button
          onClick={handleCancel}
          onMouseDown={handleMouseDown}
          disabled={cellMode === "view"}
          variant="outlined"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.gray[100],
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>
    );
  }

  EditToolbar.propTypes = {
    cellMode: PropTypes.oneOf(["edit", "view"]).isRequired,
    cellModesModel: PropTypes.object.isRequired,
    selectedCellParams: PropTypes.shape({
      field: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
    setCellModesModel: PropTypes.func.isRequired,
  };

  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});

  const handleCellFocus = useCallback((event) => {
    const row = event.currentTarget.parentElement;

    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;

    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;

    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = useCallback(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  return (
    <Box m="20px">
      <Header title="INCOMES" subtitle="List of Incomes" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
            backgroundColor: `${colors.blueAccent[600]} !important`,
          },
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "rgb(18,18,18)",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataIncomes}
          columns={columns}
          components={{ Toolbar: CustomGridToolbar }}
          // editMode="row"
          onCellKeyDown={handleCellKeyDown}
          cellModesModel={cellModesModel}
          onCellModesModelChange={(model) => setCellModesModel(model)}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              cellMode,
              selectedCellParams,
              setSelectedCellParams,
              cellModesModel,
              setCellModesModel,
            },
            cell: {
              onFocus: handleCellFocus,
            },
          }}
        />
      </Box>
      clickedRow: {clickedRow ? `${clickedRow.title}` : null}
    </Box>
  );
};

export default Incomes;
