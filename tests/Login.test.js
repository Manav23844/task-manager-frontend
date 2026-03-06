import { render, screen } from "@testing-library/react";
import Login from "../src/pages/Login";

test("login button renders", () => {

  render(<Login />);

  const button = screen.getByText(/login/i);

  expect(button).toBeInTheDocument();

});