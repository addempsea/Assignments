import { axiosWithoutAuth } from ".";

export const signUpService = (payload: Record<string, string>) =>
  axiosWithoutAuth.post("/auth/signup", payload);

export const logInService = (payload: Record<string, string>) =>
  axiosWithoutAuth.post("/auth/login", payload);

export const forgotPasswordService = (payload: Record<string, string>) =>
  axiosWithoutAuth.post("/auth/forgot-password", payload);

export const resetPasswordService = (payload: Record<string, string>) =>
  axiosWithoutAuth.post("/auth/set-password", payload);
