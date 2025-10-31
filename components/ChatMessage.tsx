
import React from 'react';
import { Message, Sender } from '../types';
import { UserIcon, AuraLogo, PaperclipIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1 p-3">
        <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce"></div>
    </div>
)


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.sender === Sender.User;

  const formattedText = message.text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800/50 p-3 rounded-md my-2 overflow-x-auto"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800/50 px-1.5 py-0.5 rounded-sm font-mono text-sm text-fuchsia-300">$1</code>')
    .replace(/\n/g, '<br />');

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div role="img" aria-label="AURA AI avatar" className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-700 flex items-center justify-center shadow-lg">
          <AuraLogo className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
      )}

      <div className={`flex flex-col max-w-xl ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-md ${
            isUser
              ? 'bg-fuchsia-600 text-white rounded-br-none'
              : 'bg-gray-800 text-gray-200 rounded-bl-none'
          }`}
        >
          <span className="sr-only">{isUser ? 'Your message:' : 'AURA AI message:'}</span>
          {message.file && (
            <div className="mb-2 flex items-center bg-black/20 p-2 rounded-lg text-sm">
                <PaperclipIcon className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium truncate">{message.file.name}</span>
            </div>
          )}
          {isLoading ? (
            <TypingIndicator />
          ) : (
            <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: formattedText }} />
          )}
        </div>
      </div>

      {isUser && (
        <div role="img" aria-label="User avatar" className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shadow-lg">
          <UserIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
