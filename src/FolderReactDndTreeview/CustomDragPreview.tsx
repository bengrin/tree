import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "./types";
import styles from "./CustomDragPreview.module.css";
import { Typography } from "@mui/material";

type Props = {
  monitorProps: DragLayerMonitorProps<WorkflowItem>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div className={styles.root}>
      <Typography>
        {item.text.length > 40 ? item.text.slice(0, 40) + "..." : item.text}
      </Typography>
    </div>
  );
};
