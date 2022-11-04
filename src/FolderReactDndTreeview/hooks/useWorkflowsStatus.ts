import { NodeModel } from "@minoru/react-dnd-treeview";
import { useState } from "react";
import { WorkflowItem, WorkflowItemStatus, WorkItemType } from "../types";

export function useWorkflowsStatus() {
  const [workflowsStatus, setWorkflowsStatus] = useState<WorkflowItemStatus[]>(
    []
  );

  const workflowsStatusOpenId = workflowsStatus
    .filter((status) => status.open)
    .map((status) => status.id);
  const enabledEdit = (id: string | number) => {
    const newWorkflowsStatus = workflowsStatus.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          edit: !item.edit,
        };
      }
      return {
        ...item,
        edit: false,
      };
    });
    setWorkflowsStatus(newWorkflowsStatus);
  };

  const enabledOpen = (id: string | number) => {
    setWorkflowsStatus(
      workflowsStatus.map((item) => ({
        ...item,
        open: item.id === id ? !item.open : item.open,
      }))
    );
  };
  const addNewItems = (treeData: NodeModel<WorkflowItem>[]) => {
    const newWorkflowsStatus: WorkflowItemStatus[] = [];
    treeData.forEach((tree) => {
      const issetTree = workflowsStatus.some((status) => status.id === tree.id);
      const findStatus = workflowsStatus.find(
        (status) => status.id === tree.id
      );
      if (!issetTree) {
        newWorkflowsStatus.push({
          id: tree.id,
          type: tree?.data?.type ?? WorkItemType.folder,
          edit: false,
          open: false,
        });
      } else if (findStatus) {
        newWorkflowsStatus.push(findStatus);
      }
    });
    setWorkflowsStatus(newWorkflowsStatus);
  };

  const enabledOpenAll = () => {
    setWorkflowsStatus(
      workflowsStatus.map((item) => ({
        ...item,
        open: true,
      }))
    );
  };

  const [workflowsStatusScreen, setWorkflowsStatusScreen] = useState<
    WorkflowItemStatus[]
  >([]);

  const saveWorkflowsStatusScreen = (
    oldWorkflowsStatus: WorkflowItemStatus[]
  ) => {
    setWorkflowsStatusScreen(oldWorkflowsStatus);
  };
  const enableWorkflowsStatusScreen = () => {
    setWorkflowsStatus(workflowsStatusScreen);
  };

  return {
    workflowsStatus,
    enabledEdit,
    enabledOpen,
    workflowsStatusOpenId,
    addNewItems,
    enabledOpenAll,
    saveWorkflowsStatusScreen,
    enableWorkflowsStatusScreen,
  };
}
