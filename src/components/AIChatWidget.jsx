import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESETS = [
  { q: "Tell me about your projects", a: "I'm building projects around DevOps and automation. Check the Projects section for the latest — each shows the tools used and a link to the source!" },
  { q: "What technical skills do you have?", a: "I work with Python, Git, GitHub, Linux, HTML, and CSS, and I'm exploring cloud with AWS and Azure — focused on DevOps, automation, and CI/CD. Head to the Skills section for the details!" },
  { q: "How can I contact you?", a: "The easiest way to reach me is through the contact form on this site, or via my email and social links in the footer." },
  { q: "Tell me about yourself", a: "I'm Surya, a DevOps-focused engineer who enjoys automation, Linux, and clean pipelines. Take a look around the portfolio — and feel free to ask me anything!" },
];

const getTimestamp = () => Date.now();
const getFormattedTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! 👋 I'm Surya's assistant. Ask me about the DevOps projects, skills, or how to get in touch!",
      time: getFormattedTime()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: getTimestamp() - 1,
      sender: 'user',
      text: text,
      time: getFormattedTime()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setTimeout(() => {
      let botResponse = "I can tell you about my projects, skills, or how to get in touch. Try asking one of those, or use one of the suggested prompts below!";
      
      const query = text.toLowerCase();
      const hiRegex = /\b(hi|hello|hey|greetings|yo)\b/i;

      if (query.includes('projects') || query.includes('project') || query.includes('work') || query.includes('built')) {
        botResponse = PRESETS[0].a;
      } else if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('language') || query.includes('tool')) {
        botResponse = PRESETS[1].a;
      } else if (query.includes('contact') || query.includes('email') || query.includes('social') || query.includes('linkedin') || query.includes('github') || query.includes('reach')) {
        botResponse = PRESETS[2].a;
      } else if (query.includes('about') || query.includes('who') || query.includes('yourself') || hiRegex.test(query)) {
        botResponse = PRESETS[3].a;
      } else {
        botResponse = "I can help with questions about my projects, skills, or how to get in touch. Give one of those a try!";
      }

      setIsTyping(false);

      if (!isOpenRef.current) {
        setUnreadCount((prev) => prev + 1);
      }

      const botMsgId = getTimestamp();
      const newBotMsg = {
        id: botMsgId,
        sender: 'bot',
        text: '',
        time: getFormattedTime()
      };

      setMessages((prev) => [...prev, newBotMsg]);

      let currentText = '';
      let charIndex = 0;
      const speed = 15;

      typingIntervalRef.current = setInterval(() => {
        if (charIndex < botResponse.length) {
          currentText += botResponse[charIndex];
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === botMsgId ? { ...msg, text: currentText } : msg
            )
          );
          charIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
        }
      }, speed);

    }, 800);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        if (window.scrollY > window.innerHeight * 1.5) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[999] font-satoshi flex flex-col items-end"
        >
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-[min(92vw,340px)] md:w-[380px] h-[500px] border border-white/10 rounded-3xl bg-black/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden mb-4"
              >
                <div className="flex items-center justify-between px-6 py-4 bg-white/[0.03] border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center relative">
                      <Bot size={16} className="text-white" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-syne font-bold text-sm text-white leading-tight">Portfolio FAQ Companion</h3>
                      <span className="text-[9px] font-bold text-cyan-400 tracking-wider uppercase">FAQ Bot</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white p-2 rounded-full bg-white/5 border border-white/5 transition-all duration-300 active:scale-95"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex-grow p-5 overflow-y-auto flex flex-col gap-4 select-text">
                  {messages.map((m) => {
                    const isBot = m.sender === 'bot';
                    return (
                      <div 
                        key={m.id} 
                        className={`flex gap-3 max-w-[85%] ${isBot ? 'self-start' : 'self-end flex-row-reverse'}`}
                      >
                        <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                          isBot ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25' : 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/25'
                        }`}>
                          {isBot ? <Bot size={12} /> : <User size={12} />}
                        </div>

                        <div className={`rounded-2xl p-3 text-xs md:text-sm leading-relaxed ${
                          isBot 
                            ? 'bg-white/5 text-white border border-white/5 rounded-tl-none' 
                            : 'bg-gradient-to-r from-cyan-900/60 to-cyan-800/60 text-white border border-cyan-400/20 rounded-tr-none'
                        }`}>
                          <p>{m.text}</p>
                          <span className="text-[8px] text-white/30 block mt-1.5 text-right">{m.time}</span>
                        </div>
                      </div>
                    );
                  })}

                  {isTyping && (
                    <div className="flex gap-3 self-start max-w-[85%]">
                      <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                        <Bot size={12} />
                      </div>
                      <div className="rounded-2xl p-3 bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.3s]" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="px-5 pb-2 flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
                  {PRESETS.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(preset.q)}
                      className="shrink-0 bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/5 text-white/70 hover:text-white px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all duration-300"
                    >
                      {preset.q.replace('Tell me about ', '').replace('What ', '').replace(' skills do you have?', 'Skills')}
                    </button>
                  ))}
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputVal);
                  }}
                  className="p-4 bg-white/[0.01] border-t border-white/10 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    placeholder="Ask about projects, skills, or contact..."
                    aria-label="Ask the portfolio AI assistant"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(var(--cyan-rgb),0.2)] outline-none transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-cyan-400 hover:text-black text-black transition-all duration-300 font-bold p-3 rounded-xl flex items-center justify-center shrink-0 active:scale-95"
                  >
                    <Send size={12} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(var(--cyan-rgb),0.4)] border border-white/10 hover:shadow-[0_10px_35px_rgba(var(--fuchsia-rgb),0.5)] transition-shadow duration-500 relative"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageSquare size={20} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute inset-[-4px] rounded-full border border-cyan-400/30 animate-pulse pointer-events-none" />

            {!isOpen && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[9px] font-bold text-black items-center justify-center">{unreadCount}</span>
              </span>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
