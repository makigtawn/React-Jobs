// import JobListing from "./JobListing";
// import { useState, useEffect } from "react";
// import Spinner from "./Spinner";
// import { supabase } from "../utils/supabase";

// const JobListings = ({ isHome = false }) => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         let query = supabase.from('jobs').select('*').order('created_at', { ascending: false });

//         if (isHome) query = query.limit(3);

//         const { data, error } = await query;
//         if (error) throw error;

//         const shaped = data.map(job => ({
//           id:          job.id,
//           title:       job.title,
//           type:        job.type,
//           location:    job.location,
//           description: job.description,
//           salary:      job.salary,
//           company: {
//             name:         job.company_name,
//             description:  job.company_description,
//             contactEmail: job.contact_email,
//             contactPhone: job.contact_phone,
//           }
//         }));

//         setJobs(shaped);
//       } catch (error) {
//         console.log("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [isHome]);

//   return (
//     <section>
//       <div className="container-xl lg:mx-10 lg:my-10 lg:container m-auto">
//         <h2 className="text-4xl text-text-primary dark:text-text-primary  mb-6 font-bold text-center py-4">
//           {isHome ? 'Recent jobs' : 'Browse jobs'}
//         </h2>
//         {loading ? (
//           <Spinner loading={loading} />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 mx-4 gap-6">
//             {jobs.map((job) => (
//               <JobListing key={job.id} job={job} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default JobListings;

import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = isHome
          ? "http://localhost:3000/api/jobs?limit=3"
          : "http://localhost:3000/api/jobs";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();

        // 2. Map the data exactly like you did before
        // (Assuming your Express API returns rows directly from the PG database)
        const shaped = data.map((job) => ({
          id: job.id,
          title: job.title,
          type: job.type,
          location: job.location,
          description: job.description,
          salary: job.salary,
          company: {
            name: job.company_name,
            description: job.company_description,
            contactEmail: job.contact_email,
            contactPhone: job.contact_phone,
          },
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
    <section className="container-xl bg-page-bg dark:bg-page-bg py-4 ">
        <h2 className="text-4xl text-accent mb-6 font-bold text-center py-4">
          {isHome ? "Recent jobs" : "Browse jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 mx-5 my-9 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
     
    </section>
  );
};

export default JobListings;
