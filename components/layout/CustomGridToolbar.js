import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, ButtonGroup } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListIcon from "@mui/icons-material/List";
import { tokens } from "../../styles/theme";
import { useTheme } from "@mui/material";
function CustomGridToolbar() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showToolbar, setShowToolbar] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const toggleToolbar = () => {
    setShowToolbar(!showToolbar);
  };
  useEffect(() => {
    if (!isMobile) {
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  }, [isMobile]);

  return (
    <Box
      sx={{
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.gray[100]} !important`,
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        {isMobile && <ListIcon onClick={toggleToolbar} />}
        {showToolbar && (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
          </GridToolbarContainer>
        )}
      </Box>
    </Box>
  );
}

export default CustomGridToolbar;
