import { useEffect, useState } from "react";
import API, { getApiErrorMessage } from "../services/api";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    try {
      setError("");
      setLoading(true);
      const [u, t] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/tasks")
      ]);
      setUsers(Array.isArray(u.data) ? u.data : []);
      setTasks(Array.isArray(t.data) ? t.data : []);
    } catch (e) {
      setError(getApiErrorMessage(e, "Failed to load admin dashboard"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p className="muted">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <div>
            <h2 className="title">Admin dashboard</h2>
            <p className="muted">All users and all tasks.</p>
          </div>

          <div className="pageHeader__actions">
            <button className="btn btn--ghost" onClick={load}>
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert--error" role="alert">
            {error}
          </div>
        )}

        <div className="adminGrid">
          <div className="card">
            <h3 className="sectionTitle">Users ({users.length})</h3>
            {users.length === 0 ? (
              <p className="muted">No users found.</p>
            ) : (
              <div className="tableWrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`badge ${u.role === "admin" ? "badge--ok" : "badge--pending"}`}>
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="sectionTitle">Tasks ({tasks.length})</h3>
            {tasks.length === 0 ? (
              <p className="muted">No tasks found.</p>
            ) : (
              <div className="tableWrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Owner</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((t) => (
                      <tr key={t.id}>
                        <td>{t.title}</td>
                        <td>
                          <span className={`badge ${t.status === "completed" ? "badge--ok" : "badge--pending"}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="mono">
                          {t.owner?.email ?? t.userId ?? "—"}
                        </td>
                        <td className="mono">
                          {t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

