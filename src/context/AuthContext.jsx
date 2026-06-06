import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

// #region agent log
fetch('http://127.0.0.1:7344/ingest/f404edb9-b305-43de-9ba7-568fd646dc90',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2b480a'},body:JSON.stringify({sessionId:'2b480a',runId:'post-fix',hypothesisId:'A',location:'AuthContext.jsx:init',message:'auth uses shared supabase client',data:{usingSharedClient:true,hasAnonKey:!!import.meta.env.VITE_SUPABASE_ANON_KEY},timestamp:Date.now()})}).catch(()=>{});
// #endregion

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (token_hash) {
      supabase.auth
        .verifyOtp({
          token_hash,
          type: type || "email",
        })
        .finally(() => {
          window.history.replaceState({}, document.title, "/");
        });
    }

    supabase.auth.getSession().then(({ data, error }) => {
      // #region agent log
      fetch('http://127.0.0.1:7344/ingest/f404edb9-b305-43de-9ba7-568fd646dc90',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2b480a'},body:JSON.stringify({sessionId:'2b480a',runId:'post-fix',hypothesisId:'A',location:'AuthContext.jsx:getSession',message:'auth getSession result',data:{hasError:!!error,errorMessage:error?.message??null,hasUser:!!data?.session?.user},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      setUser(data.session?.user || null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email) => {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
