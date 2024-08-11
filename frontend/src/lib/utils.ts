import { UserType } from "../types/commonTypes";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const prepareUserObj = (data: UserType): UserType => {
  const avatarAddress = data.avatar ? baseUrl + data.avatar : "/no-profile.png";
  return { ...data, avatar: avatarAddress };
};

//overLoad function to accept string or array of strings
export function generateImageAddress(image: string): string;
export function generateImageAddress(images: string[]): string[];

export function generateImageAddress(
  imageSrc: string | string[]
): string | string[] | null {
  const urlToStaticFiles = import.meta.env.VITE_BACKEND_BASE_URL.split(
    "api"
  )[0];

  if (typeof imageSrc === "string") {
    return urlToStaticFiles + imageSrc;
  } else if (Array.isArray(imageSrc)) {
    return imageSrc.map((img) => urlToStaticFiles + img);
  } else {
    return null;
  }
}
