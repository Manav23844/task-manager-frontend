// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/api";

// function EditTask() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("pending");

//   useEffect(() => {

//     const getTask = async () => {

//       const res = await API.get(`/tasks/${id}`);

//       setTitle(res.data.title);
//       setDescription(res.data.description);
//       setStatus(res.data.status);
//     };

//     getTask();

//   }, [id]);

//   const updateTask = async (e) => {

//     e.preventDefault();

//     await API.put(`/tasks/${id}`, {
//       title,
//       description,
//       status
//     });

//     navigate("/dashboard");
//   };

//   return (

//     <div>

//       <h2>Edit Task</h2>

//       <form onSubmit={updateTask}>

//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >

//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>

//         </select>

//         <button type="submit">
//           Update Task
//         </button>

//       </form>

//     </div>
//   );
// }

// export default EditTask;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API, { getApiErrorMessage } from "../services/api";

function EditTask() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchTask = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await API.get(`/tasks/${id}`);

        setTitle(res.data?.title ?? "");
        setDescription(res.data?.description ?? "");
        setStatus(res.data?.status ?? "pending");
      } catch (e) {
        setError(getApiErrorMessage(e, "Failed to load task"));
      } finally {
        setLoading(false);
      }
    };

    fetchTask();

  }, [id]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setError("");
      setSaving(true);
      await API.put(`/tasks/${id}`, {
        title,
        description,
        status
      });
      navigate("/dashboard");
    } catch (e) {
      setError(getApiErrorMessage(e, "Failed to update task"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p className="muted">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <div>
            <h2 className="title">Edit task</h2>
            <p className="muted">Update details and status.</p>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className="label">
              Description
              <textarea
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
              <button className="btn" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTask;