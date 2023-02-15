import React, {Fragment} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repoLink: '',
            // users: [],
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createProject(this.state.name, this.state.repoLink)
    }

    render() {
        return (
            <Fragment>
                <Form className="border rounded p-3 mb-3" onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Group className="mb-3" controlId="formProjectName">
                        <Form.Label>Project name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter project name"
                            name="name"
                            value={this.state.name}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRepoLink">
                        <Form.Label>Repository link</Form.Label>
                        <Form.Control
                            required
                            type="url"
                            placeholder="Enter repository link"
                            name="repoLink"
                            value={this.state.repoLink}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="ms-auto">Create project</Button>
                </Form>
            </Fragment>
        );
    }
}

export default ProjectForm;
