import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "./types";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Chip } from "@mui/material";
type Props = {
  monitorProps: DragLayerMonitorProps<WorkflowItem>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <Chip
      sx={{
        borderRadius: 2,
      }}
      label={item.text.length > 40 ? item.text.slice(0, 40) + "..." : item.text}
      icon={
        item?.data?.type === "folder" ? <FolderIcon /> : <InsertDriveFileIcon />
      }
    />
  );
};
