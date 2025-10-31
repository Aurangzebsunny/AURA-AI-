
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { PaperclipIcon, SendIcon, XIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (text: string, file?: File) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || (!text.trim() && !file)) return;
    onSendMessage(text, file || undefined);
    setText('');
    removeFile();
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as any);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {file && (
        <div className="mb-2 flex items-center bg-gray-700/50 rounded-lg px-3 py-2 text-sm text-fuchsia-300 w-fit">
          <PaperclipIcon className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            onClick={removeFile}
            className="ml-2 p-1 rounded-full hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Remove attached file"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="relative flex items-end bg-gray-800 border border-gray-700 rounded-2xl shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-fuchsia-500">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 text-gray-400 hover:text-fuchsia-400 transition-colors duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-fuchsia-500 rounded-full"
          disabled={isLoading}
          aria-label="Attach file"
        >
          <PaperclipIcon className="w-6 h-6" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png,.mp4,.zip"
          aria-hidden="true"
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Message AURA AI..."
          className="flex-1 bg-transparent py-3 px-2 resize-none text-base text-gray-200 placeholder-gray-500 focus:outline-none max-h-48 overflow-y-auto"
          rows={1}
          disabled={isLoading}
          aria-label="Type your message to AURA AI"
        />
        <button
          type="submit"
          className="p-3 text-gray-400 hover:text-fuchsia-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-fuchsia-500 rounded-full"
          disabled={isLoading || (!text.trim() && !file)}
          aria-label="Send message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
