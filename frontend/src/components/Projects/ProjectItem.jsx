import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <Card className="mb-2 card-project">
            <Card.Body>
                <Card.Text>{project.name}</Card.Text>
                <Link className="btn btn-primary" to={project.url}>Open project</Link>
            </Card.Body>
        </Card>
    );
};

export default ProjectItem;