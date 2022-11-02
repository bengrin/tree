import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  findWorkflowItemLoopCreateFolder,
  findWorkflowItemLoopDelete,
  findWorkflowItemLoopUpdate,
  makePropsTreeItem
} from "./helper";
import {
  mockWorkflow,
  WorkflowItem,
  WorkflowItemStatus,
} from "./mock";
import { TreeItem } from "./TreeItem";
import { makeHashDeepWorkflowsStatus, sortWorkflowsStatus } from "./helpers";

import { DragDropContext,  DraggableLocation, Droppable, DropResult } from "react-beautiful-dnd";

const mock = mockWorkflow as WorkflowItem[];

export default function Folder() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [workflowsStatus, setWorkflowsStatus] = useState<WorkflowItemStatus[]>(
    []
  );
  useEffect(() => {
    setWorkflows(mock);
    setWorkflowsStatus(makeHashDeepWorkflowsStatus(mock));
  }, []);

  const handleOpen = (id: string) => {
    console.log('id',id);
    
    setWorkflowsStatus(
      workflowsStatus.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            open: !item.open
          };
        }
        return item;
      })
    );
  };
  console.log('workflowsStatus',workflowsStatus);

  const handleEnabledEdit = (id: string) => {
    setWorkflowsStatus(
      workflowsStatus.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            edit: !item.edit
          };
        }
        return {
          ...item,
          edit: false
        };
      })
    );
  };
  const handleEdit = (id: string, name: string) => {
    setWorkflows(
      findWorkflowItemLoopUpdate({
        workflows: workflows,
        config: {
          searchField: "id",
          searchValue: id,
          updateField: "name",
          updateValue: name
        }
      })
    );
  };

  const handelDelete = (id: string) => {
    setWorkflows(
      findWorkflowItemLoopDelete({
        workflows: workflows,
        config: {
          searchField: "id",
          searchValue: id
        }
      })
    );
  };
  const handelCreateFolder = (id: string, parentId: string | null) => {
    setWorkflows(
        findWorkflowItemLoopCreateFolder({
            workflows: workflows,
            config: {
                parentId
            }
        })
    );
    handleOpen(id);
  };
  const handelCreateConfig = (
    configId: string,
    id: string,
    parentId: string | null
  ) => {
    console.log(configId, id, parentId);
  };

  const handleTreeItem = {
    handleOpen,
    handleEnabledEdit,
    handleEdit,
    handelDelete,
    handelCreateFolder,
    handelCreateConfig
  };
  const filterWorkflows = (parentId: string| null) => workflows.filter(workflow => workflow.parentId === parentId).sort(sortWorkflowsStatus);

  const reorder = (list: WorkflowItem[], result: DropResult) => {
    const parentId = result.source.droppableId === 'null' ? null : result.source.droppableId;
    const prevId = result.destination?.droppableId;
    const currentId = result.draggableId;
    const othersWorkflow = list.filter((workflowItem) => {
        const sourceParentId = parentId;
        return workflowItem.parentId !== sourceParentId
    })
    const parentWorkflow = list.filter((workflowItem) => {
        const sourceParentId = parentId;
        return workflowItem.parentId === sourceParentId
    })
    console.log('current id', currentId);
    console.log('parent id', parentId);
    console.log('parent id', result.destination?.index);
    
    const sortWorkflows = Array.from(parentWorkflow);
    // const [removed] = result.splice(startIndex, 1);
    // result.splice(endIndex, 0, removed);
  
    return [
        ...othersWorkflow,
        ...sortWorkflows
    ];
  };
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    console.log('result',result);

    const workflowsReorder = reorder(
        workflows,
      result
    );

    setWorkflows( workflowsReorder );
  }
  
  console.log('filterWorkflows', filterWorkflows(null));
//   console.log('workflows', workflows);
  

  return (
    <Box width="80%">
      <Stack>
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="null">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {filterWorkflows(null).map((workflowItemCurrent) => (
            <TreeItem
                {...makePropsTreeItem(
                workflowItemCurrent,
                workflowsStatus,
                handleTreeItem
                )}
                index={workflowItemCurrent.sortIndex}
            >
                <Droppable droppableId={workflowItemCurrent.id}>
                    {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {filterWorkflows(workflowItemCurrent.id).map((workflowItem) => (
                            <TreeItem
                            {...makePropsTreeItem(
                                workflowItem,
                                workflowsStatus,
                                handleTreeItem
                            )}
                            index={workflowItem.sortIndex}
                            >
                                <Droppable droppableId={workflowItem.id}>
                                    {provided => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {filterWorkflows(workflowItem.id).map((workflowItemChildren) => (
                                            <TreeItem
                                                {...makePropsTreeItem(
                                                workflowItemChildren,
                                                workflowsStatus,
                                                handleTreeItem
                                                )}
                                                index={workflowItemChildren.sortIndex}
                                            >
                                                {filterWorkflows(workflowItemChildren.id).map(
                                                    (workflowItemConfig) => (
                                                        <Droppable droppableId={workflowItemConfig.id} key={workflowItemConfig.sortIndex}>
                                                            {provided => (
                                                            <div ref={provided.innerRef} {...provided.droppableProps}>      
                                                                <TreeItem
                                                                    {...makePropsTreeItem(
                                                                    workflowItemConfig,
                                                                    workflowsStatus,
                                                                    handleTreeItem
                                                                    )}
                                                                    hideCreateConfig
                                                                    hideCreateFolder
                                                                    index={workflowItemConfig.sortIndex}
                                                                />
                                                                {provided.placeholder}
                                                            </div>
                                                            )}
                                                        </Droppable>
                                                    )
                                                )}
                                            </TreeItem>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                    )}
                                </Droppable>
                            </TreeItem>
                        ))}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </TreeItem>
            ))}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
        </DragDropContext>
      </Stack>
    </Box>
  );
}
