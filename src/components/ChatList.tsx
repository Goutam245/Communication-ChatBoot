
import { Conversation, User } from "@/types";
import Avatar from "./Avatar";
import { Search, Plus, MoreVertical, Check, Settings, Users, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChatListProps {
  conversations: Conversation[];
  currentUserId: string;
  activeConversationId: string;
  onSelectConversation: (conversation: Conversation) => void;
  className?: string;
}

const ChatList = ({ 
  conversations, 
  currentUserId, 
  activeConversationId,
  onSelectConversation,
  className
}: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Get the other user from a conversation
  const getOtherUser = (conversation: Conversation): User => {
    return conversation.participants.find(p => p.id !== currentUserId) || conversation.participants[0];
  };

  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Truncate message text
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    const otherUser = getOtherUser(conversation);
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={cn("flex flex-col h-full border-r", className)}>
      <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-white z-10">
        <h1 className="text-xl font-semibold">Messages</h1>
        <div className="flex gap-1">
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <Settings size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <Plus size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="px-3 pb-2 flex border-b">
        <button 
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors rounded-full",
            activeTab === "all" 
              ? "bg-primary/10 text-primary" 
              : "text-gray-600 hover:bg-gray-100"
          )}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button 
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors rounded-full",
            activeTab === "unread" 
              ? "bg-primary/10 text-primary" 
              : "text-gray-600 hover:bg-gray-100"
          )}
          onClick={() => setActiveTab("unread")}
        >
          Unread
        </button>
        <button 
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors rounded-full",
            activeTab === "archived" 
              ? "bg-primary/10 text-primary" 
              : "text-gray-600 hover:bg-gray-100"
          )}
          onClick={() => setActiveTab("archived")}
        >
          <Archive size={16} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredConversations.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <Users size={40} className="mx-auto mb-2 text-gray-300" />
            <p>No conversations found</p>
            <p className="text-sm mt-1">Try different search terms</p>
          </div>
        ) : (
          filteredConversations.map(conversation => {
            const otherUser = getOtherUser(conversation);
            const lastMessage = conversation.lastMessage;
            const isActive = conversation.id === activeConversationId;
            
            return (
              <div
                key={conversation.id}
                className={cn(
                  "chat-list-item relative",
                  isActive ? "bg-chat-active" : "hover:bg-gray-50"
                )}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="relative">
                  <Avatar user={otherUser} className="mr-3" />
                  {otherUser.isOnline && (
                    <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{otherUser.name}</h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-500 flex items-center">
                        {formatTimestamp(lastMessage.timestamp)}
                        {lastMessage.senderId === currentUserId && (
                          <Check size={14} className="ml-1 text-gray-400" />
                        )}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    {lastMessage && (
                      <p className={cn(
                        "text-sm truncate",
                        conversation.unreadCount > 0 ? "text-gray-900 font-medium" : "text-gray-500"
                      )}>
                        {lastMessage.senderId === currentUserId ? 'You: ' : ''}
                        {truncateText(lastMessage.text, 28)}
                      </p>
                    )}
                    
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 flex-shrink-0 bg-primary text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
