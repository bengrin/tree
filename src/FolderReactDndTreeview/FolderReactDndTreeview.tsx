import React, { useRef } from "react";
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

function App() {
  const ref = useRef<TreeMethods>(null);

  const { workflowsStatus, workflowsStatusOpenId, enabledEdit, enabledOpen } =
    useWorkflowsStatus();
  const handleEnabledOpen = (id: NodeModel["id"]) => enabledOpen(id);
  const handleEnabledEdit = (id: NodeModel["id"]) => {
    console.log("handleEnabledEdit", id);

    enabledEdit(id);
  };

  console.log("workflowsStatus", workflowsStatus);
  const {
    treeData,
    updateTree,
    editTreeName,
    deleteTree,
    createFolderTree,
    createConfigTree,
  } = useWorkflows();
  const handleDrop = (newTree: NodeModel<WorkflowItem>[]) =>
    updateTree(newTree);
  const handleEdit = (id: NodeModel["id"], text: NodeModel["text"]) => {
    console.log("handleEdit", id, text);

    editTreeName(id, text);
  };
  const handleDelete = (id: NodeModel["id"]) => deleteTree(id);
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

  return (
    <>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          ref={ref}
          tree={treeData}
          rootId={0}
          render={(node, { depth, hasChild, onToggle }) => (
            <CustomNode
              {...makePropsTreeItem({
                workflowsStatus,
                node,
              })}
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
      </DndProvider>
    </>
  );
}

export default App;
