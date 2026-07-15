const API_BASE_URL = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/$/, "");

const getErrorMessage = (data, fallback = "Request failed") => {
  if (typeof data === "string") return data;

  if (data && typeof data === "object") {
    if (typeof data.error === "string") return data.error;
    if (typeof data.message === "string") return data.message;
  }

  return fallback;
};

export const apiRequest = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const requestOptions = {
    ...options,
    credentials: "include",
    headers,
  };

  if (
    options.body !== undefined &&
    typeof options.body !== "string" &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof Blob) &&
    !(options.body instanceof ArrayBuffer) &&
    !(options.body instanceof URLSearchParams)
  ) {
    requestOptions.body = JSON.stringify(options.body);
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, requestOptions);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Network request failed");
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Request failed"));
  }

  return data;
};

export const registerUser = async (email, password) => {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: { email, password },
  });
};

export const loginUser = async (email, password) => {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
};

export const logoutUser = async () => {
  return apiRequest("/api/auth/logout", {
    method: "POST",
  });
};

export const getCurrentUser = async () => {
  return apiRequest("/api/auth/me");
};
