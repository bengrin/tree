// import React, { useEffect, useState } from "react";
// import { Box, Stack } from "@mui/material";
// import {
//   findWorkflowItemLoopCreateFolder,
//   findWorkflowItemLoopDelete,
//   findWorkflowItemLoopUpdate,
//   makePropsTreeItem
// } from "./helper";
// import {
//   mockWorkflow,
//   WorkflowItem,
//   WorkflowItemStatus,
// } from "./mock";
// import { TreeItem } from "./TreeItem";
// import { makeHashDeepWorkflowsStatus, normalizationWorkflow } from "./helpers";

// import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

// const mock = mockWorkflow as WorkflowItem[];

// export default function Folder() {
//   const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
//   const [workflowsStatus, setWorkflowsStatus] = useState<WorkflowItemStatus[]>(
//     []
//   );
//   useEffect(() => {
//     setWorkflows(normalizationWorkflow(mock));
//     setWorkflowsStatus(makeHashDeepWorkflowsStatus(mock));
//   }, []);

//   const handleOpen = (id: string) => {
//     console.log('id',id);
    
//     setWorkflowsStatus(
//       workflowsStatus.map((item) => {
//         if (item.id === id) {
//           return {
//             ...item,
//             open: !item.open
//           };
//         }
//         return item;
//       })
//     );
//   };
//   console.log('workflowsStatus',workflowsStatus);

//   const handleEnabledEdit = (id: string) => {
//     setWorkflowsStatus(
//       workflowsStatus.map((item) => {
//         if (item.id === id) {
//           return {
//             ...item,
//             edit: !item.edit
//           };
//         }
//         return {
//           ...item,
//           edit: false
//         };
//       })
//     );
//   };
//   const handleEdit = (id: string, name: string) => {
//     setWorkflows(
//       findWorkflowItemLoopUpdate({
//         workflows: workflows,
//         config: {
//           searchField: "id",
//           searchValue: id,
//           updateField: "name",
//           updateValue: name
//         }
//       })
//     );
//   };

//   const handelDelete = (id: string) => {
//     setWorkflows(
//       findWorkflowItemLoopDelete({
//         workflows: workflows,
//         config: {
//           searchField: "id",
//           searchValue: id
//         }
//       })
//     );
//   };
//   const handelCreateFolder = (id: string, parentId: string | null) => {
//     setWorkflows(
//         findWorkflowItemLoopCreateFolder({
//             workflows: workflows,
//             config: {
//                 parentId
//             }
//         })
//     );
//     handleOpen(id);
//   };
//   const handelCreateConfig = (
//     configId: string,
//     id: string,
//     parentId: string | null
//   ) => {
//     console.log(configId, id, parentId);
//   };

//   const handleTreeItem = {
//     handleOpen,
//     handleEnabledEdit,
//     handleEdit,
//     handelDelete,
//     handelCreateFolder,
//     handelCreateConfig
//   };
//   const filterWorkflows = (parentId: string| null) => workflows.filter(workflow => workflow.parentId === parentId);
  
//   const reorder = (list: WorkflowItem[], startIndex: number, endIndex: number) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
  
//     return result;
//   };
//   function onDragEnd(result: DropResult) {
//     if (!result.destination) {
//       return;
//     }

//     if (result.destination.index === result.source.index) {
//       return;
//     }

//     const workflowsReorder = reorder(
//         workflows,
//       result.source.index,
//       result.destination.index
//     );

//     setWorkflows( workflowsReorder );
//   }

//   return (
//     <Box width="80%">
//       <Stack>
//     <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="workflowItemCurrent">
//         {provided => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             {filterWorkflows(null).map((workflowItemCurrent, index) => (
//             <TreeItem
//                 {...makePropsTreeItem(
//                 workflowItemCurrent,
//                 workflowsStatus,
//                 handleTreeItem
//                 )}
//                 index={index}
//             >
//                 <Droppable droppableId="workflowItem">
//                     {provided => (
//                     <div ref={provided.innerRef} {...provided.droppableProps}>
//                         {filterWorkflows(workflowItemCurrent.id).map((workflowItem, index) => (
//                             <TreeItem
//                             {...makePropsTreeItem(
//                                 workflowItem,
//                                 workflowsStatus,
//                                 handleTreeItem
//                             )}
//                             index={index}
//                             >
//                                 <Droppable droppableId="workflowItemChildren">
//                                     {provided => (
//                                     <div ref={provided.innerRef} {...provided.droppableProps}>
//                                         {filterWorkflows(workflowItem.id).map((workflowItemChildren, index) => (
//                                             <TreeItem
//                                                 {...makePropsTreeItem(
//                                                 workflowItemChildren,
//                                                 workflowsStatus,
//                                                 handleTreeItem
//                                                 )}
//                                                 index={index}
//                                             >
//                                                 {filterWorkflows(workflowItemChildren.id).map(
//                                                     (workflowItemConfig, index) => (
//                                                         <Droppable droppableId="workflowItemConfig">
//                                                             {provided => (
//                                                             <div ref={provided.innerRef} {...provided.droppableProps}>      
//                                                                 <TreeItem
//                                                                     {...makePropsTreeItem(
//                                                                     workflowItemConfig,
//                                                                     workflowsStatus,
//                                                                     handleTreeItem
//                                                                     )}
//                                                                     hideCreateConfig
//                                                                     hideCreateFolder
//                                                                     index={index}
//                                                                 />
//                                                                 {provided.placeholder}
//                                                             </div>
//                                                             )}
//                                                         </Droppable>
//                                                     )
//                                                 )}
//                                             </TreeItem>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                     )}
//                                 </Droppable>
//                             </TreeItem>
//                         ))}
//                         {provided.placeholder}
//                     </div>
//                     )}
//                 </Droppable>
//             </TreeItem>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//         </Droppable>
//         <Box onClick={() => handelCreateFolder("0", null)}>
//           <TreeItem
//             index={99999999}
//             id="99"
//             label="Create folder"
//             hideMenu={true}
//             parentId={null}
//             open={false}
//             onOpen={handleOpen}
//             enabledEdit={false}
//             onEnabledEdit={handleEnabledEdit}
//             onEdit={handleEdit}
//             onDelete={handelDelete}
//             onCreateFolder={handelCreateFolder}
//             onCreateConfig={handelCreateConfig}
//           />
//         </Box>

//         </DragDropContext>
//       </Stack>
//     </Box>
//   );
// }
