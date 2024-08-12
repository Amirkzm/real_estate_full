import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { io, Socket as SocketType } from "socket.io-client";
import { useUser } from "./userProvider";

type SocketContextType = {
  socket: SocketType | null;
  setSocket: Dispatch<SetStateAction<SocketType | null>>;
};

const socketContext = createContext<SocketContextType | undefined>(undefined);

type SocketProviderProps = {
  children: ReactNode;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const { user } = useUser();
  const socketUrl = import.meta.env.VITE_SOCKET_ADDRESS;

  useEffect(() => {
    if (user?.id && !socket) {
      const newSocket = io(socketUrl);
      setSocket(newSocket);
      newSocket?.emit("newUser", user.id);
    } else if (!user?.id && socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socketUrl, user?.id, socket]);

  const value = {
    socket,
    setSocket,
  };

  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(socketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a socketProvider");
  }
  return context;
};
