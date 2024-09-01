import { authKey } from "@/constants.ts/authKey";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removedFromLocalStorge,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  console.log(accessToken);
  return setToLocalStorage(authKey, accessToken);
};
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodeData: any = decodedToken(authToken);
    return {
      ...decodeData,
      role: decodeData?.role.toLowerCase(),
    };
  }
};
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};
export const removeUser = () => {
  return removedFromLocalStorge(authKey);
};
