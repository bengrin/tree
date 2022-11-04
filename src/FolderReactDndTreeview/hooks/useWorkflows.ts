import { DropOptions, isAncestor, NodeModel } from "@minoru/react-dnd-treeview";
import { useEffect, useState } from "react";
import { mockWorkflows } from "../mock";
import { WorkflowItem, WorkItemType } from "../types";

export function useWorkflows() {
  const [treeData, setTreeData] =
    useState<NodeModel<WorkflowItem>[]>(mockWorkflows);
  const updateTree = (treeData: NodeModel<WorkflowItem>[]) => {
    setTreeData(treeData);
  };
  const editTreeName = (id: NodeModel["id"], text: NodeModel["text"]) => {
    setTreeData(
      treeData.map((tree) => ({
        ...tree,
        text: tree.id === id ? text : tree.text,
      }))
    );
  };
  const deleteTree = (id: NodeModel["id"]) => {
    setTreeData(treeData.filter((tree) => tree.id !== id));
  };
  const cloneTree = (
    id: NodeModel["id"],
    onEnabledEdit: (newId: NodeModel["id"]) => void
  ) => {
    const findTree = treeData.find((tree) => tree.id === id);
    const newId = Math.floor(Math.random() * 9000);
    if (findTree) {
      const newWorkflowItem: NodeModel<WorkflowItem> = {
        ...findTree,
        id: newId,
        text: findTree?.text + " (copy)",
      };
      onEnabledEdit(newId);
      setTreeData([...treeData, newWorkflowItem]);
    }
  };
  const createFolderTree = (id: NodeModel["id"]) => {
    const newWorkflowItem: NodeModel<WorkflowItem> = {
      id: Math.floor(Math.random() * 9000),
      parent: id,
      text: "new folder",
      data: {
        type: WorkItemType.folder,
      },
    };
    setTreeData([...treeData, newWorkflowItem]);
  };
  const createConfigTree = (id: NodeModel["id"]) => {
    const newWorkflowItem: NodeModel<WorkflowItem> = {
      id: Math.floor(Math.random() * 9000),
      parent: id,
      text: "new config",
      data: {
        type: WorkItemType.config,
      },
    };
    setTreeData([...treeData, newWorkflowItem]);
  };

  const [selectedNodes, setSelectedNodes] = useState<NodeModel<WorkflowItem>[]>(
    []
  );

  const [isDragging, setIsDragging] = useState(false);
  const [isCtrlPressing, setIsCtrlPressing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "escape") {
        setSelectedNodes([]);
      } else if (e.ctrlKey || e.metaKey) {
        setIsCtrlPressing(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "control" || e.key.toLowerCase() === "meta") {
        setIsCtrlPressing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleSingleSelect = (node: NodeModel<WorkflowItem>) => {
    setSelectedNodes([node]);
  };

  const handleMultiSelect = (clickedNode: NodeModel<WorkflowItem>) => {
    const selectedIds = selectedNodes.map((n) => n.id);

    // ignore if the clicked node is already selected
    if (selectedIds.includes(clickedNode.id)) {
      return;
    }

    // ignore if ancestor node already selected
    if (
      selectedIds.some((selectedId) =>
        isAncestor(treeData, selectedId, clickedNode.id)
      )
    ) {
      return;
    }

    let updateNodes = [...selectedNodes];

    // if descendant nodes already selected, remove them
    updateNodes = updateNodes.filter((selectedNode) => {
      return !isAncestor(treeData, clickedNode.id, selectedNode.id);
    });

    updateNodes = [...updateNodes, clickedNode];
    setSelectedNodes(updateNodes);
  };

  const handleClick = (e: React.MouseEvent, node: NodeModel<WorkflowItem>) => {
    if (e.ctrlKey || e.metaKey) {
      handleMultiSelect(node);
    } else {
      handleSingleSelect(node);
    }
  };

  const handleDragStart = (node: NodeModel<WorkflowItem>) => {
    const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
    setIsDragging(true);

    if (!isCtrlPressing && isSelectedNode) {
      return;
    }

    if (!isCtrlPressing) {
      setSelectedNodes([node]);
      return;
    }

    if (!selectedNodes.some((n) => n.id === node.id)) {
      setSelectedNodes([...selectedNodes, node]);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsCtrlPressing(false);
    setSelectedNodes([]);
  };

  const handleDrop = (
    newTree: NodeModel<WorkflowItem>[],
    options: DropOptions<WorkflowItem>
  ) => {
    const { dropTargetId } = options;

    updateTree(
      newTree.map((node) => {
        if (selectedNodes.some((selectedNode) => selectedNode.id === node.id)) {
          return {
            ...node,
            parent: dropTargetId,
          };
        }

        return node;
      })
    );

    setSelectedNodes([]);
  };
  const handleDop = (
    tree: NodeModel<WorkflowItem>[],
    options: DropOptions<WorkflowItem>
  ) => {
    if (
      selectedNodes.some(
        (selectedNode) => selectedNode.id === options.dropTargetId
      )
    ) {
      return false;
    }
  };

  return {
    treeData,
    updateTree,
    editTreeName,
    deleteTree,
    cloneTree,
    createFolderTree,
    createConfigTree,

    handleDrop,
    handleDragStart,
    handleDragEnd,
    handleDop,
    isDragging,
    handleClick,
  };
}
