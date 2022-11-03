import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "./types";
import { ListItem, ListItemText } from "@mui/material";

type Props = {
  monitorProps: DragLayerMonitorProps<WorkflowItem>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <ListItem>
      <ListItemText
        primary={
          item.text.length > 40 ? item.text.slice(0, 40) + "..." : item.text
        }
      />
    </ListItem>
  );
};
