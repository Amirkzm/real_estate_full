import { create } from "zustand";
import apiRequest from "../lib/apiRequest";

interface NotificationState {
  number: number;
  fetch: (userId: string) => Promise<void>;
  decrease: () => void;
  reset: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  number: 0,
  fetch: async (userId) => {
    const res = await apiRequest(`/users/${userId}/notifications`);
    if (res.statusText === "OK") {
      set({ number: res.data.data.unreadMessagesCount });
    }
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));

export default useNotificationStore;
