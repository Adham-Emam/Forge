"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  PlusCircle, 
  Image as ImageIcon, 
  Paperclip, 
  Smile 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

// Sample conversations data
const conversations = [
  {
    id: "1",
    name: "Mobile App Project",
    participants: [
      {
        id: "user1",
        name: "Lisa Chen",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: true,
      },
      {
        id: "user2",
        name: "Alex Morgan",
        avatar: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: false,
      }
    ],
    lastMessage: {
      sender: "user1",
      content: "Can you send me the latest designs for the app's home page?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      read: true,
    },
    unreadCount: 0,
    type: "project",
  },
  {
    id: "2",
    name: "Logo Design Project",
    participants: [
      {
        id: "user3",
        name: "Mark Wilson",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: true,
      },
      {
        id: "user2",
        name: "Alex Morgan",
        avatar: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: false,
      }
    ],
    lastMessage: {
      sender: "user3",
      content: "I've sent over the first round of logo concepts. Let me know what you think!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    unreadCount: 3,
    type: "project",
  },
  {
    id: "3",
    name: "Website Development",
    participants: [
      {
        id: "user4",
        name: "Emma Taylor",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: false,
      },
      {
        id: "user2",
        name: "Alex Morgan",
        avatar: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: false,
      }
    ],
    lastMessage: {
      sender: "user2",
      content: "I'm going to push the latest code changes tonight.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: true,
    },
    unreadCount: 0,
    type: "project",
  },
  {
    id: "4",
    name: "Video Editing Collab",
    participants: [
      {
        id: "user5",
        name: "James Lee",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: true,
      },
      {
        id: "user2",
        name: "Alex Morgan",
        avatar: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: false,
      }
    ],
    lastMessage: {
      sender: "user5",
      content: "The final cut is looking good. Just a few more tweaks to make.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 27), // 1 day and 3 hours ago
      read: true,
    },
    unreadCount: 0,
    type: "project",
  },
  {
    id: "5",
    name: "UI Design Feedback",
    participants: [
      {
        id: "user6",
        name: "Sophie Martinez",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: false,
      },
      {
        id: "user2",
        name: "Alex Morgan",
        avatar: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        online: false,
      }
    ],
    lastMessage: {
      sender: "user6",
      content: "I love the new dashboard design! Very clean and intuitive.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
    },
    unreadCount: 0,
    type: "direct",
  },
];

// Sample messages for the active conversation
const sampleMessages = [
  {
    id: "m1",
    sender: "user3",
    content: "Hi Alex, I'm excited to work on your logo design project!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "m2",
    sender: "user2",
    content: "Thanks Mark! I'm looking forward to seeing what you come up with.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.95),
  },
  {
    id: "m3",
    sender: "user3",
    content: "Could you tell me a bit more about your brand and what you're looking for in the logo?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.9),
  },
  {
    id: "m4",
    sender: "user2",
    content: "Sure! We're a tech startup focused on AI solutions for small businesses. We want something modern, sleek, and memorable. Our brand colors are blue and teal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.8),
  },
  {
    id: "m5",
    sender: "user3",
    content: "Got it! I'll start working on some initial concepts. I should have something for you to review by tomorrow.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.7),
  },
  {
    id: "m6",
    sender: "user2",
    content: "Sounds great! Looking forward to it.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.65),
  },
  {
    id: "m7",
    sender: "user3",
    content: "I've been working on a few different directions for your logo. Here are the initial concepts:",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 0.5),
  },
  {
    id: "m8",
    sender: "user3",
    content: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Concept 1 - Modern and sleek"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 0.48),
  },
  {
    id: "m9",
    sender: "user3",
    content: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Concept 2 - Bold and tech-forward"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 0.46),
  },
  {
    id: "m10",
    sender: "user3",
    content: [
      {
        type: "image",
        url: "https://images.pexels.com/photos/5926366/pexels-photo-5926366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Concept 3 - Minimalist approach"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 0.44),
  },
  {
    id: "m11",
    sender: "user3",
    content: "Let me know which direction you prefer, and I can refine from there!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[1]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    
    const newMessage = {
      id: `m${messages.length + 1}`,
      sender: "user2", // Current user
      content: messageInput,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };
  
  // Helper to get other participant in a conversation
  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(p => p.id !== "user2");
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-0 h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-12 h-full">
          {/* Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 border-r border-border bg-card">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold font-orbitron mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-10rem)]">
              {filteredConversations.map(conversation => {
                const otherParticipant = getOtherParticipant(conversation);
                return (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${activeConversation.id === conversation.id ? 'bg-muted' : ''}`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                          <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {otherParticipant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">{otherParticipant.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: false })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.sender === "user2" ? "You: " : ""}
                          {conversation.lastMessage.content}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs px-2 py-0 h-5">
                            {conversation.type === "project" ? "Project" : "Direct"}
                          </Badge>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-accent text-white">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredConversations.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Chat Area */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col h-full">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage 
                        src={getOtherParticipant(activeConversation).avatar} 
                        alt={getOtherParticipant(activeConversation).name} 
                      />
                      <AvatarFallback>
                        {getOtherParticipant(activeConversation).name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{getOtherParticipant(activeConversation).name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center">
                        {getOtherParticipant(activeConversation).online ? (
                          <>
                            <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
                            Online
                          </>
                        ) : (
                          'Offline'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-4 bg-background">
                  <div className="space-y-4">
                    {messages.map((message, index) => {
                      const isCurrentUser = message.sender === "user2";
                      const showDateSeparator = index === 0 || 
                        new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString();
                      
                      return (
                        <div key={message.id}>
                          {showDateSeparator && (
                            <div className="flex justify-center my-6">
                              <Badge variant="outline" className="bg-card">
                                {new Date(message.timestamp).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </Badge>
                            </div>
                          )}
                          
                          <motion.div 
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className={`flex items-end gap-2 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                              {!isCurrentUser && (
                                <Avatar className="w-8 h-8">
                                  <AvatarImage 
                                    src={getOtherParticipant(activeConversation).avatar} 
                                    alt={getOtherParticipant(activeConversation).name} 
                                  />
                                  <AvatarFallback>
                                    {getOtherParticipant(activeConversation).name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div>
                                {typeof message.content === 'string' ? (
                                  <div 
                                    className={`p-3 rounded-lg ${
                                      isCurrentUser 
                                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                                        : 'bg-card border border-border rounded-bl-none'
                                    }`}
                                  >
                                    <p>{message.content}</p>
                                  </div>
                                ) : (
                                  // Image message
                                  <div 
                                    className={`rounded-lg overflow-hidden ${
                                      isCurrentUser 
                                        ? 'rounded-br-none' 
                                        : 'rounded-bl-none'
                                    }`}
                                  >
                                    <div className="max-w-sm overflow-hidden border border-border rounded-lg">
                                      <div className="relative w-full h-48">
                                        <Image 
                                          src={message.content[0].url} 
                                          alt={message.content[0].caption || "Shared image"} 
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      {message.content[0].caption && (
                                        <div className="p-2 bg-card text-sm">
                                          {message.content[0].caption}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                <p className={`text-xs text-muted-foreground mt-1 ${isCurrentUser ? 'text-right' : ''}`}>
                                  {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                    <div className="relative flex-1">
                      <Input
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="pr-20"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Send className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No conversation selected</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the sidebar or start a new conversation to begin messaging.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}