import React, { Fragment } from "react";
import ActionMenuItems from "./ActionMenuItems";

function ActionMenu({
  items = [
    { title: "", key: "", onClick: "", sx: "", icon: "", iconStyle: "" },
  ],
}) {
  return (
    <Fragment>
      {items.map((item) => {
        return (
          <ActionMenuItems
            key={item.key}
            onClick={item.onClick}
            sx={item.sx}
            title={item.title}
            icon={item.icon}
            iconStyle={item.iconStyle}
          />
        );
      })}
    </Fragment>
  );
}

export default ActionMenu;
