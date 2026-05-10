'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function InterviewChatbot() {
  const [isOpen,      setIsOpen]      = useState(false);
  const [messages,    setMessages]    = useState<Message[]>([]);
  const [inputValue,  setInputValue]  = useState('');
  const [isLoading,   setIsLoading]   = useState(false);
  const [showToast,   setShowToast]   = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_URL   = (process.env.NEXT_PUBLIC_BACKEND_URL ?? '') + '/chatbot/chat';
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleOpen = () => {
    if (!authToken) { setShowToast(true); return; }
    setIsOpen(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { sender: 'user', text: inputValue.trim(), timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      const botMsg: Message = {
        sender: 'bot',
        text: data.message ?? data.reply ?? 'Sorry, I could not respond.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong. Please try again.', timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 px-4 py-2 rounded-lg text-sm"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '0.5px solid var(--border)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          >
            Please log in to use the chatbot.
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'var(--accent)', color: '#080808' }}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      >
        <MessageCircle className="h-5 w-5" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-xl flex flex-col overflow-hidden"
            style={{ height: '500px', background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: 'var(--bg-elevated)', borderBottom: '0.5px solid var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>AI Interview Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-secondary)' }}>
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: 'var(--bg-base)' }}>
              {messages.length === 0 && (
                <p className="text-center text-sm mt-8" style={{ color: 'var(--text-secondary)' }}>
                  Hi! I&apos;m your AI interview assistant. Ask me anything about interviews, coding, or career advice!
                </p>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-sm"
                    style={
                      msg.sender === 'user'
                        ? { background: 'var(--accent)', color: '#080808' }
                        : { background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '0.5px solid var(--border)' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-xl px-3 py-2"
                    style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
                  >
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: 'var(--text-secondary)', animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 p-3"
              style={{ borderTop: '0.5px solid var(--border)', background: 'var(--bg-elevated)' }}
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-lg transition-colors duration-150 disabled:opacity-40"
                style={{ background: 'var(--accent)', color: '#080808' }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
