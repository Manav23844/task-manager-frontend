// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {

//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav>

//       <Link to="/dashboard">Dashboard</Link>

//       <Link to="/create-task">Create Task</Link>

//       <button onClick={logout}>
//         Logout
//       </button>

//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, logout as doLogout } from "../services/auth";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? getUserFromToken(token) : null;

  const logout = () => {

    doLogout();

    navigate("/login");
  };

  return (

    <nav className="nav">

      <Link className="nav__brand" to={token ? "/dashboard" : "/login"}>
        Task Manager
      </Link>

      <div className="nav__links">
        {!token ? (
          <>
            <Link className="nav__link" to="/login">
              Login
            </Link>
            <Link className="nav__link" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link className="nav__link" to="/dashboard">
              Dashboard
            </Link>

            {user?.role === "admin" && (
              <Link className="nav__link" to="/admin">
                Admin
              </Link>
            )}

            <Link className="nav__link" to="/create">
              Create Task
            </Link>

            <button className="btn btn--ghost" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;