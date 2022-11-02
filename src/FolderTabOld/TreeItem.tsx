import React, {
    useState,
    MouseEvent,
    ChangeEvent,
    useEffect,
  } from "react";
  import {
    Stack,
    Box,
    Typography,
    IconButton,
    Collapse,
    TextField
  } from "@mui/material";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import ExpandLessIcon from "@mui/icons-material/ExpandLess";
  import CheckIcon from "@mui/icons-material/Check";
  import CloseIcon from "@mui/icons-material/Close";
  import { TreeMenu } from "./TreeMenu";

import { Draggable } from "react-beautiful-dnd";
  
  type TreeItemProps = {
    label: string;
    id: string;
    index: number;
    parentId: string | null;
    open: boolean;
    onOpen: (id: string) => void;
    enabledEdit: boolean;
    onEnabledEdit: (id: string) => void;
    onEdit: (id: string, name: string) => void;
    onDelete: (id: string) => void;
    onCreateConfig?: (
      configId: string,
      id: string,
      parentId: string | null
    ) => void;
    onCreateFolder?: (id: string, parentId: string | null) => void;
    hideCreateConfig?: boolean;
    hideCreateFolder?: boolean;
    hideMenu?: boolean;
    children?: any;
  };
  
  export function TreeItem({
    label,
    id,
    index,
    parentId,
    open,
    onOpen,
    enabledEdit,
    onEnabledEdit,
    onEdit,
    onDelete,
    onCreateConfig = () => {},
    onCreateFolder = () => {},
    hideCreateConfig = false,
    hideCreateFolder = false,
    hideMenu = false,
    children
  }: TreeItemProps) {
    const showMenu = !hideMenu;
  
    const handleToggle = () => onOpen(id);
  
    const [name, setName] = useState("");
    useEffect(() => {
      setName(label);
    }, [label, enabledEdit]);
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
    const handleEdit = () => {
      onEnabledEdit(id);
    };
    const handleEditSave = () => {
      onEnabledEdit(id);
      if (onEdit) {
        onEdit(id, name);
      }
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
  
    const handleDelete = () => {
      if (onDelete) {
        onDelete(id);
      }
    };
    const handleCreateFolder = () => {
      if (onCreateFolder) {
        onCreateFolder(id, parentId);
      }
    };
    const handleCreateConfig = (configId: string) => {
      if (onCreateConfig) {
        onCreateConfig(configId, id, parentId);
      }
    };
    const handelKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleEditSave();
      }
    };
  
    const isChildren = Array.isArray(children) && children.length > 0;
  
    return (
    <Draggable draggableId={id} index={index}>
       {provided => (
         <div
         ref={provided.innerRef}
           {...provided.draggableProps}
           {...provided.dragHandleProps}
         >
            <Stack>
                <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Box width={40}>
                    {isChildren && (
                        <IconButton
                        onClick={handleToggle}
                        aria-label={open ? "close" : "open"}
                        >
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    )}
                    </Box>
                    {enabledEdit ? (
                    <>
                        <TextField
                        value={name}
                        onChange={handleInput}
                        onKeyDown={handelKeyPress}
                        />
                        <IconButton onClick={handleEditSave}>
                        <CheckIcon htmlColor="green" />
                        </IconButton>
                        <IconButton onClick={handleEdit}>
                        <CloseIcon htmlColor="red" />
                        </IconButton>
                    </>
                    ) : (
                    <Typography onClick={handleToggle}>
                        {name.length > 40 ? name.slice(0, 40) + "..." : name}
                    </Typography>
                    )}
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    {showMenu && (
                    <IconButton
                        id={elementId}
                        onClick={handleOpenMenu}
                        aria-controls={openMenu ? elementId : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? "true" : undefined}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    )}
                    <TreeMenu
                    id={elementId}
                    open={openMenu}
                    anchorEl={anchorEl}
                    onClose={handleCloseMenu}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCreateConfig={handleCreateConfig}
                    onCreateFolder={handleCreateFolder}
                    hideCreateConfig={hideCreateConfig}
                    hideCreateFolder={hideCreateFolder}
                    hideEdit={enabledEdit}
                    />
                </Stack>
                </Stack>
                <Box ml={2}>
                <Collapse in={open}>{children}</Collapse>
                </Box>
            </Stack>
        </div>
       )}
    </Draggable>
    );
  }
  