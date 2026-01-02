import { useState, useRef, useEffect } from 'react';
import { Zap, Brain, Gamepad2, Sparkles, Send, User, Settings, LogOut, History, Star, Code, MessageSquare, Plus, Menu, Volume2, VolumeX, FolderPlus, Paperclip, Image as ImageIcon, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewProjectModal } from './NewProjectModal';
import { ThinkingAnimation } from './ThinkingAnimation';

interface DashboardProps {
  onLogout: () => void;
}

type AIModel = 'fast-juices' | 'pure-juice' | 'juices';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SavedConversation {
  id: string;
  name: string;
  model: AIModel;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [selectedModel, setSelectedModel] = useState<AIModel>('fast-juices');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [savedConversations, setSavedConversations] = useState<SavedConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [showDeepThinkMenu, setShowDeepThinkMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<{name: string, model: string, type: string} | null>(null);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Sound effects
  const playSound = (type: 'click' | 'send' | 'success' | 'hover') => {
    if (isMuted) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const soundConfigs = {
      click: { frequency: 800, duration: 0.1, volume: 0.1 },
      hover: { frequency: 400, duration: 0.05, volume: 0.03 },
      send: { frequency: 1200, duration: 0.15, volume: 0.2 },
      success: { frequency: 659, duration: 0.3, volume: 0.15 },
    };

    const config = soundConfigs[type];
    oscillator.frequency.value = config.frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(config.volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + config.duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + config.duration);
  };

  const models = [
    {
      id: 'fast-juices' as AIModel,
      name: 'Fast Juices',
      icon: Zap,
      color: 'bg-orange-500',
      description: 'Lightning fast responses',
      toolNum: 1,
    },
    {
      id: 'pure-juice' as AIModel,
      name: 'Pure Juice',
      icon: Brain,
      color: 'bg-amber-500',
      description: 'Better thinking',
      toolNum: 2,
    },
    {
      id: 'juices' as AIModel,
      name: 'Juices',
      icon: Gamepad2,
      color: 'bg-red-500',
      description: 'Game & script specialist',
      toolNum: 3,
    },
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    playSound('send');

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    if (messages.length === 0 && !currentConversationId) {
      const newConversation: SavedConversation = {
        id: Date.now().toString(),
        name: input.slice(0, 50) + (input.length > 50 ? '...' : ''),
        model: selectedModel,
        lastMessage: input.slice(0, 50),
        timestamp: new Date(),
        messages: newMessages
      };
      setSavedConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversation.id);
      playSound('success');
    }
    
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = {
        'fast-juices': 'Fast Juices here! I\'ve processed your request instantly. How can I help you further?',
        'pure-juice': 'Pure Juice analyzing your query with enhanced reasoning... Based on careful consideration, here\'s my thoughtful response to your question.',
        'juices': 'Juices here! I specialize in game development and scripting. Let me think deeply about this... Here\'s a comprehensive solution with detailed implementation steps.',
      };

      const aiMessage: Message = {
        role: 'assistant',
        content: responses[selectedModel],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      playSound('success');
      
      if (currentConversationId) {
        setSavedConversations(prev => prev.map(conv => 
          conv.id === currentConversationId 
            ? { ...conv, messages: [...conv.messages, userMessage, aiMessage], timestamp: new Date() }
            : conv
        ));
      }
    }, selectedModel === 'fast-juices' ? 500 : selectedModel === 'pure-juice' ? 1500 : 3000);
  };

  const handleNewChat = () => {
    playSound('click');
    setMessages([]);
    setCurrentConversationId(null);
  };

  const handleLoadConversation = (conversation: SavedConversation) => {
    playSound('click');
    setMessages(conversation.messages);
    setSelectedModel(conversation.model);
    setCurrentConversationId(conversation.id);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const selectedModelData = models.find(m => m.id === selectedModel)!;
  const currentConversation = savedConversations.find(c => c.id === currentConversationId);

  const handleDeepThinkClick = () => {
    playSound('click');
    if (selectedModel === 'juices' || selectedModel === 'pure-juice') {
      setSelectedModel('fast-juices');
      setShowDeepThinkMenu(false);
    } else {
      setShowDeepThinkMenu(!showDeepThinkMenu);
    }
  };

  const handleCreateProject = (name: string, model: string, type: string) => {
    playSound('success');
    setCurrentProject({ name, model, type });
    
    if (type === 'roblox') {
      const robloxMessage: Message = {
        role: 'assistant',
        content: `🎮 Roblox Project "${name}" created successfully!\n\nTo continue, please connect to the orange.ai plugin in Roblox:\n\n1. Open Roblox Studio\n2. Go to Plugins → Manage Plugins\n3. Search for "orange.ai"\n4. Click "Install" and then "Activate"\n5. Return here to start building your game!\n\nYour AI assistant is ready to help you create amazing Roblox experiences!`,
        timestamp: new Date(),
      };
      setMessages([robloxMessage]);
    } else {
      const projectMessage: Message = {
        role: 'assistant',
        content: `✨ Project "${name}" created successfully!\n\nModel: ${model}\nType: ${type}\n\nI'm ready to help you with your ${type} project. What would you like to work on first?`,
        timestamp: new Date(),
      };
      setMessages([projectMessage]);
    }
  };

  const handleFileUpload = (type: 'image' | 'file') => {
    playSound('click');
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '*';
      fileInputRef.current.click();
    }
    setShowFileMenu(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      playSound('success');
      const file = e.target.files[0];
      const fileMessage: Message = {
        role: 'assistant',
        content: `📎 File "${file.name}" uploaded successfully! I can now analyze this ${file.type.includes('image') ? 'image' : 'file'} for you. What would you like me to do with it?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen bg-gray-50"
    >
      <NewProjectModal 
        isOpen={isNewProjectModalOpen} 
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
      
      <input 
        ref={fileInputRef}
        type="file"
        onChange={onFileChange}
        className="hidden"
      />
      
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-80 bg-white border-r border-gray-200 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-2xl">Oranges AI</h1>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => playSound('hover')}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3"
            onClick={handleNewChat}
          >
            <MessageSquare className="w-5 h-5" />
            New Chat
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => playSound('hover')}
            onClick={() => { playSound('click'); setIsNewProjectModalOpen(true); }}
            className="w-full border-2 border-orange-500 text-orange-500 py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
          >
            <FolderPlus className="w-5 h-5" />
            New Project
          </motion.button>
        </div>

        {/* Saved Conversations */}
        <div className="flex-1 p-6 overflow-y-auto border-b border-gray-200">
          <h3 className="text-sm text-gray-500 mb-3">Saved Conversations</h3>
          <AnimatePresence mode="popLayout">
            <div className="space-y-2">
              {savedConversations.map((conversation, index) => {
                const modelData = models.find(m => m.id === conversation.model)!;
                return (
                  <motion.button
                    key={conversation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => playSound('hover')}
                    onClick={() => handleLoadConversation(conversation)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      currentConversationId === conversation.id
                        ? 'bg-orange-50 border border-orange-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1 rounded ${modelData.color}`}>
                        <modelData.icon className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-sm truncate">{conversation.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{getTimeAgo(conversation.timestamp)}</p>
                  </motion.button>
                );
              })}
            </div>
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center"
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm">John Doe</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { playSound('click'); setIsMuted(!isMuted); }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-gray-600" /> : <Volume2 className="w-4 h-4 text-orange-500" />}
            </motion.button>
          </div>
          <div className="space-y-1">
            <motion.button 
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => playSound('hover')}
              onClick={() => { playSound('click'); onLogout(); }}
              className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-b border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                key={selectedModel}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className={`p-3 rounded-xl ${selectedModelData.color}`}
              >
                <selectedModelData.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <motion.h2 
                  key={currentConversation?.name || selectedModelData.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl"
                >
                  {currentConversation ? currentConversation.name : selectedModelData.name}
                </motion.h2>
                <p className="text-sm text-gray-500">{selectedModelData.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <History className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Star className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.4 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`w-20 h-20 ${selectedModelData.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <selectedModelData.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl mb-2">Start chatting with {selectedModelData.name}</h3>
                <p className="text-gray-500 max-w-md">
                  {selectedModel === 'fast-juices' && 'Get instant responses to your questions with our fastest model.'}
                  {selectedModel === 'pure-juice' && 'Experience enhanced reasoning and thoughtful analysis.'}
                  {selectedModel === 'juices' && 'Create games and scripts with deep, specialized thinking.'}
                </p>

                <div className="mt-12 grid grid-cols-2 gap-4 max-w-2xl">
                  {[
                    { icon: Code, text: 'Help me write a script' },
                    { icon: Brain, text: 'Explain a concept' },
                    { icon: Gamepad2, text: 'Design a game mechanic' },
                    { icon: Sparkles, text: 'Get creative ideas' },
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: '#fb923c' }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => playSound('hover')}
                      onClick={() => playSound('click')}
                      className="p-4 border-2 border-gray-200 rounded-xl transition-colors text-left"
                    >
                      <item.icon className="w-6 h-6 text-orange-500 mb-2" />
                      <p className="text-sm">{item.text}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className={`w-8 h-8 ${selectedModelData.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <selectedModelData.icon className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-2xl p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-orange-100' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </motion.div>
                    {message.role === 'user' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-lg flex items-center justify-center flex-shrink-0"
                      >
                        <User className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className={`w-8 h-8 ${selectedModelData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <selectedModelData.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                      <ThinkingAnimation />
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white border-t border-gray-200 p-6"
        >
          <div className="max-w-4xl mx-auto">
            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => playSound('hover')}
                  onClick={() => { playSound('click'); setShowFileMenu(!showFileMenu); }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </motion.button>
                
                <AnimatePresence>
                  {showFileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                    >
                      <div className="p-2">
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => playSound('hover')}
                          onClick={() => handleFileUpload('image')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-blue-100">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm">Upload Image</p>
                          </div>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => playSound('hover')}
                          onClick={() => handleFileUpload('file')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-green-100">
                            <FileText className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm">Upload File</p>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => playSound('hover')}
                  onClick={() => { playSound('click'); setShowModelMenu(!showModelMenu); }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Tool {selectedModelData.toolNum}</span>
                </motion.button>
                
                <AnimatePresence>
                  {showModelMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                    >
                      <div className="p-2">
                        <p className="text-xs text-gray-500 px-3 py-2">Select Model</p>
                        {models.map((model, index) => (
                          <motion.button
                            key={model.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => playSound('hover')}
                            onClick={() => {
                              playSound('click');
                              setSelectedModel(model.id);
                              setShowModelMenu(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                              selectedModel === model.id ? 'bg-orange-50' : ''
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${model.color}`}>
                              <model.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-sm">{model.name}</p>
                              <p className="text-xs text-gray-500">{model.description}</p>
                            </div>
                            <span className="text-xs text-gray-400">Tool {model.toolNum}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: (selectedModel === 'juices' || selectedModel === 'pure-juice')
                      ? ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 8px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
                      : '0 0 0 0 rgba(59, 130, 246, 0)',
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  onHoverStart={() => playSound('hover')}
                  onClick={handleDeepThinkClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedModel === 'juices' || selectedModel === 'pure-juice'
                      ? 'bg-blue-100 text-blue-600 border border-blue-300'
                      : 'bg-gray-100 text-gray-500 border border-transparent'
                  }`}
                >
                  <Brain className="w-5 h-5" />
                  <span className="text-sm">Deep Think</span>
                </motion.button>
                
                <AnimatePresence>
                  {showDeepThinkMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                    >
                      <div className="p-2">
                        <p className="text-xs text-gray-500 px-3 py-2">AI Deep Thinking Modules</p>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => playSound('hover')}
                          onClick={() => {
                            playSound('click');
                            setSelectedModel('pure-juice');
                            setShowDeepThinkMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-amber-500">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm">Pure Juice</p>
                            <p className="text-xs text-gray-500">Better thinking</p>
                          </div>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => playSound('hover')}
                          onClick={() => {
                            playSound('click');
                            setSelectedModel('juices');
                            setShowDeepThinkMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-red-500">
                            <Gamepad2 className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm">Juices</p>
                            <p className="text-xs text-gray-500">Game & script specialist</p>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1"></div>

              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="p-2 w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <span className="text-sm text-gray-600">A</span>
              </motion.button>
            </div>

            <div className="flex gap-4">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Send a Message"
                className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: input.trim() 
                    ? ['0 0 0 0 rgba(249, 115, 22, 0.4)', '0 0 0 8px rgba(249, 115, 22, 0)', '0 0 0 0 rgba(249, 115, 22, 0)']
                    : '0 0 0 0 rgba(249, 115, 22, 0)',
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Oranges AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}