export type ListLocationType = {
  id: number;
  title: string;
  img: string;
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
  bedRooms: number;
  bathroom: number;
  size: number;
  latitude: number;
  longitude: number;
  city: string;
  address: string;
  school: string;
  bus: string;
  restaurant: string;
  description: string;
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
  avatar: string | null;
  createdAt: string;
};
