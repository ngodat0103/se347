import { MembersList } from "@/features/workspace/components/members-list";

const WorkspaceMembersPage = async () => {
  return (
    <div className="w-full lg:max-w-xl">
      <MembersList />
    </div>
  );
};

export default WorkspaceMembersPage;
