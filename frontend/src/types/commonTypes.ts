export type UserType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
};

export type SingleLocationType = {
  id: string;
  title: string;
  price: number;
  images: string[];
  bedroom: number;
  bathroom: number;
  latitude: number;
  longitude: number;
  city: string;
  address: string;
  type: "APARTMENT" | "HOUSE";
  property: "RENT" | "SALE";
  createdAt: Date;
  user: UserType;
  postDetails: PostDetails;
  isSaved?: boolean;
  userId?: string;
};

export type PostDetails = {
  id: string;
  description: string;
  utilities?: string;
  pet?: string;
  income?: string;
  size?: number;
  school?: number;
  bus?: number;
  restaurant?: number;
};

export type Chat = {
  id: string;
  users: UserType[];
  userIDs: string[];
  createdAt: Date;
  seenBy: string[];
  messages: ChatMessage[];
  lastMessage: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  chat?: Chat;
  users: UserType[];
  createdAt: Date;
};

type requiredMapProperties = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  bedroom: number;
};

export type MapItem = Partial<
  Omit<
    SingleLocationType,
    "latitude" | "longitude" | "id" | "title" | "bedroom"
  >
> &
  requiredMapProperties;
