
import { User } from "@/types";
import Avatar from "./Avatar";
import { Phone, Video, Info, MoreVertical, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ConversationHeaderProps {
  user: User;
  className?: string;
}

const ConversationHeader = ({ user, className }: ConversationHeaderProps) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={cn("chat-header", className)}>
      <div className="flex items-center gap-3">
        <Avatar user={user} size="md" />
        <div>
          <h2 className="font-medium flex items-center">
            {user.name}
            {user.isOnline && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                Online
              </span>
            )}
          </h2>
          <p className="text-xs text-gray-500">
            {user.isOnline ? (
              <span>Active now</span>
            ) : (
              <span>Last active {user.lastSeen}</span>
            )}
          </p>
        </div>
      </div>
      
      <div className="flex gap-1 relative">
        <button className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 transition-colors">
          <Search size={18} />
        </button>
        <button className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 transition-colors">
          <Phone size={18} />
        </button>
        <button className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 transition-colors">
          <Video size={18} />
        </button>
        <button 
          className={cn(
            "p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 transition-colors",
            showOptions ? "bg-gray-100" : ""
          )}
          onClick={() => setShowOptions(!showOptions)}
        >
          <MoreVertical size={18} />
        </button>
        
        {showOptions && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-10 animate-fade-in">
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                View contact
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mute notifications
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Clear chat
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Block contact
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationHeader;
