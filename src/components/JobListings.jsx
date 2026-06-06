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
        // #region agent log
        fetch('http://127.0.0.1:7344/ingest/f404edb9-b305-43de-9ba7-568fd646dc90',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2b480a'},body:JSON.stringify({sessionId:'2b480a',runId:'pre-fix',hypothesisId:'B',location:'JobListings.jsx:fetchJobs',message:'jobs query result',data:{isHome,hasError:!!error,errorCode:error?.code??null,errorMessage:error?.message??null,rowCount:data?.length??0},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
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
        // #region agent log
        fetch('http://127.0.0.1:7344/ingest/f404edb9-b305-43de-9ba7-568fd646dc90',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2b480a'},body:JSON.stringify({sessionId:'2b480a',runId:'pre-fix',hypothesisId:'B',location:'JobListings.jsx:catch',message:'jobs fetch failed',data:{isHome,errorMessage:error?.message??String(error)},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
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
        <h2 className="text-3xl font-bold text-indigo-900 text-center py-4">
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
