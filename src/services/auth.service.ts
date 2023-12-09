import { authKey } from '@/constants/storageKey';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { decodedToken } from '@/utils/jwt';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return '';
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const cartItemsInfo = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const cartAmountInfo = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const removeCartItemsInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const removeCartAmountInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `http://localhost:7000/api/v1/auth/refresh-token`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
