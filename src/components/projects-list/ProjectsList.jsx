import { useDispatch, useSelector } from "react-redux";
import "./projectsList.css";
import { useEffect } from "react";
import ProjectCard from "./components/project-card/ProjectCard";
import { MdAdd } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import { fetchProjects } from "@/redux/slices/projects/projects.async.thunks.js";
import { useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProjects = async () => {
    dispatch(fetchProjects(user));
  };

  useEffect(() => {
    getProjects();

    () => toast.dismiss();
  }, []);

  return (
    <div className="projects-list">
      <div className="project-cards">
        {projects.list?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="add">
        <button
          onClick={() => navigate("/addProject")}
          className="add-project-button"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Add a project"
        >
          <MdAdd />
        </button>
        <Tooltip
          id="my-tooltip"
          place="bottom"
          className="tooltip"
          classNameArrow="tooltip-arrow"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProjectsList;
