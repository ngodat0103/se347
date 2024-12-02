//Api cho viec tao workspace

import { CreateWorkspaceForm, WorkspaceResponse } from "@/types/workspace" 
import { ErrorMessage } from "@/types/error";

export async function createWorkspace(workspaceForm: CreateWorkspaceForm): Promise<WorkspaceResponse> {
    console.debug(workspaceForm);

    const formData = new FormData();
    formData.append('name', workspaceForm.name);
    if(workspaceForm.imageUrl) {
        formData.append('imageUrl', workspaceForm.imageUrl);
    }
    console.info("Sending create workspace request");
    // ${process.env.NEXT_PUBLIC_API_URL}workspace
    const response = await fetch(`http://localhost:3001/workspace`, {
        method: 'POST',
        body: formData
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
