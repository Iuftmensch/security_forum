import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Offcanvas, Container, Col, Row } from 'react-bootstrap';
import StatusMessage from '../../components/StatusMessage';
import { loginReset, login } from '../../actions/auth';
import { hideModal, showModal } from '../../actions/modal';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FirebaseAuth } from "react-firebaseui";

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    handleLogin: (token) => {
        dispatch(login(token));
    },
    handleClose: () => {
        dispatch(hideModal());
        dispatch(loginReset());
    },
    showRegister: () => {
        dispatch(showModal('REGISTER', {}));
        dispatch(loginReset());
    },
});

const firebaseConfig = {
    apiKey: "AIzaSyCouwkVAxvVw4g5qg0d73eRpLVhC94KRYo",
    authDomain: "dtonomy-register.firebaseapp.com",
    projectId: "dtonomy-register",
    storageBucket: "dtonomy-register.appspot.com",
    messagingSenderId: "494605362069",
    appId: "1:494605362069:web:e43f070b187000f01f8c9c",
    measurementId: "G-HHJMGKG2FZ"
};

export const app = firebase.initializeApp(firebaseConfig);

const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: '/info',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            fullLabel: 'Continue with Google'
        },
        {
            provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
            fullLabel: 'Continue with GitHub'
        },
        // {
        //     provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //     fullLabel: 'Continue with Twitter'
        // },
        {
            provider: 'microsoft.com',
            fullLabel: 'Continue with Microsoft'
        },
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    },
};

class LoginModal extends Component {

    state = { show: true, email: '', password: '' };

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.setState({ show: false });
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken().then(token => this.props.handleLogin(token))
            }
        });
    }

    isFormValid = () => {
        const { email, password } = this.state;

        let isFormValid = true;
        if (!email || !password) {
            isFormValid = false;
        }
        return isFormValid;
    };

    handleSubmit = () => {
        if (this.isFormValid()) {
            this.props.handleLogin(this.state.email, this.state.password);
        }
    };

    handleClose = () => { this.setState({ show: false }); this.props.handleClose() };
    handleShow = () => this.setState({ show: true });

    showRegister = () => {
        this.handleClose();
        this.props.showRegister();
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
                loadingMessage={'Signing in'}
                type="modal"
            />
        );
        return (
            <Offcanvas className="login-modal" show={this.state.show} onHide={this.handleClose} placement={"end"} scroll={true} style={{ minHeight: "300px" }}>
                <Offcanvas.Body>
                    {/* {statusMessage} */}
                    <Container>
                        <Row className="justify-content-center" style={{ fontWeight: "bold" }}>Sign In</Row>
                        <Row><FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /></Row>
                        <Row className="justify-content-center" style={{ color: "#C1C1C1" }}><Col sm={9} style={{textAlign:"left",marginLeft:"12px"}}>*Sign in to unlock all accesses! By continuing you agree us to create Noise Total account for you.</Col>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);