//Api cho viec tao workspace

import { CreateWorkspaceForm, WorkspaceResponse } from "@/types/workspace" 
import { ErrorMessage } from "@/types/error";

export async function createWorkspace(workspaceForm: CreateWorkspaceForm): Promise<WorkspaceResponse> {
    console.debug(workspaceForm);

    const workspace_json = JSON.stringify(workspaceForm);

    console.info("Sending create workspace request");

    const response = await fetch(`http://localhost:3001/workspace`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: workspace_json
    });

    if (response.ok) {
        const data: WorkspaceResponse = await response.json();
        console.debug(data);
        return data;
    } else if (response.status === 400) {
        // Handle bad request error
        const data: ErrorMessage = await response.json();
        console.debug(data);
        throw new Error(data.detail);
    } else {
        // Handle unknown error
        const data = await response.json();
        console.debug(data);
        throw new Error("Unknown error. Check console for more information");
    }
}
