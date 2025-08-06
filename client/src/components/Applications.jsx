import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
        const authToken = localStorage.getItem('token');

      const response = await fetch("http://localhost:5000/applications", {
        method: "GET",
        headers: {
            Authorization: authToken,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        setApplications(res_data.res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-semibold mb-6 mt-4">Applications</h1>


      <div id="application-card" className="font-bold text-lg">

              <p>Company</p>
              <p>Title</p>
              <p>Username</p>
              <p>Email</p>
    </div>

      {applications.length > 0 &&
        applications.map((application) => {
          return (
            <div id="application-card">
              <p>{application.job.company}</p>
              <p>{application.job.title}</p>
              <p>{application.user.username}</p>
              <p>{application.user.email}</p>
            </div>
          );
        })}
    </>
  );
};

export default Applications;
