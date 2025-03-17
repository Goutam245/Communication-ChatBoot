
import { Conversation, User, Message } from '@/types';

export const currentUser: User = {
  id: 'user1',
  name: 'John Doe',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
  isOnline: true
};

export const users: User[] = [
  {
    id: 'user2',
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff',
    isOnline: true,
    lastSeen: '2 min ago'
  },
  {
    id: 'user3',
    name: 'Michael Brown',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=10B981&color=fff',
    isOnline: false,
    lastSeen: '1 hour ago'
  },
  {
    id: 'user4',
    name: 'Emily Davis',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=F59E0B&color=fff',
    isOnline: true,
    lastSeen: 'Just now'
  },
  {
    id: 'user5',
    name: 'Alex Wilson',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Wilson&background=EC4899&color=fff',
    isOnline: false,
    lastSeen: '3 hours ago'
  },
  {
    id: 'user6',
    name: 'Jessica Miller',
    avatar: 'https://ui-avatars.com/api/?name=Jessica+Miller&background=8B5CF6&color=fff',
    isOnline: true,
    lastSeen: '5 min ago'
  }
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [currentUser, users[0]],
    messages: [
      {
        id: 'msg1',
        senderId: 'user2',
        text: 'Hi there! How are you doing today?',
        timestamp: '2023-07-10T09:30:00Z',
        isRead: true
      },
      {
        id: 'msg2',
        senderId: 'user1',
        text: 'Hey! I\'m doing great, thanks for asking. How about you?',
        timestamp: '2023-07-10T09:32:00Z',
        isRead: true
      },
      {
        id: 'msg3',
        senderId: 'user2',
        text: 'I\'m good too! Just finishing up some work. Do you have plans for the weekend?',
        timestamp: '2023-07-10T09:33:00Z',
        isRead: true
      },
      {
        id: 'msg4',
        senderId: 'user1',
        text: 'Not yet, probably just relaxing and catching up on some reading. How about you?',
        timestamp: '2023-07-10T09:35:00Z',
        isRead: true
      }
    ],
    lastMessage: {
      id: 'msg4',
      senderId: 'user1',
      text: 'Not yet, probably just relaxing and catching up on some reading. How about you?',
      timestamp: '2023-07-10T09:35:00Z',
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: 'conv2',
    participants: [currentUser, users[1]],
    messages: [
      {
        id: 'msg5',
        senderId: 'user3',
        text: 'Hello! Did you see the new project requirements?',
        timestamp: '2023-07-09T16:45:00Z',
        isRead: true
      },
      {
        id: 'msg6',
        senderId: 'user1',
        text: 'Yes, I did. They look challenging but interesting!',
        timestamp: '2023-07-09T16:50:00Z',
        isRead: true
      },
      {
        id: 'msg7',
        senderId: 'user3',
        text: 'I agree. Let\'s schedule a call to discuss them in detail.',
        timestamp: '2023-07-09T16:55:00Z',
        isRead: false
      }
    ],
    lastMessage: {
      id: 'msg7',
      senderId: 'user3',
      text: 'I agree. Let\'s schedule a call to discuss them in detail.',
      timestamp: '2023-07-09T16:55:00Z',
      isRead: false
    },
    unreadCount: 1
  },
  {
    id: 'conv3',
    participants: [currentUser, users[2]],
    messages: [
      {
        id: 'msg8',
        senderId: 'user4',
        text: 'Are we still meeting for coffee tomorrow?',
        timestamp: '2023-07-08T14:20:00Z',
        isRead: true
      },
      {
        id: 'msg9',
        senderId: 'user1',
        text: 'Absolutely! Does 10 AM still work for you?',
        timestamp: '2023-07-08T14:25:00Z',
        isRead: true
      },
      {
        id: 'msg10',
        senderId: 'user4',
        text: 'Perfect! I\'ll see you at the usual spot.',
        timestamp: '2023-07-08T14:30:00Z',
        isRead: true
      },
      {
        id: 'msg11',
        senderId: 'user4',
        text: 'Actually, can we make it 10:30? I have a quick errand to run.',
        timestamp: '2023-07-08T18:45:00Z',
        isRead: false
      }
    ],
    lastMessage: {
      id: 'msg11',
      senderId: 'user4',
      text: 'Actually, can we make it 10:30? I have a quick errand to run.',
      timestamp: '2023-07-08T18:45:00Z',
      isRead: false
    },
    unreadCount: 1
  },
  {
    id: 'conv4',
    participants: [currentUser, users[3]],
    messages: [
      {
        id: 'msg12',
        senderId: 'user5',
        text: 'Thanks for the recommendations!',
        timestamp: '2023-07-05T20:10:00Z',
        isRead: true
      },
      {
        id: 'msg13',
        senderId: 'user1',
        text: 'No problem at all! Let me know which one you try first.',
        timestamp: '2023-07-05T20:15:00Z',
        isRead: true
      }
    ],
    lastMessage: {
      id: 'msg13',
      senderId: 'user1',
      text: 'No problem at all! Let me know which one you try first.',
      timestamp: '2023-07-05T20:15:00Z',
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: 'conv5',
    participants: [currentUser, users[4]],
    messages: [
      {
        id: 'msg14',
        senderId: 'user6',
        text: 'Hey! Long time no chat. How have you been?',
        timestamp: '2023-07-01T10:05:00Z',
        isRead: true
      },
      {
        id: 'msg15',
        senderId: 'user1',
        text: 'Jessica! So good to hear from you. I\'ve been great, just busy with work. How about you?',
        timestamp: '2023-07-01T10:10:00Z',
        isRead: true
      },
      {
        id: 'msg16',
        senderId: 'user6',
        text: 'Same here. Work has been crazy. We should catch up soon!',
        timestamp: '2023-07-01T10:15:00Z',
        isRead: true
      },
      {
        id: 'msg17',
        senderId: 'user1',
        text: 'Definitely! Are you free for lunch next week?',
        timestamp: '2023-07-01T10:20:00Z',
        isRead: true
      }
    ],
    lastMessage: {
      id: 'msg17',
      senderId: 'user1',
      text: 'Definitely! Are you free for lunch next week?',
      timestamp: '2023-07-01T10:20:00Z',
      isRead: true
    },
    unreadCount: 0
  }
];
