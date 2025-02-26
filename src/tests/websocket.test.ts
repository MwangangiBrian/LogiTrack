import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWebSocket, MockWebSocket } from '../functions/useWebsocket';

global.WebSocket = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
} as unknown as typeof WebSocket;

global.MessageEvent = vi.fn().mockImplementation((type, options) => ({
  type,
  data: options?.data || '',
})) as unknown as typeof MessageEvent;

global.CloseEvent = vi.fn().mockImplementation((type) => ({
  type,
})) as unknown as typeof CloseEvent;

global.Event = vi.fn().mockImplementation((type) => ({
  type,
})) as unknown as typeof Event;

vi.useFakeTimers();

describe('useWebSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should initialize with correct initial values', () => {
    const { result } = renderHook(() =>
      useWebSocket({ url: 'wss://mock-socket-url.vercel.app' })
    );

    expect(result.current.lastMessage).toBeNull();
    expect(result.current.readyState).toBe(WebSocket.CONNECTING);
    expect(result.current.getWebSocket()).not.toBeNull();
    expect(typeof result.current.sendMessage).toBe('function');
  });

  it('should update readyState when connection opens', () => {
    const mockOnOpen = vi.fn();

    const { result } = renderHook(() =>
      useWebSocket({
        url: 'wss://example.com',
        onOpen: mockOnOpen,
      })
    );

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.readyState).toBe(WebSocket.OPEN);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });

  it('should call onMessage when receiving a message', () => {
    const mockOnMessage = vi.fn();

    const { result } = renderHook(() =>
      useWebSocket({
        url: 'wss://example.com',
        onMessage: mockOnMessage,
      })
    );

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    act(() => {
      const ws = result.current.getWebSocket();
      if (ws && ws.onmessage) {
        const event = new MessageEvent('message', {
          data: JSON.stringify({ type: 'TEST_MESSAGE' }),
        });
        ws.onmessage(event);
      }
    });

    expect(mockOnMessage).toHaveBeenCalledTimes(1);
    expect(JSON.parse(mockOnMessage.mock.calls[0][0].data)).toEqual({
      type: 'TEST_MESSAGE',
    });
  });

  it('should update lastMessage when receiving a message', () => {
    const { result } = renderHook(() =>
      useWebSocket({ url: 'wss://example.com' })
    );

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const testData = { type: 'TEST_MESSAGE' };

    act(() => {
      const ws = result.current.getWebSocket();
      if (ws && ws.onmessage) {
        const event = new MessageEvent('message', {
          data: JSON.stringify(testData),
        });
        ws.onmessage(event);
      }
    });

    expect(result.current.lastMessage).not.toBeNull();
    expect(JSON.parse(result.current.lastMessage?.data)).toEqual(testData);
  });

  it('should call sendMessage method on the WebSocket', () => {
    const { result } = renderHook(() =>
      useWebSocket({ url: 'wss://example.com' })
    );

    const mockSend = vi.fn();
    const ws = result.current.getWebSocket();
    if (ws) {
      ws.send = mockSend;
    }

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    act(() => {
      result.current.sendMessage('test message');
    });

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith('test message');
  });

  it('should not send message if connection is not open', () => {
    const { result } = renderHook(() =>
      useWebSocket({ url: 'wss://example.com' })
    );

    const mockSend = vi.fn();
    const ws = result.current.getWebSocket();
    if (ws) {
      ws.send = mockSend;
      Object.defineProperty(ws, 'readyState', {
        value: WebSocket.CONNECTING,
        writable: true,
      });
    }

    act(() => {
      result.current.sendMessage('test message');
    });

    expect(mockSend).not.toHaveBeenCalled();
  });

  it('should clean up and close WebSocket on unmount', () => {
    const closeSpy = vi.fn();

    const { result, unmount } = renderHook(() =>
      useWebSocket({ url: 'wss://example.com' })
    );

    const ws = result.current.getWebSocket();
    if (ws) {
      ws.close = closeSpy;
    }

    unmount();
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when connection closes', () => {
    const mockOnClose = vi.fn();

    const { result } = renderHook(() =>
      useWebSocket({
        url: 'wss://example.com',
        onClose: mockOnClose,
      })
    );

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    act(() => {
      const ws = result.current.getWebSocket();
      if (ws && ws.onclose) {
        ws.onclose(new CloseEvent('close'));
      }
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onError when an error occurs', () => {
    const mockOnError = vi.fn();

    const { result } = renderHook(() =>
      useWebSocket({
        url: 'wss://example.com',
        onError: mockOnError,
      })
    );

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    act(() => {
      const ws = result.current.getWebSocket();
      if (ws && ws.onerror) {
        ws.onerror(new Event('error'));
      }
    });

    expect(mockOnError).toHaveBeenCalledTimes(1);
  });

  it('should start sending mock messages after connection opens', () => {
    const mockOnMessage = vi.fn();

    renderHook(() =>
      useWebSocket({
        url: 'wss://example.com',
        onMessage: mockOnMessage,
      })
    );

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(mockOnMessage).toHaveBeenCalled();
  });
});

describe('MockWebSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should initialize with CONNECTING state', () => {
    const mockWs = new MockWebSocket('wss://example.com');
    expect(mockWs.readyState).toBe(WebSocket.CONNECTING);
  });

  it('should call onopen after 1 second', () => {
    const mockWs = new MockWebSocket('wss://example.com');
    const onOpenSpy = vi.fn();
    mockWs.onopen = onOpenSpy;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockWs.readyState).toBe(WebSocket.OPEN);
    expect(onOpenSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onclose when close is called', () => {
    const mockWs = new MockWebSocket('wss://example.com');
    const onCloseSpy = vi.fn();
    mockWs.onclose = onCloseSpy;

    act(() => {
      mockWs.close();
    });

    expect(mockWs.readyState).toBe(WebSocket.CLOSED);
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should start sending mock messages after connecting', () => {
    const mockWs = new MockWebSocket('wss://example.com');
    const onMessageSpy = vi.fn();
    mockWs.onmessage = onMessageSpy;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(onMessageSpy).toHaveBeenCalled();
    expect(() => JSON.parse(onMessageSpy.mock.calls[0][0].data)).not.toThrow();
  });
});
