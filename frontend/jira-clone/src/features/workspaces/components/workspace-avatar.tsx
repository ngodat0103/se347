import { cn } from "@/lib/utils"; // Hàm tiện ích để điều kiện hóa các classnames
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WorkspaceAvatarProps {
  image?: string | null;
  name: string;
  className?: string;
}

export const WorkspaceAvatar = ({
  image,
  name,
  className,
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("relative rounded-md overflow-hidden", className)}
        style={{ width: "40px", height: "40px" }}
      >
        <Image src={image} alt={name} layout="fill" className="object-cover" />
      </div>
    );
  }
  return (
    <Avatar className={cn("w-10 h-10 rounded-md", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
        {name[0]} {/* Chỉ lấy chữ cái đầu tiên của tên nếu không có ảnh */}
      </AvatarFallback>
    </Avatar>
  );
};
