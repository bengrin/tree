import { WorkflowItem, WorkflowItemStatus, WorkItemType } from "./mock";

type ConfigType = {
  handleOpen: (id: string) => void;
  handleEnabledEdit: (id: string) => void;
  handleEdit: (id: string, name: string) => void;
  handelDelete: (id: string) => void;
  handelCreateFolder: (id: string, parentId: string | null) => void;
  handelCreateConfig: (
    configId: string,
    id: string,
    parentId: string | null,
  ) => void;
};
export function makePropsTreeItem(
  workflowItem: WorkflowItem,
  workflowsStatus: WorkflowItemStatus[],
  {
    handleOpen,
    handleEnabledEdit,
    handleEdit,
    handelDelete,
    handelCreateFolder,
    handelCreateConfig,
  }: ConfigType,
) {
  const workflowStatus = workflowsStatus.find(
    (itemWorkflowStatus) => itemWorkflowStatus.id === workflowItem.id,
  );
  return {
    key: workflowItem.id,
    id: workflowItem.id,
    index: workflowItem.id,
    parentId: workflowItem.parentId,
    type: workflowItem.type,
    label: workflowItem.name,
    open: workflowStatus ? workflowStatus.open : false,
    onOpen: handleOpen,
    enabledEdit: workflowStatus ? workflowStatus.edit : false,
    onEnabledEdit: handleEnabledEdit,
    onEdit: handleEdit,
    onDelete: handelDelete,
    onCreateFolder: handelCreateFolder,
    onCreateConfig: handelCreateConfig,
    hideCreateConfig: workflowStatus?.type === WorkItemType.config ?? false,
    hideCreateFolder: workflowStatus?.type === WorkItemType.config ?? false,
  };
}

type FindWorkflowItemLoopUpdateParams = {
  workflows: WorkflowItem[];
  config: {
    searchField: keyof WorkflowItem;
    searchValue: any;
    updateField: keyof WorkflowItem;
    updateValue: any;
  };
};

export function findWorkflowItemLoopUpdate({
  workflows,
  config: { searchField, searchValue, updateField, updateValue },
}: FindWorkflowItemLoopUpdateParams) {
  return workflows.map(workflowItem => {
    if (workflowItem[searchField] === searchValue) {
      workflowItem[updateField] = updateValue;
    }
    return workflowItem
  });
}

type FindWorkflowItemDeleteParams = {
  workflows: WorkflowItem[];
  config: {
    searchField: keyof WorkflowItem;
    searchValue: any;
  };
};

export function findWorkflowItemLoopDelete({
  workflows,
  config: { searchField, searchValue },
}: FindWorkflowItemDeleteParams) {
  return workflows.filter(workflowItem =>{
    if (workflowItem[searchField] === searchValue) {
      return false;
    }
    return true;
  });
}

type findWorkflowItemLoopCreateFolderParams = {
  workflows: WorkflowItem[];
  config: {
    parentId: string | null;
  };
};
export function findWorkflowItemLoopCreateFolder({
  workflows,
  config: { parentId },
}: findWorkflowItemLoopCreateFolderParams) {
  const newWorkflowItem: WorkflowItem = {
    type: WorkItemType.folder,
    id: `${Math.floor(Math.random() * 9000)}`,
    parentId: parentId ?? null,
    name: "new folder",
  };
  return [
    ...workflows,
    newWorkflowItem,
  ];
}
