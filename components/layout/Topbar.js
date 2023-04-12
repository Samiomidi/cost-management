import React, { useContext, useState } from "react";
import { Box, IconButton, useTheme, Badge } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { ColorModeContext, tokens } from "../../styles/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
function Topbar({ menuOnClick }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery("(max-width:1080px)");
  const [showSearchInput, setShowSearchInput] = useState({
    width: "0px",
    visibility: "hidden",
    backgroundColor: "",
  });
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      sx={{ position: "sticky", top: "0px" }}
    >
      {/* Search Bar */}
      <Box
        display="flex"
        borderRadius="3px"
        backgroundColor={showSearchInput.backgroundColor}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            width: showSearchInput.width,
            visibility: showSearchInput.visibility,
            transition: "0.3s all ease-in-out",
            backgroundColor: colors.primary[400],
          }}
          placeholder="Search"
        />
        <IconButton
          type="button"
          sx={{ p: 1 }}
          onClick={() =>
            setShowSearchInput(
              showSearchInput.width === "0px"
                ? {
                    width: isMobile ? "25vw" : "200px",
                    visibility: "visible",
                    backgroundColor: colors.primary[400],
                  }
                : { width: "0px", visibility: "hidden", backgroundColor: "" }
            )
          }
        >
          <SearchIcon />
        </IconButton>
      </Box>
      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <Badge badgeContent={4} color="secondary">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        {isMobile && (
          <IconButton onClick={menuOnClick}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default Topbar;
