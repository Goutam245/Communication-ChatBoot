
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ChatList from "@/components/ChatList";
import { conversations } from "@/utils/data";

const Archived = () => {
  const archivedConversations = conversations.filter(conv => conv.isArchived);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-xl">
        <div className="border-b p-4 flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold">Archived Chats</h1>
        </div>

        {archivedConversations.length > 0 ? (
          <ChatList
            conversations={archivedConversations}
            currentUserId="current-user"
            activeConversationId=""
            onSelectConversation={() => {}}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-gray-500">
            <p>No archived chats</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archived;
