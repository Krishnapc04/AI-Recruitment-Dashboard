import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Play, Volume2, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppStore } from '../store/store';
import { convertTextToSpeech, convertSpeechToText, connectToSpeechWS } from '../services/api';

const Chatbot: React.FC = () => {
  const { chatMessages, addChatMessage } = useAppStore();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingId, setRecordingId] = useState('');
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  
  // console.log("hello see chatmessages heer")
  console.log(chatMessages)
console.log(recordingId)

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim() || isProcessing) return;
    
    setIsProcessing(true);
    
    // Add user message to chat
    addChatMessage({ content: message, sender: 'user' });
    console.log(message)
    setMessage('');
    
    // Simulate AI response delay
    setTimeout(async () => {
      const aiResponse = "I'll help you find qualified candidates for that role. What specific skills and experience are you looking for my company?";
      
      // Convert AI response to speech
      try {
        const response = await convertTextToSpeech(aiResponse);
        console.log(response)
        console.log(response.data)
        console.log(response.data.audio_url)
        if (response.data) {
          addChatMessage({ 
            content: aiResponse, 
            sender: 'ai',
            audioUrl: response.data.audio_url
          });
        } else {
          addChatMessage({ content: aiResponse, sender: 'ai' });
        }
      } catch (error) {
        console.error('Failed to convert text to speech:', error);
        addChatMessage({ content: aiResponse, sender: 'ai' });
      }
      
      setIsProcessing(false);
    }, 1000);
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const id = Date.now().toString();
      setRecordingId(id);
      
      // Optional: Connect to WebSocket for real-time transcription
      try {
        wsRef.current = connectToSpeechWS(id, (transcript) => {
          setMessage(transcript);
        });
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        chunksRef.current = [];
        
        // Close WebSocket connection if exists
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        
        setIsProcessing(true);
        
        console.log("this is audio recorded", audioBlob)
        // Convert speech to text using the API
        try {
          const result = await convertSpeechToText(audioBlob, id);
          console.log("this is result", result)
          if (result.data?.transcript) {
            setMessage(result.data.transcript);
          }
        } catch (error) {
          console.error('Failed to convert speech to text:', error);
        }
        
        setIsProcessing(false);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };
  
  const playAudio = (url: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
    }
    
    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
    
    audio.onended = () => {
      setCurrentAudio(null);
    };
  };
  
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
      setCurrentAudio(null);
    }
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">AI Assistant</h1>
          <p className="text-secondary-600">Your AI-powered recruitment partner</p>
        </div>
        
        {currentAudio && (
          <Button 
            variant="outline" 
            icon={<X size={16} />} 
            onClick={stopAudio}
          >
            Stop Audio
          </Button>
        )}
      </div>
      
      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-secondary-200 bg-white">
          <h2 className="font-medium">Conversation</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence initial={false}>
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                <div
                  className={`
                    max-w-3/4 rounded-lg p-4
                    ${msg.sender === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-secondary-100 text-secondary-900 rounded-tl-none'
                    }
                  `}
                >
                  <p>{msg.content}</p>
                  
                  {msg.sender === 'ai' && msg.audioUrl && (
                    <button
                      onClick={() => playAudio(msg.audioUrl!)}
                      className="mt-2 text-xs flex items-center opacity-70 hover:opacity-100"
                    >
                      <Volume2 size={14} className="mr-1" />
                      Play audio
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>
        
        <div className="p-4 border-t border-secondary-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border border-secondary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isProcessing || isRecording}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isRecording
                    ? 'bg-error-500 text-white'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>
              
              <Button
                type="submit"
                icon={<Send size={18} />}
                disabled={!message.trim() || isProcessing || isRecording}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;