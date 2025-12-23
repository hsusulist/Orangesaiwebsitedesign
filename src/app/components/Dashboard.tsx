import { useState } from 'react';
import { Zap, Brain, Gamepad2, Sparkles, Send, User, Settings, LogOut, History, Star, Code, MessageSquare, Plus, Menu, Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSounds } from '../hooks/useSounds';

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

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    // Auto-save conversation when first message is sent
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
    }
    
    setInput('');
    setIsTyping(true);

    // Simulate AI response
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
      
      // Update saved conversation
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
    setMessages([]);
    setCurrentConversationId(null);
  };

  const handleLoadConversation = (conversation: SavedConversation) => {
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
    if (selectedModel === 'juices' || selectedModel === 'pure-juice') {
      // If already in deep think mode, switch back to Fast Juices
      setSelectedModel('fast-juices');
      setShowDeepThinkMenu(false);
    } else {
      // Show deep think menu to choose
      setShowDeepThinkMenu(!showDeepThinkMenu);
    }
  };

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl">Oranges AI</h1>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            onClick={handleNewChat}
          >
            <MessageSquare className="w-5 h-5" />
            New Chat
          </button>
        </div>

        {/* Saved Conversations */}
        <div className="flex-1 p-6 overflow-y-auto border-b border-gray-200">
          <h3 className="text-sm text-gray-500 mb-3">Saved Conversations</h3>
          <div className="space-y-2">
            {savedConversations.map(conversation => {
              const modelData = models.find(m => m.id === conversation.model)!;
              return (
                <button
                  key={conversation.id}
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
                </button>
              );
            })}
          </div>
        </div>

        {/* User Menu */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm">John Doe</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </div>
          <div className="space-y-1">
            <button className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${selectedModelData.color}`}>
                <selectedModelData.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl">
                  {currentConversation ? currentConversation.name : selectedModelData.name}
                </h2>
                <p className="text-sm text-gray-500">{selectedModelData.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <History className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Star className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className={`w-20 h-20 ${selectedModelData.color} rounded-2xl flex items-center justify-center mb-6`}>
                <selectedModelData.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-2">Start chatting with {selectedModelData.name}</h3>
              <p className="text-gray-500 max-w-md">
                {selectedModel === 'fast-juices' && 'Get instant responses to your questions with our fastest model.'}
                {selectedModel === 'pure-juice' && 'Experience enhanced reasoning and thoughtful analysis.'}
                {selectedModel === 'juices' && 'Create games and scripts with deep, specialized thinking.'}
              </p>

              <div className="mt-12 grid grid-cols-2 gap-4 max-w-2xl">
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-colors text-left">
                  <Code className="w-6 h-6 text-orange-500 mb-2" />
                  <p className="text-sm">Help me write a script</p>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-colors text-left">
                  <Brain className="w-6 h-6 text-orange-500 mb-2" />
                  <p className="text-sm">Explain a concept</p>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-colors text-left">
                  <Gamepad2 className="w-6 h-6 text-orange-500 mb-2" />
                  <p className="text-sm">Design a game mechanic</p>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-colors text-left">
                  <Sparkles className="w-6 h-6 text-orange-500 mb-2" />
                  <p className="text-sm">Get creative ideas</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className={`w-8 h-8 ${selectedModelData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <selectedModelData.icon className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
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
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className={`w-8 h-8 ${selectedModelData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <selectedModelData.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Model selector toolbar */}
            <div className="flex items-center gap-2 mb-4">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowModelMenu(!showModelMenu)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Tool {selectedModelData.toolNum}</span>
                </button>
                
                {/* Model dropdown menu */}
                {showModelMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                    <div className="p-2">
                      <p className="text-xs text-gray-500 px-3 py-2">Select Model</p>
                      {models.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => {
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
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  onClick={handleDeepThinkClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedModel === 'juices' || selectedModel === 'pure-juice'
                      ? 'bg-blue-100 text-blue-600 border border-blue-300'
                      : 'bg-gray-100 text-gray-500 border border-transparent'
                  }`}
                >
                  <Brain className="w-5 h-5" />
                  <span className="text-sm">Deep Think</span>
                </button>
                
                {/* Deep Think dropdown menu */}
                {showDeepThinkMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                    <div className="p-2">
                      <p className="text-xs text-gray-500 px-3 py-2">AI Deep Thinking Modules</p>
                      <button
                        onClick={() => {
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
                      </button>
                      <button
                        onClick={() => {
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
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1"></div>

              <button className="p-2 w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <span className="text-sm text-gray-600">A</span>
              </button>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Send a Message"
                className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Oranges AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}