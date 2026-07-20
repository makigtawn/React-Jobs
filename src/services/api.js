const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_BASE_URL || "")
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

  // Get token from localStorage and set Authorization header
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const requestOptions = {
    ...options,
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
    const error = new Error(getErrorMessage(data, "Request failed"));
    error.status = response.status;
    error.details = data && typeof data === "object" ? data.details : undefined;
    throw error;
  }

  return data;
};

export const registerUser = async (fullName, email, password) => {
  const data = await apiRequest("/api/auth/register", {
    method: "POST",
    body: { fullName: fullName.trim(), email: email.trim().toLowerCase(), password },
  });
  return data;
};

export const loginUser = async (email, password) => {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: { email: email.trim().toLowerCase(), password },
  });
  if (data && data.token) {
    localStorage.setItem("token", data.token);
  }
  if (data && data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
  return data;
};

export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    await apiRequest("/api/auth/logout", {
      method: "POST",
      body: refreshToken ? { refresh_token: refreshToken } : {},
    });
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  }
};

export const refreshTokens = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token");

  const data = await apiRequest("/api/auth/refresh", {
    method: "POST",
    body: { refresh_token: refreshToken },
  });

  if (data && data.token) {
    localStorage.setItem("token", data.token);
  }
  if (data && data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
  return data;
};

export const getCurrentUser = async () => {
  return apiRequest("/api/auth/me");
};

// Employer Profile Endpoints
export const getEmployerProfile = async () => {
  return apiRequest("/api/company", {
    method: "GET",
  });
};

// Create
export const createEmployerProfile = async (formData) => {
  return await apiRequest('/api/company', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Update
export const updateEmployerProfile = async (formData) => {
  return await apiRequest('/api/company', {
    method: 'PUT',
    body: JSON.stringify(formData),
  });
};

// Delete
export const deleteEmployerProfile = async () => {
  return await apiRequest('/api/company', {
    method: 'DELETE',
  });
};

// Job Endpoints
export const createJob = async (payload) => {
  return apiRequest('/api/jobs', {
    method: 'POST',
    body: payload,
  });
};

export const updateJobRequest = async (id, payload) => {
  return apiRequest(`/api/jobs/${id}`, {
    method: 'PUT',
    body: payload,
  });
};

export const deleteJobRequest = async (id) => {
  return apiRequest(`/api/jobs/${id}`, {
    method: 'DELETE',
  });
};
