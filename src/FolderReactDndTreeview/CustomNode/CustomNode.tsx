import React, { MouseEvent, useState } from "react";
import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { WorkflowItem, WorkItemType } from "../types";
import { IconButton, Stack } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TreeName } from "./TreeName";
import { TreeMenu } from "./TreeMenu";
import { TreeIconOpen } from "./TreeIconOpen";
import { TreeIconType } from "./TreeIconType";

type Props = {
  treeData: NodeModel<WorkflowItem>[];
  node: NodeModel<WorkflowItem>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onEnabledEdit: (id: NodeModel["id"]) => void;
  onEdit: (id: NodeModel["id"], text: NodeModel["text"]) => void;
  hasChild: boolean;
  enabledEdit: boolean;
  onDelete: (id: NodeModel["id"]) => void;
  onClone: (id: NodeModel["id"]) => void;
  onCreateConfig: (configId: string, id: NodeModel["id"]) => void;
  onCreateFolder: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const {
    treeData,
    node,
    hasChild,
    isOpen,
    enabledEdit,
    onEnabledEdit,
    onEdit,
    onDelete,
    onClone,
    onCreateConfig,
    onCreateFolder,
    onToggle,
  } = props;
  const { id, text, data } = node;
  const indent = props.depth;

  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
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
  const handleClone = () => {
    onClone(id);
  };
  const handleCreateFolder = () => {
    onCreateFolder(id);
  };
  const handleCreateConfig = (configId: string) => {
    onCreateConfig(configId, id);
  };
  const dragOverProps = useDragOver(id, isOpen, onToggle);

  return (
    <div className={`tree-node`} {...dragOverProps}>
      <Stack
        sx={{ ml: indent }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <TreeIconOpen
            hasChild={hasChild}
            isOpen={isOpen}
            onOpen={handleToggle}
          />
          <TreeIconType node={node} onOpen={handleToggle} />
          <TreeName
            id={id}
            text={text}
            treeData={treeData}
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
            node={node}
            id={elementId}
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClone={handleClone}
            onCreateConfig={handleCreateConfig}
            onCreateFolder={handleCreateFolder}
            hideEdit={enabledEdit}
            hideCreateFolder={data?.type === WorkItemType.config}
            hideCreateConfig={data?.type === WorkItemType.config}
          />
        </Stack>
      </Stack>
    </div>
  );
};
