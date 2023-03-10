import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeSwitch from "./ui/ThemeSwitch";
import { useTheme } from "@mui/material/styles";

export default function TemporaryDrawer(props) {
  //side = left, right,bottom, top

  const [state, setState] = React.useState({ side: true });
  const theme = useTheme();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {props.section1.map((item) => (
            <ListItem
              key={item}
              disablePadding
              sx={{
                ":hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <ListItemButton>
                <ListItemText primary={item[1]} />
                <ListItemText primary={item[0]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {props.section2.map((item) => (
            <ListItem
              key={item}
              disablePadding
              sx={{
                ":hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <ListItemButton>
                <ListItemText primary={item[1]} />
                <ListItemText primary={item[0]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <ThemeSwitch label="Dark Theme" />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={props.side}>
        <MenuIcon
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={toggleDrawer(props.side, true)}
        >
          {props.side}
        </MenuIcon>
        <Drawer
          anchor={props.side}
          open={state[props.side]}
          onClose={toggleDrawer(props.side, false)}
        >
          {list(props.side)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
