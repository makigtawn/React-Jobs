import { supabaseAdmin } from "../config/supabase.js";
import { HttpError } from "../utils/httpError.js";

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";

    if (!token) {
      throw new HttpError(401, "Authentication token is required");
    }

    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
      throw new HttpError(401, "Invalid or expired authentication token");
    }

    req.user = data.user;
    next();
  } catch (error) {
    next(error);
  }
};
