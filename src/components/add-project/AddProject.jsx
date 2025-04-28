import "./addProject.css";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { addProject } from "../../redux/slices/projects/projects.async.thunks";
import { ToastContainer } from "react-toastify";

const AddProject = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(10);
  const [description, setDescription] = useState("");

  const goBack = () => {
    navigate("/projects");
  };

  const createProject = (data) => {
    dispatch(addProject({ user, project: data }));
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="add-project">
      <div className="back">
        <button id="button" className="blue-button" onClick={goBack}>
          <BiArrowBack /> Go back
        </button>
      </div>
      <form className="project" onSubmit={handleSubmit(createProject)}>
        <div className="headers">
          <label htmlFor="name">
            {"Project's name"}
            <input
              {...register("name")}
              id="name"
              type="text"
              className="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </label>
          <label htmlFor="priority">
            {"Project's Priority (0 - 10)"}
            <input
              {...register("priority")}
              id="priority"
              type="number"
              className="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Enter priority"
              max={10}
              min={0}
            />
          </label>
        </div>
        <hr />
        <label htmlFor="description" className="description-label">
          Here goes the description, feel free to use Markdown
          <TextareaAutosize
            {...register("description")}
            id="description"
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="submit" type="submit">
          Create
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProject;
