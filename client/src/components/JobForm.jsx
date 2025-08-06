import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JobForm = () => {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
  });
  const [error,setError] = useState(null);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setJob({
      ...job,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(job.title.trim().length===0) {
      setError("Title is required");
      return;
    }else if(job.description.trim().length===0) {
      setError("Description is required");
      return;
    }else if(job.company.trim().length===0) {
      setError("Company is required");
      return;
    }else if(job.location.trim().length===0) {
      setError("Location is required");
      return;
    }

    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch("http://localhost:5000/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(job),
      });

      if (response.ok) {
        toast.success("Job added");
        const res_data = await response.json();
        setJob({ title: "", description: "", location: "", company: "" });
        setError(null);
        navigate('/jobs');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-5xl font-semibold mb-6 mt-5">Job Details</h1>

      <div className="border-2 border-amber-500 p-4">
        <div className="p-2">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
            placeholder="Enter job title"
            value={job.title}
            onChange={handleInput}
            required
          />
        </div>

        <div className="p-2">
          <label htmlFor="name">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
            placeholder="Enter description"
            value={job.description}
            onChange={handleInput}
            required
          />
        </div>

        <div className="p-2">
          <label htmlFor="name">Company</label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Enter company name"
            className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
            value={job.company}
            onChange={handleInput}
            required
          />
        </div>

        <div className="p-2">
          <label htmlFor="name">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter location"
            className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
            value={job.location}
            onChange={handleInput}
            required
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-lg py-2 px-4 mt-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}

      </div>
    </>
  );
};

export default JobForm;
