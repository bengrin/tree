import { WorkflowItem, WorkflowItemStatus } from "../mock";

export function makeHashDeepWorkflowsStatus(
  workflows: WorkflowItem[]
): WorkflowItemStatus[] {
  return workflows.map((workflowItem) => ({
    type: workflowItem.type,
    id: workflowItem.id,
    open: false,
    edit: false,
  }));
}
