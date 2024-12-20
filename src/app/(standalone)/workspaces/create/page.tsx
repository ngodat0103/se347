import { CreateWorkspaceForm } from "@/features/workspace/components/create-workspace-form";

const WorkspaceCreatePage = () => {
  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm showCancelButton={false} />
    </div>
  );
};
export default WorkspaceCreatePage;
