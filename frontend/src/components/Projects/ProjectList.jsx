import React from 'react';
import ProjectItem from "./ProjectItem";

const ProjectList = ({projects}) => {
    return (
        <div className="cards-container">
            {projects.map((project) => <ProjectItem key={project.name} project={project}/>)}
        </div>
    );
};

export default ProjectList;