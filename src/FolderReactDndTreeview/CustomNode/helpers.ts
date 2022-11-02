import { NodeModel } from "@minoru/react-dnd-treeview";
import { WorkflowItem, WorkflowItemStatus } from "../types";

type MakePropsTreeItemProps = {
    workflowsStatus: WorkflowItemStatus[];
    node: NodeModel<WorkflowItem>
}

export function makePropsTreeItem(
    {
        workflowsStatus,
        node
    }: MakePropsTreeItemProps,
  ) {
    const workflowStatus = workflowsStatus.find(
      (itemWorkflowStatus) => itemWorkflowStatus.id === node.id,
    );
    return {
        isOpen: workflowStatus ? workflowStatus.open : false,
        enabledEdit: workflowStatus ? workflowStatus.edit : false,
    };
  }