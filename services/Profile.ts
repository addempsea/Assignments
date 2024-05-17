import { axiosInstance } from ".";

export const updateProfile = (payload: Record<string, string>) =>
  axiosInstance.put("/user/me", payload);

export const fetchProfile = () =>
  axiosInstance.get("/user/me");

export const getBanks = () => axiosInstance.get("/paystack-bank");

export const verifyBankAccount = (accountNumber: string, code: string) =>
  axiosInstance.get(`/paystack-verify-bank?accountNumber=${accountNumber}&bankCode=${code}`);
