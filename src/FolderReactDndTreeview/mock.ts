import { NodeModel } from "@minoru/react-dnd-treeview";
import { WorkflowItem, WorkItemType } from "./types";

  export const mockWorkflows: NodeModel<WorkflowItem>[] = [
    {
      
      id: 455,
      parent: 0,
      text: "work-config-455",
      data:{
        type: WorkItemType.config,
      }
    },
    {
      data:{
        type: WorkItemType.folder,
      },
      id: 1,
      parent: 0,
      text: "work-floder",
    },
    {
        data:{
            type: WorkItemType.folder,
        },
        id: 2,
        parent: 1,
        text: "work-floder-1",
    },
    {
        data:{
            type: WorkItemType.folder,
        },
        id: 3,
        parent: 2,
        text: "work-floder-1-1",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 4,
        parent: 3,
        text: "work-config-1-1-4",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 5,
        parent: 3,
        text: "work-config-1-1-5",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 6,
        parent: 3,
        text: "work-config-1-1-6",
    },
    {
        data:{
            type: WorkItemType.folder,
        },
        id: 7,
        parent: 2,
        text: "work-floder-2-1",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 8,
        parent: 7,
        text: "work-config-1-2-4",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 9,
        parent: 7,
        text: "work-config-1-2-5",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 10,
        parent: 7,
        text: "work-config-1-2-6",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 11,
        parent: 2,
        text: "work-config-1-3",
    },
    {
        data:{
            type: WorkItemType.folder,
        },
        id: 12,
        parent: 0,
        text: "work-floder2",
    },
    {
        data:{
            type: WorkItemType.folder,
        },
        id: 13,
        parent: 12,
        text: "work-floder-2",
    },
    {
        data:{
            type: WorkItemType.folder,
        },
        id: 14,
        parent: 13,
        text: "work-floder-2-1",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 144,
        parent: 13,
        text: "work-config-2-1-4",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 15,
        parent: 13,
        text: "work-config-2-1-5",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 16,
        parent: 13,
        text: "work-config-2-1-6",
    },
    {
        data:{
            type: WorkItemType.folder,
        },
        id: 17,
        parent: 12,
        text: "work-floder-2-2",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 18,
        parent: 17,
        text: "work-config-2-2-4",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 19,
        parent: 17,
        text: "work-config-2-2-5",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 20,
        parent: 17,
        text: "work-config-2-2-6",
    },
    {
        data:{
            type: WorkItemType.config,
        },
        id: 21,
        parent: 17,
        text: "work-config-3-3",
    },
  ];
  