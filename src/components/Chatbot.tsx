import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Assuming you have this
import { AnimatePresence, motion } from 'framer-motion';

// --- Icons ---
const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

interface Message {
  role: 'user' | 'model';
  type: 'text' | 'recommendation';
  content: string;
  data?: {
    itemName: string;
    price: number;
    imageUrl: string;
  };
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', type: 'text', content: 'Hey there! ☕ I can help you find the perfect coffee, book a workshop, or explore our art gallery. What are you in the mood for?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get token if you have auth setup, otherwise optional
  // Get user from auth context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const token = user; // In Firebase user object can be used to get token, but here we just pass user or null. 
  // Actually sendChatMessage expects string | null. 
  // user.getIdToken() returns Promise<string>.
  // We will handle this in handleSend.

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', type: 'text', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      // Filter out the initial default greeting if it's just local state
      // Map to Gemini Content format: { role: string, parts: { text: string }[] }
      const apiHistory = messages
        .filter((_, index) => index > 0) // Skip the first default greeting to avoid history issues if model starts
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));

      let idToken = null;
      if (token) {
        try {
          idToken = await token.getIdToken();
        } catch (tokenError) {
          console.warn("Failed to get ID token, proceeding as anonymous:", tokenError);
          // Proceed without token
        }
      }

      const response = await sendChatMessage(userMsg.content, idToken, apiHistory);

      const botMsg: Message = {
        role: 'model',
        type: response.type || 'text',
        content: response.text,
        data: response.data
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', type: 'text', content: `DEBUG: ${error instanceof Error ? error.message : String(error)}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] md:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#3E2723]/10 font-sans flex flex-col"
            style={{ maxHeight: '600px', height: '80vh' }}
          >
            {/* Header */}
            <div className="bg-[#3E2723] p-4 flex justify-between items-center text-[#D4AF37]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-serif font-bold tracking-wide">Rabuste AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                  {/* Message Bubble */}
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                    ? 'bg-[#3E2723] text-white rounded-br-none'
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                    }`}>
                    {msg.content}

                    {/* Recommendation Card */}
                    {msg.type === 'recommendation' && msg.data && (
                      <div className="mt-3 bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                        <div className="h-32 w-full overflow-hidden">
                          <img
                            src={msg.data.imageUrl}
                            alt={msg.data.itemName}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-serif font-bold text-[#3E2723]">{msg.data.itemName}</h4>
                          <p className="text-[#D4AF37] font-bold text-sm">₹{msg.data.price}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#3E2723]/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-[#3E2723]/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-[#3E2723]/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex gap-2 items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-200 focus-within:border-[#3E2723] focus-within:ring-1 focus-within:ring-[#3E2723]/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about coffee..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-gray-700 placeholder-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#3E2723] text-white p-2 rounded-full hover:bg-[#5D4037] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md transform active:scale-95"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center bg-[#3E2723] text-[#D4AF37] w-14 h-14 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
          >
            <MessageIcon />
            <span className="absolute right-0 top-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;