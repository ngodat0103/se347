import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export const MemberAvatar = ({
  name,
  className,
  fallbackClassName,
}: MemberAvatarProps) => {
  // Ensure that 'name' is not undefined or empty before calling charAt
  const displayName = name || "Unknown"; // Use a fallback name if it's empty or undefined

  return (
    <Avatar
      className={cn(
        "w-12 h-12 transition-all duration-300 transform hover:scale-105 border-2 border-neutral-300 rounded-full shadow-lg",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 text-neutral-800 font-semibold text-xl flex items-center justify-center rounded-full transition-all duration-300",
          fallbackClassName
        )}
      >
        {displayName.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
