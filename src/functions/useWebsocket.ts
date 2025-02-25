'use client';

import { useEffect, useRef, useState } from 'react';

interface UseWebSocketOptions {
  url: string;
  onMessage?: (event: MessageEvent) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
}

interface UseWebSocketReturn {
  sendMessage: (message: string) => void;
  lastMessage: MessageEvent | null;
  readyState: number;
  getWebSocket: () => WebSocket | null;
}

class MockWebSocket {
  onopen: ((this: WebSocket, ev: Event) => any) | null = null;
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null = null;
  onerror: ((this: WebSocket, ev: Event) => any) | null = null;
  readyState = 0;
  url: string;

  constructor(url: string) {
    this.url = url;
    this.readyState = 0;

    setTimeout(() => {
      this.readyState = 1;
      if (this.onopen) {
        this.onopen(new Event('open'));
      }

      this.startSendingMockMessages();
    }, 1000);
  }

  send(data: string): void {
    console.log('Mock WebSocket sending:', data);
  }

  close(): void {
    this.readyState = 3;
    if (this.onclose) {
      this.onclose(new CloseEvent('close'));
    }
  }

  private startSendingMockMessages(): void {
    const mockMessages = [
      {
        type: 'SHIPMENT_UPDATE',
        shipment: {
          id: 'SHP-1234',
          status: 'Delivered',
          lastUpdated: new Date().toISOString(),
        },
      },
      {
        type: 'NEW_SHIPMENT',
        shipment: {
          id: 'SHP-' + Math.floor(1000 + Math.random() * 9000),
          customer: 'New Customer Inc.',
          origin: 'Detroit, MI',
          destination: 'San Diego, CA',
          status: 'Pending',
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
          ).toISOString(),
          lastUpdated: new Date().toISOString(),
          coordinates: { lat: 32.7157, lng: -117.1611 },
        },
      },
      {
        type: 'SHIPMENT_UPDATE',
        shipment: {
          id: 'SHP-5678',
          status: 'In Transit',
          lastUpdated: new Date().toISOString(),
        },
      },
      {
        type: 'SHIPMENT_UPDATE',
        shipment: {
          id: 'SHP-9012',
          status: 'Delayed',
          lastUpdated: new Date().toISOString(),
        },
      },
      {
        type: 'NEW_SHIPMENT',
        shipment: {
          id: 'SHP-' + Math.floor(1000 + Math.random() * 9000),
          customer: 'Global Logistics Co.',
          origin: 'Chicago, IL',
          destination: 'Phoenix, AZ',
          status: 'In Transit',
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          lastUpdated: new Date().toISOString(),
          coordinates: { lat: 33.4484, lng: -112.074 },
        },
      },
    ];

    const sendRandomMessage = () => {
      if (this.readyState === 1 && this.onmessage) {
        const mockMessage =
          mockMessages[Math.floor(Math.random() * mockMessages.length)];
        const event = new MessageEvent('message', {
          data: JSON.stringify(mockMessage),
        });
        this.onmessage(event);
      }
    };

    // Send a message every 3-7 seconds for more frequent updates
    const interval = setInterval(() => {
      if (this.readyState !== 1) {
        clearInterval(interval);
        return;
      }
      sendRandomMessage();
    }, 3000 + Math.random() * 4000);
  }
}

export function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn {
  const { url, onMessage, onOpen, onClose, onError } = options;
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [readyState, setReadyState] = useState<number>(0);
  const webSocketRef = useRef<WebSocket | MockWebSocket | null>(null);

  useEffect(() => {
    const ws = new MockWebSocket(url) as unknown as WebSocket;
    webSocketRef.current = ws;

    ws.onopen = (event) => {
      setReadyState(ws.readyState);
      if (onOpen) onOpen(event);
    };

    ws.onclose = (event) => {
      setReadyState(ws.readyState);
      if (onClose) onClose(event);
    };

    ws.onmessage = (event) => {
      setLastMessage(event);
      if (onMessage) onMessage(event);
    };

    ws.onerror = (event) => {
      if (onError) onError(event);
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  const sendMessage = (message: string) => {
    if (webSocketRef.current && webSocketRef.current.readyState === 1) {
      webSocketRef.current.send(message);
    }
  };

  const getWebSocket = () => webSocketRef.current;

  return {
    sendMessage,
    lastMessage,
    readyState,
    getWebSocket,
  };
}
