import { render, screen } from "@testing-library/react";
import TaskCard from "../src/components/TaskCard";

test("task title renders", () => {

  const task = {
    id: 1,
    title: "Sample Task",
    description: "Test description",
    status: "pending"
  };

  render(<TaskCard task={task} />);

  expect(screen.getByText("Sample Task")).toBeInTheDocument();

});