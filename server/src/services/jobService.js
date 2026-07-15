import { supabaseAdmin } from "../config/supabase.js";
import { HttpError } from "../utils/httpError.js";

export const createJob = async ({ user, payload }) => {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .insert({
      employer_id: user.id,
      title: payload.title,
      type: payload.type,
      location: payload.location,
      description: payload.description,
      salary: payload.salary,
      company_name: payload.companyName,
      company_description: payload.companyDescription,
      contact_email: payload.contactEmail,
      contact_phone: payload.contactPhone,
      minimum_score_threshold: payload.minimumScoreThreshold,
    })
    .select("*")
    .single();

  if (error) throw new HttpError(500, "Failed to create job", error.message);
  return data;
};

export const getEmployerJobs = async (employerId) => {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select("id,title,minimum_score_threshold,created_at")
    .eq("employer_id", employerId)
    .order("created_at", { ascending: false });

  if (error) throw new HttpError(500, "Failed to fetch employer jobs", error.message);
  return data;
};

export const updateJob = async ({ jobId, payload }) => {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .update({
      title: payload.title,
      type: payload.type,
      location: payload.location,
      description: payload.description,
      salary: payload.salary,
      company_name: payload.companyName,
      company_description: payload.companyDescription,
      contact_email: payload.contactEmail,
      contact_phone: payload.contactPhone,
      minimum_score_threshold: payload.minimumScoreThreshold,
    })
    .eq("id", jobId)
    .select("*")
    .single();

  if (error) throw new HttpError(500, "Failed to update job", error.message);
  return data;
};

export const deleteJob = async (jobId) => {
  const { error } = await supabaseAdmin
    .from("jobs")
    .delete()
    .eq("id", jobId);

  if (error) throw new HttpError(500, "Failed to delete job", error.message);
};
