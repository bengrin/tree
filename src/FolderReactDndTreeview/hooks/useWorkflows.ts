import { NodeModel } from "@minoru/react-dnd-treeview";
import {  useState } from "react";
import { mockWorkflows } from "../mock";
import { WorkflowItem, WorkItemType } from "../types";

export function useWorkflows(){
    const [treeData, setTreeData] = useState<NodeModel<WorkflowItem>[]>(mockWorkflows);
    const updateTree = (treeData: NodeModel<WorkflowItem>[]) => {
        setTreeData(treeData);
    };
    const editTreeName = (id: NodeModel["id"], text: NodeModel["text"]) => {
        setTreeData(treeData.map(tree => ({
                ...tree,
                text: tree.id === id ? text : tree.text
            })
        ));
    };
    const deleteTree = (id: NodeModel["id"]) => {
        setTreeData(treeData.filter(tree => tree.id !== id));
    };

    const createFolderTree = (id:  NodeModel["id"]) => {
        const newWorkflowItem: NodeModel<WorkflowItem> = {
            id: Math.floor(Math.random() * 9000),
            parent: id,
            text: "new folder",
            data:{
                type: WorkItemType.folder,
            }
          };
        setTreeData([
            ...treeData,
            newWorkflowItem,
        ]);
    };
    const createConfigTree = (id:  NodeModel["id"]) => {
        const newWorkflowItem: NodeModel<WorkflowItem> = {
            id: Math.floor(Math.random() * 9000),
            parent: id,
            text: "new config",
            data:{
                type: WorkItemType.config,
            }
          };
        setTreeData([
            ...treeData,
            newWorkflowItem,
        ]);
    };

    return {
        treeData,
        updateTree,
        editTreeName,
        deleteTree,
        createFolderTree,
        createConfigTree,
    };
}