import { ColorLensOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { makeHashDeepWorkflowsStatus } from "../helpers";
import { mockWorkflows } from "../mock";
import { WorkflowItemStatus } from "../types";

export function useWorkflowsStatus() {
  const [workflowsStatus, setWorkflowsStatus] = useState<WorkflowItemStatus[]>(
    []
  );
  useEffect(() => {
    setWorkflowsStatus(makeHashDeepWorkflowsStatus(mockWorkflows));
  }, []);
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
    console.log("newWorkflowsStatus", newWorkflowsStatus);
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
  return {
    workflowsStatus,
    enabledEdit,
    enabledOpen,
    workflowsStatusOpenId,
  };
}
