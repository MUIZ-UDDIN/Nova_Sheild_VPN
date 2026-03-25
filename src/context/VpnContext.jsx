import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { setupNative, showVpnNotification, hideVpnNotification } from '../utils/nativeNotification';

const VpnContext = createContext(null);

const SERVERS = [
  { id: 1, name: 'United States', city: 'New York', code: 'US', flag: '🇺🇸', ping: 12, load: 23, premium: false },
  { id: 2, name: 'United Kingdom', city: 'London', code: 'GB', flag: '🇬🇧', ping: 28, load: 45, premium: false },
  { id: 3, name: 'Germany', city: 'Frankfurt', code: 'DE', flag: '🇩🇪', ping: 32, load: 31, premium: false },
  { id: 4, name: 'Japan', city: 'Tokyo', code: 'JP', flag: '🇯🇵', ping: 89, load: 18, premium: false },
  { id: 5, name: 'Singapore', city: 'Singapore', code: 'SG', flag: '🇸🇬', ping: 72, load: 15, premium: false },
  { id: 6, name: 'Netherlands', city: 'Amsterdam', code: 'NL', flag: '🇳🇱', ping: 25, load: 52, premium: false },
  { id: 7, name: 'Canada', city: 'Toronto', code: 'CA', flag: '🇨🇦', ping: 18, load: 28, premium: false },
  { id: 8, name: 'Australia', city: 'Sydney', code: 'AU', flag: '🇦🇺', ping: 145, load: 12, premium: false },
  { id: 9, name: 'France', city: 'Paris', code: 'FR', flag: '🇫🇷', ping: 30, load: 38, premium: false },
  { id: 10, name: 'Brazil', city: 'São Paulo', code: 'BR', flag: '🇧🇷', ping: 110, load: 20, premium: false },
  { id: 11, name: 'South Korea', city: 'Seoul', code: 'KR', flag: '🇰🇷', ping: 95, load: 22, premium: false },
  { id: 12, name: 'India', city: 'Mumbai', code: 'IN', flag: '🇮🇳', ping: 68, load: 35, premium: false },
  { id: 13, name: 'Sweden', city: 'Stockholm', code: 'SE', flag: '🇸🇪', ping: 35, load: 10, premium: false },
  { id: 14, name: 'Switzerland', city: 'Zurich', code: 'CH', flag: '🇨🇭', ping: 27, load: 14, premium: false },
  { id: 15, name: 'Ireland', city: 'Dublin', code: 'IE', flag: '🇮🇪', ping: 22, load: 19, premium: false },
  { id: 16, name: 'Poland', city: 'Warsaw', code: 'PL', flag: '🇵🇱', ping: 38, load: 25, premium: false },
  { id: 17, name: 'Turkey', city: 'Istanbul', code: 'TR', flag: '🇹🇷', ping: 55, load: 30, premium: false },
  { id: 18, name: 'UAE', city: 'Dubai', code: 'AE', flag: '🇦🇪', ping: 62, load: 17, premium: false },
  { id: 19, name: 'South Africa', city: 'Johannesburg', code: 'ZA', flag: '🇿🇦', ping: 160, load: 8, premium: false },
  { id: 20, name: 'Mexico', city: 'Mexico City', code: 'MX', flag: '🇲🇽', ping: 42, load: 21, premium: false },
];

export function VpnProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState(SERVERS[0]);
  const [connectionTime, setConnectionTime] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [dataUsed, setDataUsed] = useState(0);
  const timerRef = useRef(null);
  const speedRef = useRef(null);

  const startTimer = useCallback(() => {
    setConnectionTime(0);
    timerRef.current = setInterval(() => {
      setConnectionTime(prev => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const simulateSpeeds = useCallback(() => {
    speedRef.current = setInterval(() => {
      setDownloadSpeed(Math.floor(Math.random() * 60) + 40);
      setUploadSpeed(Math.floor(Math.random() * 30) + 15);
      setDataUsed(prev => prev + (Math.random() * 0.5));
    }, 2000);
  }, []);

  const stopSpeeds = useCallback(() => {
    if (speedRef.current) {
      clearInterval(speedRef.current);
      speedRef.current = null;
    }
  }, []);

  useEffect(() => {
    setupNative();
    return () => {
      stopTimer();
      stopSpeeds();
    };
  }, [stopTimer, stopSpeeds]);

  const connect = useCallback(() => {
    setIsConnecting(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        startTimer();
        simulateSpeeds();
        setDownloadSpeed(Math.floor(Math.random() * 60) + 40);
        setUploadSpeed(Math.floor(Math.random() * 30) + 15);
        showVpnNotification(selectedServer.city);
        resolve();
      }, 1500);
    });
  }, [startTimer, simulateSpeeds, selectedServer]);

  const disconnect = useCallback(() => {
    setIsConnecting(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsConnected(false);
        setIsConnecting(false);
        stopTimer();
        stopSpeeds();
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setConnectionTime(0);
        hideVpnNotification();
        resolve();
      }, 800);
    });
  }, [stopTimer, stopSpeeds]);

  const selectServer = useCallback((server) => {
    setSelectedServer(server);
  }, []);

  return (
    <VpnContext.Provider value={{
      isConnected,
      isConnecting,
      selectedServer,
      servers: SERVERS,
      connectionTime,
      downloadSpeed,
      uploadSpeed,
      dataUsed,
      connect,
      disconnect,
      selectServer,
    }}>
      {children}
    </VpnContext.Provider>
  );
}

export function useVpn() {
  const context = useContext(VpnContext);
  if (!context) throw new Error('useVpn must be used within VpnProvider');
  return context;
}
