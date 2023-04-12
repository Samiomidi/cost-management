import React, { useState, useEffect, Fragment } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import WidgetsIcon from "@mui/icons-material/Widgets";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { sidebarClasses, menuClasses } from "react-pro-sidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
const Item = ({
  title,
  to = selected,
  icon,
  selected,
  setSelected,
  disabled,
  prefix,
  suffix,
  style,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();

  useEffect(() => {
    // console.log(selected);
    const path = router.pathname.split("/")[1];
    const selectedPath = path.charAt(0).toUpperCase() + path.slice(1);
    if (!selected) {
      setSelected(selectedPath);
    }
  }, []);
  return (
    <MenuItem
      disabled={disabled}
      prefix={prefix}
      suffix={suffix}
      active={selected === title}
      style={{
        color: colors.gray[100],
      }}
      onClick={() => {
        router.push(to);
        setSelected(title);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function SideMenu({ menuOnClick }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  useEffect(() => {
    // setIsCollapsed(isMobile);
    setIsShowSidebar(!isMobile);

    if (menuOnClick) {
      setIsCollapsed(false);
      setIsShowSidebar(true);
    } else {
      setIsShowSidebar(!isMobile);
    }
  }, [isMobile, menuOnClick]);

  return (
    <Fragment>
      <Sidebar
        rootStyles={{
          minWidth: isShowSidebar ? "250px" : "0",
          position: isMobile ? "fixed" : "relative",
          transition: "0.3s all ease-out",
          zIndex: 10000,
          overflowY: "visible",
          right: "auto",
          left: 0,
          height: "100vh",
          display: "block",
          border: "none",
        }}
        defaultCollapsed={isCollapsed}
        backgroundColor={`${colors.primary[400]} !important`}
        width={isShowSidebar ? "250px" : "0"}
        collapsedWidth={isShowSidebar ? "80px" : "0px"}
      >
        <Menu
          rootStyles={{
            [`.${menuClasses.button}`]: {
              "&:hover": {
                color:
                  theme.palette.mode === "dark"
                    ? "#6870fa !important"
                    : `${colors.calm[400]} !important`,
                backgroundColor: "transparent !important",
              },
            },
            [`.${menuClasses.active}`]: {
              color:
                theme.palette.mode === "dark"
                  ? "#6870fa !important"
                  : `${colors.calm[400]} !important`,
              backgroundColor: "transparent !important",
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem>
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="2rem"
              >
                <Typography variant="h3" color={colors.gray[100]}>
                  ADMIN
                </Typography>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src="/assets/admin.jpg"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.gray[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Sami Omidi
                </Typography>
                <Typography
                  variant="h5"
                  color={
                    theme.palette.mode === "dark"
                      ? colors.secondary[500]
                      : "#6870fa"
                  }
                >
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Expenses"
              to="/expenses"
              icon={<TrendingDownOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Incomes"
              to="/incomes"
              icon={<TrendingUpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          /> */}
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
      {!isCollapsed
        ? !isMobile && (
            <IconButton
              sx={{
                backgroundColor: colors.primary[400],
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                position: "absolute",
                top: "25px",
                left: "260px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6870fa",
                },
              }}
            >
              <MoreVertIcon onClick={() => setIsCollapsed(!isCollapsed)} />
            </IconButton>
          )
        : !isMobile && (
            <IconButton
              sx={{
                backgroundColor: colors.primary[400],
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                position: "absolute",
                top: "25px",
                left: "90px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6870fa",
                },
              }}
            >
              {!isMobile && (
                <WidgetsIcon onClick={() => setIsCollapsed(!isCollapsed)} />
              )}
            </IconButton>
          )}
    </Fragment>
  );
}

export default SideMenu;
