import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { getApiErrorMessage } from "../services/api";
import TaskCard from "../components/TaskCard";

function Dashboard() {

  const [me, setMe] = useState(null);
  const [meError, setMeError] = useState("");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const getMe = async () => {
    try {
      setMeError("");
      const res = await API.get("/me");
      setMe(res.data ?? null);
    } catch (e) {
      setMeError(getApiErrorMessage(e, "Failed to load user info"));
    }
  };

  const getTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      setError(getApiErrorMessage(error, "Failed to load tasks"));
    }
    setLoading(false);
  };

  useEffect(() => {
    getMe();
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    if (!id) return;
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      setDeletingId(id);
      await API.delete(`/tasks/${id}`);
      await getTasks();
    } catch (e) {
      setError(getApiErrorMessage(e, "Failed to delete task"));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p className="muted">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <div>
            <h2 className="title">Dashboard</h2>
            <p className="muted">Your tasks, all in one place.</p>
          </div>

          <div className="pageHeader__actions">
            <Link className="btn" to="/create">
              New task
            </Link>
            <button className="btn btn--ghost" onClick={getTasks}>
              Refresh
            </button>
          </div>
        </div>

        {(me || meError) && (
          <div className="card infoCard">
            <h3 className="sectionTitle">Logged in user</h3>
            {meError ? (
              <div className="alert alert--error" role="alert">
                {meError}
              </div>
            ) : (
              <div className="infoGrid">
                <div>
                  <div className="infoLabel">Name</div>
                  <div className="infoValue">{me?.name ?? "—"}</div>
                </div>
                <div>
                  <div className="infoLabel">Email</div>
                  <div className="infoValue mono">{me?.email ?? "—"}</div>
                </div>
                <div>
                  <div className="infoLabel">Role</div>
                  <div className="infoValue">
                    <span className={`badge ${me?.role === "admin" ? "badge--ok" : "badge--pending"}`}>
                      {me?.role ?? "user"}
                    </span>
                  </div>
                </div>
                {me?.role === "admin" && (
                  <div>
                    <div className="infoLabel">Admin tools</div>
                    <div className="infoValue">
                      <Link className="btn btn--ghost" to="/admin">
                        Open admin dashboard
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="alert alert--error" role="alert">
            {error}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="emptyState">
            <p className="muted">No tasks found.</p>
            <Link className="btn" to="/create">
              Create your first task
            </Link>
          </div>
        ) : (
          <div className="taskGrid">
            {tasks.map((task, idx) => {
              const id = task?._id ?? task?.id;
              return (
                <TaskCard
                  key={id ?? idx}
                  task={task}
                  onDelete={deleteTask}
                  deleting={deletingId === id}
                />
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import TaskCard from "../components/TaskCard";

// function Dashboard() {

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getTasks = async () => {

//     try {

//       const res = await API.get("/tasks");

//       setTasks(res.data);

//     } catch (error) {

//       console.log("Error fetching tasks");

//     } finally {

//       setLoading(false);

//     }

//   };

//   useEffect(() => {

//     getTasks();

//   }, []);

//   const deleteTask = async (id) => {

//     await API.delete(`/tasks/${id}`);

//     getTasks();

//   };

//   if (loading) {
//     return <p>Loading tasks...</p>;
//   }

//   return (

//     <div>

//       <h2>Dashboard</h2>

//       {tasks.length === 0 && (
//         <p>No tasks found</p>
//       )}

//       {tasks.map((task) => (
//         <TaskCard
//           key={task.id}
//           task={task}
//           onDelete={deleteTask}
//         />
//       ))}

//     </div>

//   );

// }

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { getTasks } from "../services/api";

// function Dashboard() {

//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     async function fetchTasks() {
//       const data = await getTasks();
//       setTasks(data);
//     }

//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <h2>My Tasks</h2>

//       {tasks.length === 0 ? (
//         <p>No tasks yet</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task.id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Dashboard;