import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

function AppUnderTest() {
  return (
    <Routes>
      <Route
        path="/private"
        element={
          <ProtectedRoute>
            <div>Secret</div>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<div>Login Page</div>} />
    </Routes>
  );
}

test("redirects to /login when no token", () => {
  localStorage.removeItem("token");

  render(
    <MemoryRouter initialEntries={["/private"]}>
      <AppUnderTest />
    </MemoryRouter>
  );

  expect(screen.getByText("Login Page")).toBeInTheDocument();
});

test("renders children when token exists", () => {
  localStorage.setItem("token", "jwt-token");

  render(
    <MemoryRouter initialEntries={["/private"]}>
      <AppUnderTest />
    </MemoryRouter>
  );

  expect(screen.getByText("Secret")).toBeInTheDocument();
});

