import "./task.css";
import { BiTrash } from "react-icons/bi";
import { BsCheckLg, BsCheckAll } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTask,
  updateTask,
} from "@/redux/slices/tasks/tasks.async.thunks";

const Task = ({ task }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(removeTask({ user, task }));
  };

  const handleUpdateTask = () => {
    dispatch(updateTask({ user, task: { ...task, done: !task.done } }));
  };

  return (
    <div className="task">
      <div className="task-name">{task.name}</div>
      <div className="buttons">
        <button onClick={handleUpdateTask}>
          {task.done ? (
            <BsCheckAll className="svg-button" />
          ) : (
            <BsCheckLg className="svg-button" />
          )}
        </button>
        <button onClick={handleDeleteTask}>
          <BiTrash className="svg-button" />
        </button>
      </div>
    </div>
  );
};

export default Task;
