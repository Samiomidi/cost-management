import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../styles/theme";
import { mockDataContacts } from "../data/mockData";
import Header from "../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex:0.5},
    { field: "registrarId", headerName: "Registrar ID", flex:1 },
    {
      field: "name",
      headerName: "Name",
         flex:"auto",
      cellClassName: "name-column--cell",

    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex:0.5,
      headerAlign: "left",
      align: "left",
    
    },
    {
      field: "phone",
      headerName: "Phone Number",
         flex:"auto",
    },
    {
      field: "email",
      headerName: "Email",
         flex:"auto",
    },
    {
      field: "address",
      headerName: "Address",
         flex:"auto",
    },
    {
      field: "city",
      headerName: "City",
         flex:"auto",
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
         flex:"auto",
    },
  ];

  return (
    <Box m="20px" >
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
      
        />
      </Box>
    </Box>
  );
};

export default Contacts;
