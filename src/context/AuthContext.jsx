import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  refreshTokens,
} from "../services/api";
import { isJwtExpired } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        // If the access token is expired, try to silently refresh it before
        // hitting /api/auth/me — avoids a guaranteed 401 on every page load
        // after the 1-hour window.
        if (isJwtExpired(token)) {
          try {
            await refreshTokens();
          } catch {
            // Refresh token is missing or expired — clear everything and bail.
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            setUser(null);
            return;
          }
        }

        try {
          const data = await getCurrentUser();
          setUser(data.user || null);
        } catch (error) {
          // Access token was rejected (tampered, revoked, etc.) — clear it so
          // the user isn't stuck in a broken auth loop.
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          setUser(null);
          if (error.message && !error.message.includes("Not authenticated")) {
            console.error("Auth initialization failure:", error);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true); // Fixed from setLoading
      const data = await loginUser(email, password);

      setUser(data.user || null);
      setSessionError(null);
      return { data, error: null };
    } catch (error) {
      setSessionError(error.message);
      return { data: null, error };
    } finally {
      setIsLoading(false); // Fixed from setLoading
    }
  };

  const signup = async ({ fullName, email, password }) => {
    try {
      setIsLoading(true);

      const data = await registerUser(fullName, email, password);

      // Don't set user or store tokens - user needs to log in
      setUser(null);
      setSessionError(null);
      return { data, error: null };
    } catch (error) {
      setSessionError(error.message);
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setSessionError(null);
      return { error: null };
    } catch (error) {
      setSessionError(error.message);
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading: isLoading,
        isLoading,
        sessionError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
