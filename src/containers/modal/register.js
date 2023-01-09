import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal, Row } from 'react-bootstrap';
import StatusMessage from '../../components/StatusMessage';
import { registerReset, register } from '../../actions/register';
import { hideModal, showModal } from '../../actions/modal';

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    handleRegister: data => {
        dispatch(register(data));
    },
    handleClose: () => {
        dispatch(hideModal());
        dispatch(registerReset());
    },
    showLogin: () => {
        dispatch(showModal('LOGIN', {}));
        dispatch(registerReset());
    },
});

class RegisterModal extends Component {

    state = { show: true, username: '', password: '', email: '', checked: true };

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.setState({ show: false });
        }
    }


    isFormValid = () => {
        const { username, password, email, checked } = this.state;

        let isFormValid = true;
        if (!username || !password || !email || !checked) {
            isFormValid = false;
        }
        return isFormValid;
    };

    handleSubmit = () => {
        if (this.isFormValid()) {
            let data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            };
            this.props.handleRegister(data);
        }
    };

    handleClose = () => { this.setState({ show: false }); this.props.handleClose() };
    handleShow = () => this.setState({ show: true });

    showLogin = () => {
        this.handleClose();
        this.props.showLogin();
    }

    render() {
        const {
            isLoading,
            error,
        } = this.props;

        const statusMessage = (
            <StatusMessage
                error={error}
                errorMessage={error || 'Login Error'}
                loading={isLoading}
                loadingMessage={'Registering your account'}
                type="modal"
            />
        );

        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {statusMessage}
                        <Form className="attached fluid segment">
                            <Form.Group className="mb-3">
                                <Form.Label>username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I agree to the s and conditions"
                                    checked={this.state.checked} onChange={e => this.setState({ checked: !this.state.checked })} />
                            </Form.Group>
                        </Form>
                        <Row>
                            <Button
                                disabled={isLoading}
                                onClick={!isLoading ? this.handleSubmit : null}>
                                Register
                            </Button>
                        </Row>

                        <Row>
                            <p>
                                Already signed up?&nbsp;
                                <a className="register-login" onClick={this.showLogin}>
                                    Login
                                </a>
                                .
                            </p>
                        </Row>
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterModal);