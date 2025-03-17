
import { Message, User } from "@/types";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import { Check, CheckCheck } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  otherUser: User;
  className?: string;
}

const MessageList = ({ 
  messages, 
  currentUserId, 
  otherUser,
  className 
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Format timestamp to a readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const renderMessageStatus = (message: Message) => {
    if (message.senderId !== currentUserId) return null;
    
    return (
      <span className="message-status">
        {message.isRead ? (
          <CheckCheck size={14} className="text-blue-500" />
        ) : (
          <Check size={14} />
        )}
      </span>
    );
  };

  const renderDate = (timestamp: string, index: number) => {
    if (index === 0) return true;
    
    const currentDate = new Date(timestamp).toDateString();
    const prevDate = new Date(messages[index - 1].timestamp).toDateString();
    
    return currentDate !== prevDate;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => {
      const isSentByMe = message.senderId === currentUserId;
      const showAvatar = !isSentByMe && (index === 0 || messages[index - 1].senderId !== message.senderId);
      const showDate = renderDate(message.timestamp, index);
      
      return (
        <div key={message.id}>
          {showDate && (
            <div className="flex justify-center my-4">
              <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                {formatDate(message.timestamp)}
              </div>
            </div>
          )}
          
          <div className={cn(
            "flex mb-2",
            isSentByMe ? "justify-end" : "justify-start",
            index > 0 && messages[index - 1].senderId === message.senderId ? "mt-1" : "mt-4"
          )}>
            {!isSentByMe && showAvatar && (
              <div className="mr-2 self-end mb-1">
                <Avatar user={otherUser} size="sm" showStatus={false} />
              </div>
            )}
            
            <div className={cn(
              "flex flex-col",
              !isSentByMe && !showAvatar ? "ml-9" : ""
            )}>
              <div className={isSentByMe ? "message-sent" : "message-received"}>
                <p>{message.text}</p>
              </div>
              <div className={cn(
                "flex items-center mt-1",
                isSentByMe ? "justify-end" : "justify-start"
              )}>
                <span className="text-xs text-chat-time">
                  {formatTime(message.timestamp)}
                </span>
                {renderMessageStatus(message)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={cn(
      "px-4 py-6 flex-1 overflow-y-auto scrollbar-hide bg-gray-50 bg-chat-pattern", 
      className
    )}>
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-center">No messages yet</p>
          <p className="text-sm text-center mt-2">Send a message to start the conversation</p>
        </div>
      ) : (
        renderMessages()
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
