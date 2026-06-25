import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {

    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth session error:", error);
          setSessionError(error.message);
        }
        setUser(data.session?.user || null);
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        setSessionError("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setSessionError(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (result.error) {
        setSessionError(result.error.message);
        return result;
      }

      if (result.data?.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(
            {
              id: result.data.user.id,
              email: result.data.user.email,
              role: "user", 
            },
            { onConflict: "id" } 
          );

        if (profileError) {
          console.error("Failed to sync profile status:", profileError.message);
        }
      }

      setSessionError(null);
      return result;
    } catch (error) {
      setSessionError(error.message);
      return { error };
    }
  };

  const signup = async ({ fullName, email, password }) => {
    try {
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (result.error) {
        setSessionError(result.error.message);
      } else {
        setSessionError(null);
      }
      return result;
    } catch (error) {
      setSessionError(error.message);
      return { error };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        setSessionError(null);
      } else {
        setSessionError(error.message);
      }
      return { error };
    } catch (error) {
      setSessionError(error.message);
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, sessionError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
