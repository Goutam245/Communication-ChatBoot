
import { cn } from "@/lib/utils";
import { User } from "@/types";

interface AvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  className?: string;
}

const Avatar = ({ 
  user, 
  size = "md", 
  showStatus = true,
  className 
}: AvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <img 
          src={user.avatar} 
          alt={user.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      
      {showStatus && (
        <div className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-white",
          user.isOnline ? "bg-green-500" : "bg-gray-300",
          size === "sm" ? "h-2 w-2" : "h-3 w-3"
        )} />
      )}
    </div>
  );
};

export default Avatar;
