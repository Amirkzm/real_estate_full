import { create } from "zustand";
import { Chat, SingleLocationType } from "../types/commonTypes";

interface NotificationState {
  chatItem: Chat | null;
  setChatItem: (item: Chat | null) => void;
}

const useChatItem = create<NotificationState>((set) => ({
  chatItem: null,
  setChatItem: (item) => {
    set({ chatItem: item });
  },
}));

export default useChatItem;
