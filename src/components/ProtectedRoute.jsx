// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {

//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { isAdmin } from "../services/auth";

function ProtectedRoute({ children, adminOnly = false }) {

  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin(token)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;