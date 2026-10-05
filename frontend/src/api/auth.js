import apiClient from "./client";

export async function registerRequest({ name, email, password, role }) {
  const { data } = await apiClient.post("/auth/register", { name, email, password, role });
  return data;
}

export async function loginRequest({ email, password }) {
  const { data } = await apiClient.post("/auth/login", { email, password });
  return data; // { token, user }
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get("/auth/me");
  return data.user;
}
