import { axiosInstance } from ".";

export const addMoneyToPoolService = (payload: Record<string, string>) =>
  axiosInstance.post("/competition/transaction", payload);
