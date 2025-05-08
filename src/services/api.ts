/**
 * API service for making HTTP requests to the backend
 */

// const API_BASE_URL = 'http://localhost:2900';
const API_BASE_URL = 'http://127.0.0.1:2900';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null  };
  } catch (error) {
    console.error('API request failed:', error);
    return {     
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function postData<T, R>(endpoint: string, data: T): Promise<ApiResponse<R>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const responseData = await response.json();
    return { data: responseData, error: null };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function convertTextToSpeech(text: string): Promise<ApiResponse<{ audioUrl: string }>> {
  return postData<{ text: string }, { audioUrl: string }>('/api/tts/test_123', { text });
}

export async function convertSpeechToText(audioBlob: Blob, id: string): Promise<ApiResponse<{ transcript: string }>> {
  try {
    const formData = new FormData();
    // formData.append('audio', audioBlob);
    formData.append('audio_file', audioBlob, 'sample.wav');
formData.append('language', 'en');
    
    const response = await fetch(`${API_BASE_URL}/api/stt/prerecorded/${id}`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("this is data from stt", data)
    return { data, error: null };
  } catch (error) {
    console.error('Speech to text conversion failed:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// WebSocket for real-time speech-to-text (optional implementation)
export function connectToSpeechWS(id: string, onMessage: (transcript: string) => void): WebSocket {
  const ws = new WebSocket(`${API_BASE_URL.replace('http', 'ws')}/ws/stt/${id}`);
  
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.transcript) {
        onMessage(data.transcript);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
}