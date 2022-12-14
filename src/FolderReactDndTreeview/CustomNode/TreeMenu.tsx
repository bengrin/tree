import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "../types";

export const listConfig = [
  {
    name: "Application",
    value: "Application",
  },
  {
    name: "Connection",
    value: "Connection",
  },
  {
    name: "API",
    value: "API",
  },
  {
    name: "Data Transform",
    value: "Data Transform",
  },
  {
    name: "Workflow",
    value: "Workflow",
  },
  {
    name: "Template",
    value: "Template",
  },
  {
    name: "Rule",
    value: "Rule",
  },
];

type TreeMenuProps = {
  node: NodeModel<WorkflowItem>;
  id: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onCreateFolder: () => void;
  onCreateConfig: (id: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  onClone: () => void;
  hideEdit?: boolean;
  hideCreateFolder?: boolean;
  hideCreateConfig?: boolean;
};

export function TreeMenu({
  node,
  id,
  open,
  anchorEl,
  onClose,
  onCreateFolder,
  onCreateConfig,
  onEdit,
  onDelete,
  onClone,
  hideEdit = false,
  hideCreateFolder = false,
  hideCreateConfig = false,
}: TreeMenuProps) {
  const [openMenuConfig, setOpenMenuConfig] = useState(false);

  const handleOpenMenuConfig = () => {
    setOpenMenuConfig(!openMenuConfig);
  };

  const handleCreateFolder = () => {
    onCreateFolder();
    onClose();
  };
  const handleCreateConfig = (id: string) => {
    onCreateConfig(id);
    onClose();
  };
  const handleEdit = () => {
    onEdit();
    onClose();
  };
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  const handleClone = () => {
    onClone();
    onClose();
  };

  return (
    <Menu
      id={id}
      aria-labelledby={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {!hideCreateFolder && (
        <MenuItem key="create-folder" onClick={handleCreateFolder}>
          <ListItemText primary="Create folder" />
        </MenuItem>
      )}
      {!hideCreateConfig && (
        <List key="create-config" component="nav">
          <ListItemButton onClick={handleOpenMenuConfig}>
            <ListItemText primary="Create config" />
            {openMenuConfig ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openMenuConfig} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {listConfig.map((config) => (
                <ListItemButton
                  key={config.value}
                  sx={{ pl: 4 }}
                  onClick={() => handleCreateConfig(config.value)}
                >
                  <ListItemText primary={config.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      )}
      {!hideEdit && handleEdit && (
        <MenuItem key="edit" onClick={handleEdit}>
          <ListItemText primary="Edit" />
        </MenuItem>
      )}
      {node?.data?.type === "config" && (
        <MenuItem key="clone" onClick={handleClone}>
          <ListItemText primary="Clone" />
        </MenuItem>
      )}
      <MenuItem
        key="delete"
        onClick={handleDelete}
        sx={{
          color: "red",
        }}
      >
        <ListItemText primary="Delete" />
      </MenuItem>
    </Menu>
  );
}
