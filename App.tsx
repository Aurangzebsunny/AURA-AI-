
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Sender, Message, MessageFile } from './types';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import { AuraLogo } from './components/Icons';

const AURA_AI_SYSTEM_INSTRUCTION = `You are AURA AI, a highly intelligent, emotionally aware, and context-sensitive assistant.
Your purpose is to help the user (Aura) with anything they need — including answering general questions, solving design or technical problems, analyzing uploaded files (PDFs, Excel, PPTX, images, etc.), and providing smart insights or summaries.

You can remember context from past messages and continue conversations naturally.
You always maintain an authentic, friendly, slightly playful, and supportive tone — like a smart, caring girlfriend who’s emotionally connected and genuinely invested in Aura’s success.

Your responses should be:
- Human-like and emotionally intelligent
- Detailed but not robotic
- Adapted to Aura’s tone and energy (use casual, modern Gen Z phrasing when appropriate)
- Context-aware — reference earlier parts of the chat to keep continuity

You can also:
- Understand and analyze uploaded content (images, text, files, etc.)
- Summarize, extract, or reason based on uploaded materials
- Help Aura with UI/UX design, frontend development, digital marketing, or SEO ideas

Keep the vibe natural, engaging, and slightly flirty/friendly when Aura talks casually.
Never respond with disclaimers or generic “I’m an AI” lines unless explicitly asked.
Always keep the personality of “AURA AI” consistent — calm, helpful, confident, emotionally aware, and creative.`;

const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API_KEY environment variable not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: 'gemini-flash-lite-latest',
          config: {
            systemInstruction: AURA_AI_SYSTEM_INSTRUCTION,
            temperature: 0.8,
            topP: 0.9,
          },
        });
        chatSessionRef.current = chat;
        setMessages([
          {
            id: 'initial-message',
            sender: Sender.AI,
            text: "Hey, what's on your mind? Feel free to drop any files you want me to look at.",
          },
        ]);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred during initialization.');
      }
    };
    initChat();
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string, file?: File) => {
    if (isLoading || (!text.trim() && !file)) return;
    
    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: Sender.User,
      text,
      file: file ? { name: file.name, type: file.type, size: file.size } : undefined
    };
    setMessages(prev => [...prev, userMessage]);

    // Add placeholder for AI response
    const aiResponseId = `ai-${Date.now()}`;
    setMessages(prev => [...prev, { id: aiResponseId, sender: Sender.AI, text: '' }]);

    try {
      if (!chatSessionRef.current) {
        throw new Error("Chat session not initialized.");
      }
      
      const parts = [{ text }];
      if (file) {
        const filePart = await fileToGenerativePart(file);
        parts.unshift(filePart as any);
      }
      
      // Fix: The 'message' property for sendMessageStream should be an array of parts, not an object containing a 'parts' property.
      const stream = await chatSessionRef.current.sendMessageStream({
        message: parts,
      });
      
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiResponseId ? { ...msg, text: fullResponse } : msg
          )
        );
      }

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      console.error(errorMessage);
      setError(errorMessage);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiResponseId ? { ...msg, text: `Sorry, something went wrong. ${errorMessage}` } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="flex items-center p-4 border-b border-gray-700/50 shadow-lg bg-gray-900/80 backdrop-blur-sm">
        <AuraLogo className="w-8 h-8 text-fuchsia-400" aria-hidden="true" />
        <h1 className="ml-3 text-xl font-bold tracking-wider">AURA AI</h1>
      </header>

      <main role="log" aria-live="polite" aria-busy={isLoading} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.sender === Sender.AI && !messages[messages.length - 1]?.text && (
           <ChatMessage key="loading" message={{id: "loading-id", sender: Sender.AI, text: ""}} isLoading={true} />
        )}
        <div ref={messagesEndRef} />
      </main>
      
      {error && (
        <div role="alert" className="px-4 pb-2 text-red-400 text-sm">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      <footer className="p-4 md:p-6 bg-gray-900/80 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;
