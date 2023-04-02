import React from "react";
import { MenuItem, ListItemIcon } from "@mui/material";
function ActionMenuItems({ key, onClick, sx, title, icon, iconStyle }) {
  return (
    <MenuItem key={key} onClick={onClick} sx={sx}>
      <ListItemIcon sx={iconStyle}>{icon}</ListItemIcon>
      {title}
    </MenuItem>
  );
}

export default ActionMenuItems;
