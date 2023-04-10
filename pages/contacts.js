import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../styles/theme";
import { mockDataContacts } from "../data/mockData";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import CustomGridToolbar from "../components/layout/CustomGridToolbar";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "registrarId", headerName: "Registrar ID", minWidth: 100 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 70,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 250,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 110,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      minWidth: 100,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
            color: colors.secondary[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.calm[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.calm[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: CustomGridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
