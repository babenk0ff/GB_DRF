import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Navigate} from "react-router-dom";


class LoginFormItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.get_token(this.state.login, this.state.password);
    }

    render() {
        return (
            <div className='form-login-container'>
                {this.props.isAuth() && (
                    <Navigate to='/projects' />
                )}
                <Form className='form-login' onSubmit={event => this.handleSubmit(event)}>
                    <Form.Group className='mb-3' controlId='formBasicUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='username'
                            name='login'
                            placeholder='Enter username'
                            onChange={event => this.handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={event => this.handleChange(event)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Login</Button>
                </Form>
            </div>
        );
    }
}

export default LoginFormItem
