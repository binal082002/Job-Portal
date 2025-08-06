import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState(jobs);
  const [search, setSearch] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user._id;
    if (id) setUserId(id);
    fetchJobs();
  }, []);

  const handleJobApply = async (id) => {
    try {
      const authToken = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/apply-job/${id}`, {
        method: "POST",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        toast.success("Application successful!")
        const updatedJobs = jobs.map((job) => {
          if (job._id === id) {
            const updatedUsers = job.users ? [...job.users] : [];
            updatedUsers.push({ _id: userId });
            return { ...job, users: updatedUsers };
          }
          return job;
        });

        setJobs(updatedJobs);
        setFiltered(updatedJobs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "GET",
      });

      if (response.ok) {
        const res_data = await response.json();
        setJobs(res_data.res);
        setFiltered(res_data.res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    if (search.length > 0) {
      const filtered = jobs.filter((job) => {
        if (
          job.title.includes(search) ||
          job.location.includes(search) ||
          job.company.includes(search)
        )
          return true;
        return false;
      });
      setFiltered(filtered);
    } else fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-semibold mb-6 mt-4">Job List</h1>

      <input
        type="text"
        name="input"
        value={search}
        className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={handleSearch}
        type="submit"
        className="text-lg ml-2 py-2 px-4 mt-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
      >
        Search
      </button>

      <div id="job-card" className="font-bold text-lg">
        <p>Job Title</p>
        <p>Company</p>
        <p>Location</p>
        <p>Description</p>
      </div>

      {filtered.length > 0 &&
        filtered.map((job) => {
          const user = JSON.parse(localStorage.getItem("user"));
          const isApplied = job.users?.some(
            (u) => u._id === user?._id
          );

          return (
            <div id="job-card">
              <p>{job.title}</p>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.description}</p>
              <button
                id="button"
                onClick={() => handleJobApply(job._id)}
                className="text-lg ml-2 w-20 rounded-lg bg-amber-600 text-white transition"
                disabled={isApplied}
              >
                {isApplied ? "Applied" : "Apply"}
              </button>
            </div>
          );
        })}
    </>
  );
};

export default JobList;
