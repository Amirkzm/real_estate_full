import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { UserType } from "../types/commonTypes";
import apiRequest from "../lib/apiRequest";

type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const value = {
    user,
    setUser,
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiRequest.get("/auth/me", {
          withCredentials: true,
        });
        if (response.status === 200) {
          const user = response.data.data as UserType;
          if (!user.avatar) {
            user.avatar = "/no-profile.png";
          }
          setUser(user);
        }
      } catch (error) {
        console.error("User not authenticated", error);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
