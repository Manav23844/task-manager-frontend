// function TaskCard({ task, onDelete }) {

//   return (

//     <div>

//       <h3>{task.title}</h3>

//       <p>{task.description}</p>

//       <p>Status: {task.status}</p>

//       <button onClick={() => onDelete(task.id)}>
//         Delete
//       </button>

//     </div>

//   );

// }

// export default TaskCard;

import { Link } from "react-router-dom";

function TaskCard({ task, onDelete, deleting }) {
  const taskId = task?._id ?? task?.id;
  const title = task?.title ?? "(Untitled)";
  const description = task?.description ?? "";
  const status = task?.status ?? "pending";

  return (

    <div className="taskCard">

      <div className="taskCard__header">
        <h3 className="taskCard__title">{title}</h3>
        <span className={`badge ${status === "completed" ? "badge--ok" : "badge--pending"}`}>
          {status}
        </span>
      </div>

      {description && <p className="taskCard__desc">{description}</p>}

      <div className="taskCard__actions">
        <Link className="btn btn--ghost" to={`/edit/${taskId}`}>
          Edit
        </Link>

        <button
          className="btn btn--danger"
          onClick={() => onDelete(taskId)}
          disabled={!taskId || deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

    </div>

  );

}

export default TaskCard;