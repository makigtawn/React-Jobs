import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useLoaderData();

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      "are you sure you want to delete this listing?",
    );
    if (!confirm) return;
    deleteJob(jobId);
    toast.success("Job deleted sucessfully");
    navigate("/jobs");
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-black hover:text-olive-600 flex items-center">
            <FaArrowLeft className="mr-2" /> back
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-olive-800 text-lg font-bold mb-6">
                  job description
                </h3>
                <p className="mb-4">{job.description}</p>
                <h3 className="text-olive-800 text-lg font-bold mb-2">
                  salary compensation
                </h3>
                <p className="mb-4">{job.salary}</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">company info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">contact email:</h3>

                <p className="my-2 bg-olive-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">contact phone</h3>

                <p className="my-2 bg-olive-100 p-2 font-bold">
                  {""}
                  {job.company.contactPhone}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">manage job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-white px-6 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition duration-200 hover:scale-[1.02] hover:bg-slate-100 mt-4 w-full">
                  edit job
                </Link>

                <button
                  onClick={() => onDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  delete job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
