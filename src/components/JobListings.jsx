import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { supabase } from "../utils/supabase";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let query = supabase.from('jobs').select('*').order('created_at', { ascending: false });

        if (isHome) query = query.limit(3);  // replaces ?_limit=3

        const { data, error } = await query;
        if (error) throw error;

        // reshape flat DB rows → nested shape your components expect
        const shaped = data.map(job => ({
          id:          job.id,
          title:       job.title,
          type:        job.type,
          location:    job.location,
          description: job.description,
          salary:      job.salary,
          company: {
            name:         job.company_name,
            description:  job.company_description,
            contactEmail: job.contact_email,
            contactPhone: job.contact_phone,
          }
        }));

        setJobs(shaped);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-4xl mb-6 font-bold text-[#ff4c57] text-center py-4">
          {isHome ? 'Recent jobs' : 'Browse jobs'}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
