import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import TaskCard from "../components/TaskCard";

test("TaskCard renders task details and edit link", () => {
  render(
    <MemoryRouter>
      <TaskCard task={{ id: "t1", title: "Write tests", description: "Add RTL", status: "pending" }} onDelete={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /write tests/i })).toBeInTheDocument();
  expect(screen.getByText(/add rtl/i)).toBeInTheDocument();
  expect(screen.getByText(/pending/i)).toBeInTheDocument();

  const editLink = screen.getByRole("link", { name: /edit/i });
  expect(editLink).toHaveAttribute("href", "/edit/t1");
});

test("TaskCard calls onDelete with task id", async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();

  render(
    <MemoryRouter>
      <TaskCard task={{ _id: "abc123", title: "Delete me", status: "completed" }} onDelete={onDelete} />
    </MemoryRouter>
  );

  await user.click(screen.getByRole("button", { name: /delete/i }));
  expect(onDelete).toHaveBeenCalledWith("abc123");
});

