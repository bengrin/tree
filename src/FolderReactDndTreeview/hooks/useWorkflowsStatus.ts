import { useEffect, useState } from "react";
import { makeHashDeepWorkflowsStatus } from "../helpers";
import { mockWorkflows } from "../mock";
import { WorkflowItemStatus } from "../types";

export function useWorkflowsStatus(){
    const [workflowsStatus, setWorkflowsStatus] = useState<WorkflowItemStatus[]>([]);
    useEffect(() => {
        setWorkflowsStatus(makeHashDeepWorkflowsStatus(mockWorkflows));
    },[]);
    const enabledEdit = (id: string | number) => {
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
    const enabledOpen = (id: string | number) => {
        setWorkflowsStatus(
            workflowsStatus.map((item) => {
            if (item.id === id) {
                return {
                ...item,
                open: !item.open
                };
            }
            return {
                ...item,
                open: false
            };
            })
        );
    };
    return {
        workflowsStatus,
        enabledEdit,
        enabledOpen
    };
}