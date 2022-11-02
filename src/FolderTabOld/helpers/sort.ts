import { WorkflowItem } from "../mock";

export function sortWorkflowsStatus(
  a: WorkflowItem,
  b: WorkflowItem,
): number {
  if(a.sortIndex > b.sortIndex) return 1
  if(a.sortIndex < b.sortIndex) return -1
  return 0;
}
