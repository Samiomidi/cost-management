import React, { useContext, useState, useEffect } from "react";
import { Box, IconButton, useTheme, Badge, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { ColorModeContext, tokens } from "../../styles/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "../modals/Modal";
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

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installationAccepted, setInstallationAccepted] = useState(false);
  const [installationDenied, setInstallationDenied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);
  const btnInstallHandler = (e) => {
    setInstallationAccepted(false);
    setInstallationDenied(false);
    if (deferredPrompt) {
      e.target.style.opacity = "0";
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setShowModal(true);
          setInstallationAccepted(true);
        } else {
          setShowModal(true);
          setInstallationDenied(true);
        }
        setDeferredPrompt(null);
      });
    }
    return;
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
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

      {installationAccepted && (
        <Modal
          showModal={showModal}
          style={{ backgroundImage: `url(/modalBackgrounds/confetti-32.gif)` }}
        >
          <Typography variant="h3">Congratulations</Typography>
          <span>
            The program has been successfully added to your home page.
          </span>
        </Modal>
      )}
      {installationDenied && (
        <Modal showModal={showModal}>
          You can always install this web application by clicking on the{" "}
          <strong
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Download Icon (
            <IconButton
              onClick={btnInstallHandler}
              sx={{ color: colors.secondary[500] }}
            >
              <DownloadForOfflineIcon />
            </IconButton>
            )
          </strong>
        </Modal>
      )}
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
          <PersonOutlinedIcon />
        </IconButton>
        {isMobile && (
          <IconButton onClick={menuOnClick}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
        {deferredPrompt && (
          <IconButton onClick={btnInstallHandler}>
            <DownloadForOfflineIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default Topbar;
