import React, {Fragment, useState} from 'react';
import ProjectItem from "./ProjectItem";
import {Link} from "react-router-dom";
import {FloatingLabel, Stack} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ProjectList = ({projects, deleteProject}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredList = projects.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <Fragment>
            <h3 className="mb-3">Projects list</h3>
            <Stack direction="horizontal" gap={3} className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search for project..."
                    name="searchForm"
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                />
                <div className="vr"/>
                <Link className="btn btn-primary text-nowrap" to="/projects/create">Create project</Link>
            </Stack>
            {filteredList.length > 0 && (
                <div className="cards-container">
                    {filteredList.map((project) => <ProjectItem
                        key={project.name}
                        project={project}
                        deleteProject={deleteProject}/>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default ProjectList;
