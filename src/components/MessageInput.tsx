
import { useState, useRef, useEffect } from "react";
import { Smile, Paperclip, Image, Send, Mic, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  className?: string;
}

const MessageInput = ({ onSendMessage, className }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage("");
      }
    }
  };

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // For demo purposes only
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={cn("p-4 bg-white border-t relative", className)}>
      {showAttachments && (
        <div className="absolute bottom-full left-0 right-0 bg-white p-3 border-t rounded-t-lg shadow-lg animate-slide-up">
          <div className="flex justify-around">
            <button className="flex flex-col items-center space-y-1 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                <Image size={24} />
              </div>
              <span className="text-xs text-gray-600">Photo</span>
            </button>
            <button className="flex flex-col items-center space-y-1 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
                <Paperclip size={24} />
              </div>
              <span className="text-xs text-gray-600">File</span>
            </button>
            <button className="flex flex-col items-center space-y-1 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                <Mic size={24} />
              </div>
              <span className="text-xs text-gray-600">Audio</span>
            </button>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="chat-input">
          <button 
            type="button" 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
          
          <button 
            type="button" 
            className={cn(
              "text-gray-400 hover:text-gray-600 transition-colors",
              showAttachments ? "text-primary" : ""
            )}
            aria-label="Attachments"
            onClick={toggleAttachments}
          >
            <Plus size={20} />
          </button>
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 outline-none bg-transparent text-sm px-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          {message.trim() ? (
            <button 
              type="submit"
              className="p-2 rounded-full bg-primary text-white"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          ) : (
            <button 
              type="button"
              className={cn(
                "p-2 rounded-full", 
                isRecording 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
              aria-label="Voice message"
              onClick={toggleRecording}
            >
              <Mic size={18} />
            </button>
          )}
        </div>
        
        {isRecording && (
          <div className="absolute -top-10 left-0 right-0 bg-white p-2 rounded-t-lg border border-red-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-3"></div>
              <span className="text-sm text-gray-700">Recording voice message...</span>
            </div>
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsRecording(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
