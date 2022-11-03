import React, { MouseEvent, useState } from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { WorkflowItem, WorkItemType } from "../types";
import { Box, IconButton, ListItem, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TreeName } from "./TreeName";
import { TreeMenu } from "./TreeMenu";

type Props = {
  node: NodeModel<WorkflowItem>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onEnabledEdit: (id: NodeModel["id"]) => void;
  onEdit: (id: NodeModel["id"], text: NodeModel["text"]) => void;
  hasChild: boolean;
  enabledEdit: boolean;
  onDelete: (id: NodeModel["id"]) => void;
  onCreateConfig: (configId: string, id: NodeModel["id"]) => void;
  onCreateFolder: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const {
    node,
    hasChild,
    isOpen,
    enabledEdit,
    onEnabledEdit,
    onEdit,
    onDelete,
    onCreateConfig,
    onCreateFolder,
  } = props;
  const { id, text, data } = node;
  const indent = props.depth;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(id);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const elementId = `tree-menu-${id}`;

  const handleEdit = () => {
    onEnabledEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };
  const handleCreateFolder = () => {
    onCreateFolder(id);
  };
  const handleCreateConfig = (configId: string) => {
    onCreateConfig(configId, id);
  };

  return (
    <div className={`tree-node`}>
      <Stack
        sx={{ ml: indent }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Box width={40}>
            {hasChild && (
              <IconButton
                onClick={handleToggle}
                aria-label={isOpen ? "close" : "open"}
              >
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Box>
          <TreeName
            id={id}
            text={text}
            enabledEdit={enabledEdit}
            onOpen={handleToggle}
            onEnabledEdit={onEnabledEdit}
            onEdit={onEdit}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <IconButton
            id={elementId}
            onClick={handleOpenMenu}
            aria-controls={openMenu ? elementId : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            <MoreHorizIcon />
          </IconButton>
          <TreeMenu
            id={elementId}
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateConfig={handleCreateConfig}
            onCreateFolder={handleCreateFolder}
            hideEdit={enabledEdit}
            hideCreateFolder={data?.type === WorkItemType.config}
          />
        </Stack>
      </Stack>
    </div>
  );
};
