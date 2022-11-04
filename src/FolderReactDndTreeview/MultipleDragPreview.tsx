import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "./types";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Badge, Chip, Stack } from "@mui/material";
type Props = {
  dragSources: NodeModel<WorkflowItem>[];
};

export const MultipleDragPreview: React.FC<Props> = (props) => {
  const items = props.dragSources;

  return (
    <Badge
      color="error"
      badgeContent={props.dragSources.length}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Stack direction="column" spacing={1}>
        {items.map((item) => (
          <Chip
            sx={{
              borderRadius: 2,
            }}
            label={
              item.text.length > 40 ? item.text.slice(0, 40) + "..." : item.text
            }
            icon={
              item?.data?.type === "folder" ? (
                <FolderIcon />
              ) : (
                <InsertDriveFileIcon />
              )
            }
          />
        ))}
      </Stack>
    </Badge>
  );
};
