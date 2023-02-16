import React, {Fragment} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Stack} from "react-bootstrap";
import {Navigate} from "react-router-dom";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props.projects[0]?.id,
            user: props.users.filter(user => user.username === props.username)[0]?.id,
            body: '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.createTodo(
            this.state.project,
            this.state.body,
            this.state.user
        );
    }

    render() {
        return (
            <Fragment>
                <Form
                    className="border rounded p-3 mb-3"
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <Form.Group className="mb-3" controlId="formProject">
                        <Stack>
                            <Form.Label>Select project</Form.Label>
                            <Form.Select
                                name="project"
                                onChange={event => this.handleChange(event)}>
                                {this.props.projects.map(item => <option key={item.name}
                                                                         value={item.id}>{item.name}</option>)}
                            </Form.Select>
                        </Stack>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRepoLink">
                        <Form.Label>Task content</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            placeholder="Enter the content of the task"
                            name="body"
                            value={this.state.repoLink}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="ms-auto">Create ToDo</Button>
                </Form>
            </Fragment>
        );
    }
}

export default TodoForm;
