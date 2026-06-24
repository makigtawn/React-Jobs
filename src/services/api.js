import { supabase } from "../utils/supabase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const authHeaders = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token
    ? { Authorization: `Bearer ${session.access_token}` }
    : {};
};

export const apiRequest = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeaders()),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};

export const getProfile = async () => {
  return await apiRequest("/api/profile", {
    method: "GET",
  });
};


export const updateProfile = async (profileData) => {
  return await apiRequest("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};
