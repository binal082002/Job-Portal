import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file) {
      setError("File is required");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file, file.name);
    const authToken = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: {
        Authorization: authToken,
      },
      body: formData,
    });

    if(response.ok) {
      toast.success("Resume uploaded");
      setError(null);
      setFile(null);
      navigate("/jobs")
    }
  };

  return (
    <>
      <div>
        <h1 className="text-5xl font-semibold mb-6 mt-5">Upload resume</h1>
        <div className="border-2 border-amber-500 p-4">
          <div className="p-2">
            <label htmlFor="name">Resume</label>
            <input
             required
              type="file"
              name="resume"
              className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-lg py-2 px-4 mt-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
          >
            Upload
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

      </div>
    </>
  );
};

export default UploadResume;
