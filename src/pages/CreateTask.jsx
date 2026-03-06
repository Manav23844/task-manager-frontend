// import { useState } from "react";
// import API from "../services/api";

// function CreateTask() {

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const createTask = async (e) => {

//     e.preventDefault();

//     await API.post("/tasks", {
//       title,
//       description,
//       status: "pending"
//     });

//     alert("Task Created");

//   };

//   return (

//     <div>

//       <h2>Create Task</h2>

//       <form onSubmit={createTask}>

//         <input
//           placeholder="Title"
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           placeholder="Description"
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <button>
//           Create
//         </button>

//       </form>

//     </div>

//   );

// }

// export default CreateTask;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { getApiErrorMessage } from "../services/api";

function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await API.post("/tasks", {
        title,
        description,
        status
      });

      navigate("/dashboard");

    } catch (error) {
      setError(getApiErrorMessage(error, "Error creating task"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <div>
            <h2 className="title">Create task</h2>
            <p className="muted">Add a new task to your dashboard.</p>
          </div>
        </div>

        <div className="card">
          {error && (
            <div className="alert alert--error" role="alert">
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <label className="label">
              Title
              <input
                type="text"
                placeholder="e.g., Finish sprint report"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className="label">
              Description
              <textarea
                placeholder="Add details (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </label>

            <label className="label">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <div className="formActions">
              <Link className="btn btn--ghost" to="/dashboard">
                Cancel
              </Link>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;