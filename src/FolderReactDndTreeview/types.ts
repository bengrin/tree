export enum WorkItemType {
    "folder" = "folder",
    "config" = "config",
  }
  
  export type WorkflowItem = {
    type: WorkItemType;
  };
  
  export type WorkflowItemStatus = {
    type: WorkItemType;
    id: string | number;
    open: boolean;
    edit: boolean;
  };
