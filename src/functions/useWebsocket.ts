'use client';

import { useEffect, useRef, useState } from 'react';
import { customers, destinations, } from '@/lib/mockData';

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

export class MockWebSocket {
  onopen: ((this: WebSocket, ev: Event) => unknown) | null = null;
  onclose: ((this: WebSocket, ev: CloseEvent) => unknown) | null = null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => unknown) | null = null;
  onerror: ((this: WebSocket, ev: Event) => unknown) | null = null;
  readyState: number = WebSocket.CONNECTING;
  url: string;
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(url: string) {
    this.url = url;
    this.readyState = WebSocket.CONNECTING;

    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      if (this.onopen)
        this.onopen.call(this as unknown as WebSocket, new Event('open'));
      this.startSendingMockMessages();
    }, 1000);
  }

  send(data: string): void {
    console.log('Mock WebSocket sending:', data);
  }

  close(): void {
    this.readyState = WebSocket.CLOSED;
    if (this.onclose)
      this.onclose.call(this as unknown as WebSocket, new CloseEvent('close'));
    if (this.interval) {
      clearInterval(this.interval);
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
        type: "NEW_SHIPMENT",
        shipment: {
          id: "SHP-" + Math.floor(1000 + Math.random() * 9000),
          customer: customers[Math.floor(Math.random() * customers.length)],
          origin: "Detroit, MI",
          destination: destinations[Math.floor(Math.random() * destinations.length)],
          status: 'Pending',
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
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
          status: Math.random() > 0.5 ? 'In Transit' : 'Pending',
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
      if (this.readyState === WebSocket.OPEN && this.onmessage) {
        const mockMessage =
          mockMessages[Math.floor(Math.random() * mockMessages.length)];
        const event = new MessageEvent('message', {
          data: JSON.stringify(mockMessage),
        });
        (
          this.onmessage as unknown as (
            this: WebSocket,
            ev: MessageEvent
          ) => unknown
        ).call(this as unknown as WebSocket, event);
      }
    };

    const scheduleNextMessage = () => {
      const delay = 5000 + Math.random() * 60000;
      this.interval = setTimeout(() => {
        if (this.readyState === WebSocket.OPEN) {
          sendRandomMessage();
          scheduleNextMessage();
        }
      }, delay);
    };

    scheduleNextMessage();
  }
}

export function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn {
  const { url, onMessage, onOpen, onClose, onError } = options;
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const webSocketRef = useRef<WebSocket | MockWebSocket | null>(null);

  useEffect(() => {
    const ws = new MockWebSocket(url) as unknown as WebSocket;
    webSocketRef.current = ws;

    ws.onopen = (event) => {
      setReadyState(ws.readyState);
      onOpen?.(event);
    };

    ws.onclose = (event) => {
      setReadyState(ws.readyState);
      onClose?.(event);
    };

    ws.onmessage = (event) => {
      setLastMessage(event);
      onMessage?.(event);
    };

    ws.onerror = (event) => {
      onError?.(event);
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  const sendMessage = (message: string) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      webSocketRef.current.send(message);
    }
  };

  const getWebSocket = () => webSocketRef.current as WebSocket | null;

  return {
    sendMessage,
    lastMessage,
    readyState,
    getWebSocket,
  };
}
