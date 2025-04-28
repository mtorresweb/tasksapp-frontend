import "./projectCard.css";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject } from "@/redux/slices/selected-project/selectedProject.slice";
import { useEffect, useState } from "react";
import { removeProject } from "../../../../redux/slices/projects/projects.async.thunks";

const ProjectCard = ({ project }) => {
  const selectedProject = useSelector((state) => state.selectedProject);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [route, setRoute] = useState("");

  const handleSeeProject = () => {
    dispatch(setSelectedProject(project));
    setRoute("/project");
  };

  useEffect(() => {
    if (selectedProject.id && route) {
      navigate(route);
    }
  }, [route, selectedProject]);

  const handleDeleteProject = async () => {
    dispatch(removeProject({ user, project }));
  };

  const handleUpdateProject = () => {
    dispatch(setSelectedProject(project));
    setRoute("/editProject");
  };

  return (
    <div className="project-card">
      <div className="top">
        <div className="priority">
          Priority: <span className="priority-number">{project.priority}</span>
        </div>
        <div className="buttons">
          <Link className="link" onClick={handleUpdateProject}>
            <BiEdit className="svg-button" />
          </Link>
          <Link className="link">
            <BiTrash className="svg-button" onClick={handleDeleteProject} />
          </Link>
        </div>
      </div>
      <div className="content" onClick={handleSeeProject}>
        <p className="name">{project.name}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
