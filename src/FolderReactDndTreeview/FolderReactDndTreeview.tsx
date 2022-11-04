import React, { useEffect, useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { CssBaseline } from "@mui/material";
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "./types";
import { CustomNode } from "./CustomNode/CustomNode";
import { Placeholder } from "./Placeholder";
import styles from "./App.module.css";
import { CustomDragPreview } from "./CustomDragPreview";
import { makePropsTreeItem } from "./CustomNode/helpers";
import { useWorkflowsStatus } from "./hooks/useWorkflowsStatus";
import { useWorkflows } from "./hooks/useWorkflows";
import Search from "./Search";
import { Box } from "@mui/system";

function App() {
  const ref = useRef<TreeMethods>(null);

  const {
    workflowsStatus,
    workflowsStatusOpenId,
    enabledEdit,
    enabledOpen,
    addNewItems,
    enabledOpenAll,
    saveWorkflowsStatusScreen,
    enableWorkflowsStatusScreen,
  } = useWorkflowsStatus();
  const handleEnabledOpen = (id: NodeModel["id"]) => enabledOpen(id);
  const handleEnabledEdit = (id: NodeModel["id"]) => enabledEdit(id);

  const {
    treeData,
    updateTree,
    editTreeName,
    deleteTree,
    cloneTree,
    createFolderTree,
    createConfigTree,

    // handleDrop,
    // handleDragStart,
    // handleDragEnd,
    // handleDop,
    // isDragging,
    // handleClick,
  } = useWorkflows();
  useEffect(() => {
    addNewItems(treeData);
  }, [treeData]);

  const handleDrop = (newTree: NodeModel<WorkflowItem>[]) =>
    updateTree(newTree);
  const handleEdit = (id: NodeModel["id"], text: NodeModel["text"]) => {
    handleEnabledEdit(id);
    editTreeName(id, text);
  };
  const handleDelete = (id: NodeModel["id"]) => deleteTree(id);
  const handleClone = (id: NodeModel["id"]) => {
    cloneTree(id, (newTreeId: NodeModel["id"]) => {
      handleEnabledEdit(newTreeId); //TODO add sleep
    });
  };
  const handelCreateFolder = (id: NodeModel["id"]) => {
    createFolderTree(id);
    if (!workflowsStatusOpenId.includes(id)) {
      handleEnabledOpen(id);
      if (ref.current) {
        ref.current.open(id);
      }
    }
  };
  const handelCreateConfig = (configId: string, id: NodeModel["id"]) => {
    createConfigTree(id);
    if (!workflowsStatusOpenId.includes(id)) {
      handleEnabledOpen(id);
      if (ref.current) {
        ref.current.open(id);
      }
    }
  };
  const [search, setSearch] = useState("");

  const treeDataSearch = useMemo(() => {
    if (search.length > 0) {
      return treeData.filter(
        (item) =>
          (item.text.includes(search) && item.data?.type === "config") ||
          item.data?.type === "folder"
      );
    }
    return treeData;
  }, [search, treeData]);
  const isIncludesConfig = treeDataSearch.some(
    (item) => item.text.includes(search) && item.data?.type === "config"
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length > 0) {
      if (isIncludesConfig) {
        enabledOpenAll();
      }
      if (search.length === 0) {
        saveWorkflowsStatusScreen(workflowsStatus);
      }
    }
  };

  const handleClear = () => {
    setSearch("");
    enableWorkflowsStatusScreen();
  };
  return (
    <>
      <Search onSearch={handleSearch} onClear={handleClear} />
      <CssBaseline />
      <Box width="60%">
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          {treeDataSearch.length > 0 && isIncludesConfig ? (
            <Tree
              ref={ref}
              tree={treeDataSearch}
              rootId={0}
              render={(node, { depth, hasChild, onToggle }) => (
                <CustomNode
                  {...makePropsTreeItem({
                    workflowsStatus,
                    node,
                  })}
                  treeData={treeData}
                  node={node}
                  depth={depth}
                  onToggle={(id) => {
                    handleEnabledOpen(id);
                    onToggle();
                  }}
                  hasChild={hasChild}
                  onEnabledEdit={handleEnabledEdit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onClone={handleClone}
                  onCreateConfig={handelCreateConfig}
                  onCreateFolder={handelCreateFolder}
                />
              )}
              dragPreviewRender={(monitorProps) => (
                <CustomDragPreview monitorProps={monitorProps} />
              )}
              onDrop={handleDrop}
              classes={{
                placeholder: styles.placeholderContainer,
                dropTarget: styles.dropTarget,
              }}
              sort={false}
              insertDroppableFirst={false}
              canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                if (dragSource?.parent === dropTargetId) {
                  return true;
                }
              }}
              placeholderRender={(node, { depth }) => (
                <Placeholder node={node} depth={depth} />
              )}
              initialOpen={workflowsStatusOpenId}
            />
          ) : (
            <div>No found</div>
          )}
        </DndProvider>
      </Box>
    </>
  );
}

export default App;
