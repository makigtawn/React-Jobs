// import { createContext, useEffect, useState } from "react";
// import {
//   getCurrentUser,
//   loginUser,
//   registerUser,
//   logoutUser,
//   refreshSession,
// } from "../services/api";
// import { getCookie, isJwtExpired } from "../utils/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);
//   const [sessionError, setSessionError] = useState(null);

//   useEffect(() => {
//     // Inside AuthContext.jsx
// const initializeAuth = async () => {
//   try {
//     setIsLoading(true);
//     const user = await getCurrentUser();
//     setUser(user);
//   } catch (error) {
//     // Quietly catch the 401 unauthenticated state without screaming in the console
//     setUser(null);

//     // Optional: Only log true unexpected errors, ignore standard "Not authenticated"
//     if (!error.message.includes("Not authenticated")) {
//       console.error("Actual auth initialization failure:", error);
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };
//     // const initializeAuth = async () => {
//     //   try {
//     //     const accessToken = getCookie("access_token");

//     //     if (accessToken && isJwtExpired(accessToken)) {
//     //       await refreshSession();
//     //     }

//     //     const data = await getCurrentUser();
//     //     setUser(data.user || null);
//     //   } catch (err) {
//     //     console.error("Failed to initialize auth:", err);
//     //     setUser(null);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     initializeAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       setLoading(true);
//       const data = await loginUser(email, password);

//       setUser(data.user || null);
//       setSessionError(null);
//       return { data, error: null };
//     } catch (error) {
//       setSessionError(error.message);
//       return { data: null, error };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async ({ fullName, email, password }) => {
//     try {
//       setLoading(true);

//       const data = await registerUser(email, password);

//       setUser(data.user || null);
//       setSessionError(null);
//       return { data, error: null };
//     } catch (error) {
//       setSessionError(error.message);
//       return { data: null, error };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await logoutUser();
//       setUser(null);
//       setSessionError(null);
//       return { error: null };
//     } catch (error) {
//       setSessionError(error.message);
//       return { error };
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, signup, logout, loading, sessionError }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Standardized on 'isLoading' and 'setIsLoading' across the whole file
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        const data = await getCurrentUser();
        setUser(data.user || null);
      } catch (error) {
        setUser(null);
        if (error.message && !error.message.includes("Not authenticated")) {
          console.error("Actual auth initialization failure:", error);
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
      setIsLoading(true); // Fixed from setLoading

      const data = await registerUser(email, password);

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
