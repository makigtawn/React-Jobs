import express from "express";
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

const router = express.Router();

const supabase = createClient(
  env.supabaseUrl || process.env.SUPABASE_URL, 
  env.supabaseAnonKey || process.env.SUPABASE_ANON_KEY
);

const getUserIdFromAuth = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  
  const token = authHeader.split(" ")[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) return null;
  return user.id;
};
//get 
router.get("/", async (req, res, next) => {
  try {
    const userId = await getUserIdFromAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid session token" });
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(profile || { id: userId, full_name: "", company_name: "", website: "", company_description: "", contact_email: "", contact_phone: "" });
  } catch (err) {
    next(err);
  }
});
// put
router.put("/", async (req, res, next) => {
  try {
    const userId = await getUserIdFromAuth(req);
    const { full_name, company_name, website, company_description, contact_email, contact_phone } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid session token" });
    }

    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name,
        company_name,
        website,
        company_description,
        contact_email,
        contact_phone,
        updated_at: new Date(),
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
