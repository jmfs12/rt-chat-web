import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { MessageDTO } from '../types';
import axiosInstance from '../utils/axiosInstance';

export function useChatService() {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      debug: console.log,
      onConnect: () => {
        setConnected(true);
        client.subscribe('/user/queue/messages', (message) => {
          if (message.body) {
            const msg = JSON.parse(message.body) as MessageDTO;
            setMessages((prev) => [...prev, msg]);
          }
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error('Broker error:', frame.headers['message']);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = (message: MessageDTO) => {
    if (connected && clientRef.current) {
      clientRef.current.publish({
        destination: '/app/send-message',
        body: JSON.stringify(message),
      });
    } else {
      console.error('Cannot send message, WebSocket not connected.');
    }
  };

  const getMessagesBetweenTwoUsers = async (token: string, userId: string) => {
    const response = await axiosInstance.get('/api/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-ID': userId,
      },
    });
    setMessages(response.data);
    return response.data;
  };

  return { connected, messages, sendMessage, getMessagesBetweenTwoUsers };
}
