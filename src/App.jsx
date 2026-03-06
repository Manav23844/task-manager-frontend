// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import CreateTask from "./pages/CreateTask";
// import EditTask from "./pages/EditTask";

// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <BrowserRouter>

//       <Navbar />

//       <Routes>

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/create-task"
//           element={
//             <ProtectedRoute>
//               <CreateTask />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/edit-task/:id"
//           element={
//             <ProtectedRoute>
//               <EditTask />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import CreateTask from "./pages/CreateTask";
// import Login from "./pages/Login";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/create-task" element={<CreateTask />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={localStorage.getItem("token") ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;