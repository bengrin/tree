import { NodeModel } from "@minoru/react-dnd-treeview";
import {  WorkflowItem, WorkflowItemStatus, WorkItemType } from "../types";

export function makeHashDeepWorkflowsStatus(
  workflows: NodeModel<WorkflowItem>[]
): WorkflowItemStatus[] {
  return workflows.map(({id, data }) => ({
    type: data?.type ?? WorkItemType.folder,
    id: id,
    open: false,
    edit: false,
  }));
}
