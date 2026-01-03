import { useState, useRef, useEffect } from 'react';
import { Sparkles, Plus, Search, ChevronDown, Image as ImageIcon, Globe, BookOpen, Brain, Wand2, Video, MoreHorizontal, Menu, X, Folder, MessageSquare, Send, User, Settings, LogOut, ChevronRight, Trash2, Edit2, Zap, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThinkingAnimation } from './ThinkingAnimation';

interface DashboardProps {
  onLogout: () => void;
  userPlan: 'free' | 'pro' | 'core';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Project {
  id: string;
  name: string;
  type: 'homework' | 'chatbot' | 'roblox' | 'other';
  icon: string;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
}

export function ReplitDashboard({ onLogout, userPlan }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showThinkingMenu, setShowThinkingMenu] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'fast' | 'pure' | 'juices'>('fast');
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [chatsExpanded, setChatsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    { id: '1', name: 'Homework', type: 'homework', icon: '📚' },
    { id: '2', name: 'Swift', type: 'other', icon: '🔶' },
  ];

  const conversations: Conversation[] = [
    { id: '1', title: 'Minecraft Server Setup Confusion', timestamp: '2 days ago' },
    { id: '2', title: 'Prompt Hành Động Nhân Vật M...', timestamp: '3 days ago' },
    { id: '3', title: 'AI Orange Website with Multi M...', timestamp: '4 days ago' },
    { id: '4', title: 'AI Project Assistance', timestamp: '5 days ago' },
    { id: '5', title: 'Banh Lam Bc Toan Ko', timestamp: '1 week ago' },
    { id: '6', title: 'Lua Scripting Essentials', timestamp: '1 week ago' },
    { id: '7', title: 'Minecraft#EditeIntegration', timestamp: '2 weeks ago' },
    { id: '8', title: 'Website Creation Help', timestamp: '2 weeks ago' },
  ];

  const quickActions = [
    { icon: ImageIcon, label: 'Image Edit', color: 'text-green-600' },
    { icon: Globe, label: 'Web Dev', color: 'text-orange-600' },
    { icon: BookOpen, label: 'Learn', color: 'text-red-600' },
    { icon: Brain, label: 'Deep Research', color: 'text-purple-600' },
    { icon: Wand2, label: 'Image Generation', color: 'text-orange-500' },
    { icon: Video, label: 'Video Generation', color: 'text-blue-600' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help! As an AI assistant from Oranges AI, I can help you with various tasks including coding, problem-solving, creative projects, and more. What would you like to work on today?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Auto-save conversation
      if (!currentConversation && messages.length === 0) {
        setCurrentConversation(input.slice(0, 50) + '...');
      }
    }, 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentConversation(null);
  };

  const loadConversation = (conv: Conversation) => {
    setCurrentConversation(conv.title);
    setMessages([
      {
        id: '1',
        text: 'Hello! This is a saved conversation.',
        sender: 'user',
        timestamp: new Date(),
      },
      {
        id: '2',
        text: 'This conversation has been loaded from your history.',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  };

  const getUserName = () => {
    return "Huynh Đỗ Minh Duy";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="h-screen flex bg-[#f5f5f5]">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[280px] bg-white border-r border-gray-200 flex flex-col"
          >
            {/* Logo */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="font-semibold text-gray-800">Oranges AI</span>
            </div>

            {/* New Chat & Search */}
            <div className="p-4 space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNewChat}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </motion.button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Chats"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Projects Section */}
            <div className="px-4">
              <button
                onClick={() => setProjectsExpanded(!projectsExpanded)}
                className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase mb-2"
              >
                Projects
                <ChevronRight className={`w-4 h-4 transition-transform ${projectsExpanded ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {projectsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1 mb-4"
                  >
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Folder className="w-4 h-4" />
                      New Project
                    </motion.button>
                    {projects.map((project) => (
                      <motion.button
                        key={project.id}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <span>{project.icon}</span>
                        {project.name}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* All Chats Section */}
            <div className="px-4 flex-1 overflow-y-auto">
              <button
                onClick={() => setChatsExpanded(!chatsExpanded)}
                className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase mb-2"
              >
                All chats
                <ChevronRight className={`w-4 h-4 transition-transform ${chatsExpanded ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {chatsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1"
                  >
                    <div className="text-xs text-gray-400 mb-2">Previous 7 days</div>
                    {conversations.map((conv) => (
                      <motion.button
                        key={conv.id}
                        whileHover={{ x: 4, backgroundColor: '#f3f4f6' }}
                        onClick={() => loadConversation(conv)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg transition-colors truncate"
                      >
                        {conv.title}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {getUserName().charAt(0)}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-800 truncate">{getUserName()}</div>
                    <div className="text-xs text-gray-500 capitalize">{userPlan} Plan</div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    >
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {currentConversation || 'Owens-Max'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-medium text-gray-800 mb-8"
              >
                {getGreeting()}, {getUserName()}
              </motion.h1>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-6 space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {getUserName().charAt(0)}
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                    <ThinkingAnimation />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-[#f8f8f8] p-6">
          <div className="max-w-4xl mx-auto">
            {/* Main Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="How can I help you today?"
                className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder:text-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3L6 12L3 21L21 12L3 3Z" fill="currentColor" />
                </svg>
              </motion.button>
            </div>

            {/* Controls Row */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-700" />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowThinkingMenu(!showThinkingMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Brain className="w-4 h-4 text-gray-700" />
                  <span className="text-sm text-gray-700">Thinking</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </motion.button>

                <AnimatePresence>
                  {showThinkingMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-[200px]"
                    >
                      <button
                        onClick={() => {
                          setSelectedModel('fast');
                          setShowThinkingMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                      >
                        <Zap className="w-4 h-4 text-orange-500" />
                        <div className="text-left">
                          <div className="font-medium text-gray-800">Fast Juice</div>
                          <div className="text-xs text-gray-500">Quick responses</div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedModel('pure');
                          setShowThinkingMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                      >
                        <Brain className="w-4 h-4 text-amber-500" />
                        <div className="text-left">
                          <div className="font-medium text-gray-800">Pure Juice</div>
                          <div className="text-xs text-gray-500">Better thinking</div>
                        </div>
                      </button>
                      {userPlan !== 'free' && (
                        <button
                          onClick={() => {
                            setSelectedModel('juices');
                            setShowThinkingMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <Gamepad2 className="w-4 h-4 text-red-500" />
                          <div className="text-left">
                            <div className="font-medium text-gray-800">Juices</div>
                            <div className="text-xs text-gray-500">Game & script dev</div>
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Search className="w-4 h-4 text-gray-700" />
                <span className="text-sm text-gray-700">Search</span>
              </motion.button>

              <div className="flex-1" />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="4" height="16" fill="currentColor" rx="1" />
                  <rect x="8" y="8" width="4" height="12" fill="currentColor" rx="1" />
                  <rect x="14" y="6" width="4" height="14" fill="currentColor" rx="1" />
                  <rect x="20" y="10" width="2" height="10" fill="currentColor" rx="1" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}