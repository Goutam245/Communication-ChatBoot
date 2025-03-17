
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { currentUser, conversations } from "@/utils/data";
import { Conversation, Message } from "@/types";
import ChatList from "@/components/ChatList";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import ConversationHeader from "@/components/ConversationHeader";
import { ArrowLeft, Settings, Archive, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [showChatList, setShowChatList] = useState(!isMobile);
  const [allConversations, setAllConversations] = useState<Conversation[]>(conversations);
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowChatList(false);
    }
    
    if (conversation.unreadCount > 0) {
      setAllConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === conversation.id 
            ? { ...conv, unreadCount: 0 } 
            : conv
        )
      );
    }
  };

  const generateAnswer = (question: string): string => {
    const questionLower = question.toLowerCase().trim();
    
    if (questionLower.includes("how are you")) {
      return "I'm doing well, thanks for asking! How about you?";
    } else if (questionLower.includes("what time") || questionLower.includes("what's the time")) {
      return `It's currently ${new Date().toLocaleTimeString()}.`;
    } else if (questionLower.includes("weather")) {
      return "I don't have access to real-time weather data, but I hope it's nice where you are!";
    } else if (questionLower.includes("your name")) {
      return "I'm just a chat assistant in your messaging app. You can call me Assistant!";
    } else if (questionLower.includes("help")) {
      return "I'm here to help! You can ask me questions and I'll try my best to answer them.";
    } else if (questionLower.endsWith("?")) {
      return "That's an interesting question! I'm a simple demo assistant, so I may not have the perfect answer, but I'd be happy to discuss more.";
    } else {
      return "Thanks for your message! Let me know if you have any questions.";
    }
  };

  const handleSendMessage = (text: string) => {
    if (!activeConversation) return;
    
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setAllConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversation.id 
          ? { 
              ...conv, 
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage
            } 
          : conv
      )
    );
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const otherUser = activeConversation.participants.find(p => p.id !== currentUser.id);
      if (!otherUser) return;
      
      const response = generateAnswer(text);
      
      const replyMessage: Message = {
        id: `msg${Date.now() + 1}`,
        senderId: otherUser.id,
        text: response,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      setAllConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversation.id 
            ? { 
                ...conv, 
                messages: [...conv.messages, replyMessage],
                lastMessage: replyMessage,
                unreadCount: isMobile && !showChatList ? conv.unreadCount + 1 : conv.unreadCount
              } 
            : conv
        )
      );
      
      if (isMobile && !showChatList) {
        toast({
          title: otherUser.name,
          description: replyMessage.text.substring(0, 60) + (replyMessage.text.length > 60 ? "..." : ""),
          duration: 5000,
        });
      }
    }, 1500);
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  useEffect(() => {
    if (activeConversation) {
      const otherUser = activeConversation.participants.find(p => p.id !== currentUser.id);
      if (otherUser) {
        document.title = `Chat with ${otherUser.name}`;
      }
    } else {
      document.title = "Messages";
    }
    
    return () => {
      document.title = "Messages";
    };
  }, [activeConversation]);

  const currentConversation = activeConversation 
    ? allConversations.find(c => c.id === activeConversation.id) 
    : null;
  
  const otherUser = currentConversation?.participants.find(p => p.id !== currentUser.id);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="md:h-full flex flex-col md:flex-row w-full max-w-6xl mx-auto shadow-xl bg-white rounded-lg md:rounded-xl overflow-hidden">
        <div 
          className={cn(
            "w-full md:w-1/3 md:max-w-sm bg-white transition-all duration-300 ease-in-out",
            isMobile && !showChatList ? "hidden" : "flex flex-col h-full"
          )}
        >
          <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Avatar user={currentUser} size="sm" className="cursor-pointer" />
              </Link>
              <h1 className="text-xl font-semibold">Messages</h1>
            </div>
            <div className="flex gap-1">
              <Link to="/settings" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                <Settings size={18} />
              </Link>
              <Link to="/archived" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                <Archive size={18} />
              </Link>
            </div>
          </div>
          
          <ChatList 
            conversations={allConversations}
            currentUserId={currentUser.id}
            activeConversationId={currentConversation?.id || ''}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        
        <div 
          className={cn(
            "flex-1 flex flex-col h-full overflow-hidden transition-all duration-300",
            isMobile && showChatList ? "hidden" : "flex"
          )}
        >
          {currentConversation && otherUser ? (
            <>
              <div className="flex items-center">
                {isMobile && (
                  <button 
                    onClick={handleBackToList}
                    className="p-4 text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft size={24} />
                  </button>
                )}
                <ConversationHeader 
                  user={otherUser} 
                  className="flex-1"
                />
              </div>
              
              <MessageList 
                messages={currentConversation.messages}
                currentUserId={currentUser.id}
                otherUser={otherUser}
                className="flex-1"
              />
              
              {isTyping && (
                <div className="px-4 py-2 bg-white border-t">
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="w-6 h-6 bg-gray-100 rounded-full mr-2 flex items-center justify-center">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    {otherUser.name} is typing...
                  </div>
                </div>
              )}
              
              <MessageInput 
                onSendMessage={handleSendMessage}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Your messages</h3>
              <p className="text-center max-w-sm">Select a conversation from the list or start a new one to begin messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
