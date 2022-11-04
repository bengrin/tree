import React, { MouseEvent } from "react";
import { Box } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "../types";

type TreeIconTypeProps = {
  onOpen: (e: MouseEvent) => void;
  node: NodeModel<WorkflowItem>;
};

export function TreeIconType({ onOpen, node }: TreeIconTypeProps) {
  return (
    <>
      <Box onClick={onOpen}>
        {node?.data?.type === "folder" && <FolderIcon />}
        {node?.data?.type === "config" && <DescriptionIcon />}
      </Box>
    </>
  );
}
