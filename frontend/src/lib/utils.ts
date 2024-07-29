import { UserType } from "../types/commonTypes";

export const prepareUserObj = (data: UserType): UserType => {
  const baseUrl = "http://localhost:3000/";
  const avatarAddress = data.avatar ? baseUrl + data.avatar : null;
  return { ...data, avatar: avatarAddress };
};
