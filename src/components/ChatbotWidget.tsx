import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';

const ChatbotWidget = () => {
  // Rate limiting: 10 messages per hour
  const MAX_MESSAGES_PER_HOUR = 10;
  const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

  const suggestionOptions = [
    { label: "Hobby", message: "What are some of your hobbies?" },
    { label: "Experience", message: "What is your work experience?" },
    { label: "Passion", message: "What are your passion?" },
    { label: "Pets", message: "Do you have any pets?" },
    { label: "Academic", message: "Where and what do you study?" },
    { label: "Sports", message: "What sports do you play?" },
    { label: "Introduction", message: "Can you please introduce yourself?" },
    { label: "Origin", message: "Which country are you from?" },
    { label: "Language", message: "What languages can you speak?" },
    { label: "Music", message: "What type of music do you enjoy?" },
    { label: "Books", message: "What kind of books do you read?" },
    { label: "Travel", message: "What countries have you visited?" },
    { label: "Food", message: "What is your favorite type of food?" },
    { label: "Movie", message: "What is your favorite movie or series?" },
    { label: "Skill", message: "What skill are you most proud of?" },
    { label: "Goal", message: "What is your biggest goal in life?" },
    { label: "Dream", message: "What is your dream destination to visit?" },
    { label: "Habit", message: "What daily habit do you follow?" },
    { label: "Color", message: "What is your favorite color and why?" },
    { label: "Season", message: "Which season do you like the most?" },
    { label: "Game", message: "What games do you like to play?" },
    { label: "Place", message: "What is your favorite place to relax?" },
    { label: "Wish", message: "If you had one wish, what would it be?" },
    { label: "Quote", message: "What is your favorite quote or saying?" }
  ];

  const getRandomSuggestions = () => {
    const shuffled = [...suggestionOptions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState(() => getRandomSuggestions());
  const [userMessageTimestamps, setUserMessageTimestamps] = useState<number[]>([]);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi I am a virtual replica of Thien Zhi, ask me anything about myself!", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const refreshSuggestions = () => {
    setCurrentSuggestions(getRandomSuggestions());
  };

  const checkRateLimit = () => {
    const now = Date.now();
    const recentMessages = userMessageTimestamps.filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );
    return recentMessages.length < MAX_MESSAGES_PER_HOUR;
  };

  const updateRateLimit = () => {
    const now = Date.now();
    const updatedTimestamps = [...userMessageTimestamps, now].filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );
    setUserMessageTimestamps(updatedTimestamps);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    // Check rate limit
    if (!checkRateLimit()) {
      const rateLimitResponse = {
        id: messages.length + 1,
        text: "I appreciate your enthusiasm! However, I need to take a short break. Please try again in a bit.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, rateLimitResponse]);
      return;
    }
    
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    updateRateLimit(); // Track this message for rate limiting
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://wonder4.app.n8n.cloud/webhook/ad30832c-1f6b-4293-8eec-85490817e62d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage
        })
      });
      
      const data = await response.json();
      
      const botResponse = {
        id: messages.length + 2,
        text: data.response || "Sorry, I couldn't process your request. Please try again.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling webhook:', error);
      const errorResponse = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatboxRef.current && !chatboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="relative group"
            aria-label="Open chat"
          >
            {/* Main Button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-yellow-400/60 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300" style={{ animation: 'bounce 3s infinite' }}>
              {/* Chat bubble with AI text inside */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <MessageCircle className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-900 font-bold mt-0.5">AI</span>
                </div>
              </div>
            </div>
          </button>
          {/* Description text */}
          <span className="text-xs text-yellow-400 mt-2 whitespace-nowrap font-medium" style={{ animation: 'bounce 3s infinite' }}>Thien Zhi AI</span>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
          <div ref={chatboxRef} className="relative w-full max-w-md h-[65vh] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl md:rounded-2xl border-2 border-yellow-400/60 shadow-2xl shadow-yellow-400/10 overflow-hidden flex flex-col">
            {/* Golden wave animation overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div className="golden-wave"></div>
            </div>

            {/* Header with close button */}
            <div className="relative flex justify-end p-2 flex-shrink-0 z-10">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-slate-800/80 rounded-full"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="relative flex-1 overflow-y-auto px-4 pb-4 space-y-4 z-10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                   {/* Avatar */}
                   {msg.isBot && (
                     <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden">
                       <img src="/thienzhicard.png" alt="Thien Zhi" className="w-full h-full object-cover" />
                     </div>
                   )}
                  
                  {/* Message bubble */}
                  <div className={`flex flex-col max-w-xs lg:max-w-md ${msg.isBot ? '' : 'items-end'}`}>
                    {/* Name */}
                    <span className={`text-xs mb-1 ${msg.isBot ? 'text-yellow-400' : 'text-blue-400'}`}>
                      {msg.isBot ? 'Thien Zhi AI' : 'You'}
                    </span>
                    
                    {/* Message content */}
                    <div
                      className={`px-4 py-3 rounded-lg ${
                        msg.isBot
                          ? 'bg-slate-700 text-white border border-yellow-400/30 rounded-tl-none'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-400' : 'text-blue-100'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  {/* User Avatar */}
                  {!msg.isBot && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 ml-3">
                      <span className="text-white font-bold text-sm">U</span>
                    </div>
                  )}
                </div>
                ))}
              
              {/* Loading indicator */}
              {isLoading && (
                 <div className="flex items-start space-x-3 justify-start">
                   <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden">
                     <img src="/thienzhicard.png" alt="Thien Zhi" className="w-full h-full object-cover" />
                   </div>
                  <div className="flex flex-col max-w-xs lg:max-w-md">
                    <span className="text-xs mb-1 text-yellow-400">Thien Zhi AI</span>
                    <div className="px-4 py-3 rounded-lg bg-slate-700 text-white border border-yellow-400/30 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion bubbles - positioned above input */}
            <div className="relative px-4 py-3 border-b border-slate-700/50 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="hidden md:block text-sm text-gray-400 whitespace-nowrap">Suggested Prompts:</span>
                  <span className="md:hidden text-sm text-gray-400 whitespace-nowrap">Suggestions:</span>
                  <div className="flex gap-2">
                    {currentSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(suggestion.message)}
                        className="px-3 py-2 bg-blue-900/30 backdrop-blur-sm hover:bg-blue-800/40 text-cyan-300 text-sm rounded-full border border-blue-500/60 hover:border-blue-400/80 transition-all duration-200"
                      >
                        {suggestion.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={refreshSuggestions}
                  className="w-8 h-8 flex items-center justify-center bg-yellow-400/20 backdrop-blur-sm hover:bg-yellow-400/30 text-yellow-400 rounded-full border border-yellow-400/60 hover:border-yellow-400/80 transition-all duration-200 ml-3 flex-shrink-0"
                  aria-label="Refresh suggestions"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="relative p-4 bg-slate-800/50 flex-shrink-0 z-10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg border border-yellow-400/30 focus:outline-none focus:border-yellow-400 placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;