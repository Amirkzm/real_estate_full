export type ListLocationType = {
  id: number;
  title: string;
  images: string;
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
};

export type SingleLocationType = {
  id: number;
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

export type ChatMessageType = {
  message: string;
  fromMe?: boolean;
  time: string;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
};
