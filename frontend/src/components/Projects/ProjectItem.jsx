import React from 'react';
import {Card, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <Card className="mb-3 card-project">
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    <Stack gap={3} className="mx-auto align-items-start">
                        <Card.Title>{project.name}</Card.Title>
                        <Link className="btn btn-outline-primary"
                            to={`/projects/${project.id}/`}
                            state={project}>Open project</Link>
                    </Stack>
                    <Button
                        onClick={() => deleteProject(project.id)}
                        variant="outline-danger" className="ms-auto">Delete
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default ProjectItem;