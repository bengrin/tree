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

type TreeMenuProps = {
  id: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onCreateFolder: () => void;
  onCreateConfig: (id: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  hideCreateFolder?: boolean;
  hideCreateConfig?: boolean;
  hideEdit?: boolean;
};

export function TreeMenu({
  id,
  open,
  anchorEl,
  onClose,
  onCreateFolder,
  onCreateConfig,
  onEdit,
  onDelete,
  hideCreateFolder = false,
  hideCreateConfig = false,
  hideEdit = false,
}: TreeMenuProps) {
  const listConfig = [
    {
      name: "config-1",
      value: "1",
    },
    {
      name: "config-2",
      value: "2",
    },
    {
      name: "config-3",
      value: "3",
    },
    {
      name: "config-4",
      value: "4",
    },
    {
      name: "config-5",
      value: "5",
    },
    {
      name: "config-6",
      value: "6",
    },
  ];
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
      {!hideCreateFolder && handleCreateFolder && (
        <MenuItem key="create-folder" onClick={handleCreateFolder}>
          <ListItemText primary="Create folder" />
        </MenuItem>
      )}
      {!hideCreateConfig && handleCreateConfig && (
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
