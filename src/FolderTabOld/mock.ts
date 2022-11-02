export enum WorkItemType {
    "folder" = "folder",
    "config" = "config",
  }
  
  export type WorkflowItem = {
    type: WorkItemType;
    id: string;
    name: string;
    parentId: string | null;
    sortIndex: number;
  };
  
  export type WorkflowItemStatus = {
    type: WorkItemType;
    id: string;
    open: boolean;
    edit: boolean;
  };
  
  export const mockWorkflow: WorkflowItem[] = [
    {
      type: WorkItemType.config,
      id: "455",
      parentId: null,
      name: "work-config-455",
      sortIndex: 0,
    },
    {
      type: WorkItemType.folder,
      id: "1",
      parentId: null,
      name: "work-floder",
      sortIndex: 1,
    },
    {
        type: WorkItemType.folder,
        id: "2",
        parentId: "1",
        name: "work-floder-1",
        sortIndex: 0,
    },
    {
        type: WorkItemType.folder,
        id: "3",
        parentId: "2",
        name: "work-floder-1-1",
        sortIndex: 0,
    },
    {
        type: WorkItemType.config,
        id: "4",
        parentId: "3",
        name: "work-config-1-1-4",
        sortIndex: 0,
    },
    {
        type: WorkItemType.config,
        id: "5",
        parentId: "3",
        name: "work-config-1-1-5",
        sortIndex: 1,
    },
    {
        type: WorkItemType.config,
        id: "6",
        parentId: "3",
        name: "work-config-1-1-6",
        sortIndex: 2,
    },
    {
        type: WorkItemType.folder,
        id: "7",
        parentId: "2",
        name: "work-floder-2-1",
        sortIndex: 1,
    },
    {
        type: WorkItemType.config,
        id: "8",
        parentId: "7",
        name: "work-config-1-2-4",
        sortIndex: 0,
    },
    {
        type: WorkItemType.config,
        id: "9",
        parentId: "7",
        name: "work-config-1-2-5",
        sortIndex: 1,
    },
    {
        type: WorkItemType.config,
        id: "10",
        parentId: "7",
        name: "work-config-1-2-6",
        sortIndex: 2,
    },
    {
        type: WorkItemType.config,
        id: "11",
        parentId: "2",
        name: "work-config-1-3",
        sortIndex: 2,
    },
    {
        type: WorkItemType.folder,
        id: "12",
        parentId: null,
        name: "work-floder2",
        sortIndex: 2,
    },
    {
        type: WorkItemType.folder,
        id: "13",
        parentId: "12",
        name: "work-floder-2",
        sortIndex: 0,
    },
    {
        type: WorkItemType.folder,
        id: "14",
        parentId: "13",
        name: "work-floder-2-1",
        sortIndex: 0,
    },
    {
        type: WorkItemType.config,
        id: "144",
        parentId: "13",
        name: "work-config-2-1-4",
        sortIndex: 1,
    },
    {
        type: WorkItemType.config,
        id: "15",
        parentId: "13",
        name: "work-config-2-1-5",
        sortIndex: 2,
    },
    {
        type: WorkItemType.config,
        id: "16",
        parentId: "13",
        name: "work-config-2-1-6",
        sortIndex: 3,
    },
    {
        type: WorkItemType.folder,
        id: "17",
        parentId: "12",
        name: "work-floder-2-2",
        sortIndex: 1,
    },
    {
        type: WorkItemType.config,
        id: "18",
        parentId: "17",
        name: "work-config-2-2-4",
        sortIndex: 0,
    },
    {
        type: WorkItemType.config,
        id: "19",
        parentId: "17",
        name: "work-config-2-2-5",
        sortIndex: 1,
    },
    {
        type: WorkItemType.config,
        id: "20",
        parentId: "17",
        name: "work-config-2-2-6",
        sortIndex: 2,
    },
    {
        type: WorkItemType.config,
        id: "21",
        parentId: "17",
        name: "work-config-3-3",
        sortIndex: 3,
    },
  ];
  