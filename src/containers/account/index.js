import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Tab, Nav, Button, Form, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ThreadTable from '../../components/ThreadTable';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { updateProfile } from '../../actions/auth';
import { fetchUserProfile } from '../../actions/userprofile';
import { BsGithub, BsTwitter, BsFillQuestionCircleFill } from "react-icons/bs";
import './style.scss';


function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        name: state.auth.name,
        authusername: state.auth.username,
        email: state.auth.email,
        twitter: state.auth.twitter,
        github: state.auth.github,
        date_joined: state.auth.date_joined,
        threads: state.userProfile.threads,
        likes: state.userProfile.likes,
        dislikes: state.userProfile.dislikes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateProfile: newProfile => {
            dispatch(updateProfile(newProfile));
        },
        fetchUserProfile: username => {
            dispatch(fetchUserProfile(username));
        },
    };
}

class Account extends Component {

    componentDidMount() {
        const { username } = this.props.match.params;
        const { isAuthenticated, authusername,fetchUserProfile} = this.props;
        if(isAuthenticated && username===authusername){
            fetchUserProfile(username);
        }
    }

    state = { name: this.props.name, curThreads: this.props.threads, type: "Posted" };


    render() {

        const { threads, name, email, twitter, github, date_joined, updateProfile, isAuthenticated, authusername, likes, dislikes } = this.props;

        const { username } = this.props.match.params;

        if (!isAuthenticated || username != authusername) {
            return <div>You are not permitted to view this page!</div>
        }

        const updateName = () => {
            const name = this.state.name;
            if (!name) {
                alert("Name couldn't be empty!");
            } else {
                updateProfile({ first_name: name });
            }
        }

        const linkTwitter = () => {
            firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
                .then(function (userCredential) {
                    const username = userCredential.additionalUserInfo.profile.screen_name;
                    updateProfile({ profile: { twitter: `https://twitter.com/${username}` } })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        const linkGithub = () => {
            firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
                .then(function (userCredential) {
                    const url = userCredential.additionalUserInfo.profile.html_url;
                    updateProfile({ profile: { github: url } })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        return (
            <Container className="tab-container">
                <Tab.Container defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first"><p>Account Information</p></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">My Posts</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Form>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={2}>
                                                Username
                                            </Form.Label>
                                            <Col sm={4}>
                                                <Form.Control value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                            </Col>
                                            <Col sm={2}>
                                                <Button onClick={updateName} className="update-btn">update</Button>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={2}>
                                                Email
                                            </Form.Label>
                                            <Col sm={10}>
                                                {email}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={2}>
                                                Date Joined
                                            </Form.Label>
                                            <Col sm={10}>
                                                {date_joined}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={2}>
                                                GitHub
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip>
                                                            By linking you agree to show your github on your public user page.
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button variant="outline-none" className='account-question'><BsFillQuestionCircleFill /></Button>
                                                </OverlayTrigger>
                                            </Form.Label>
                                            <Col sm={10}>
                                                {github ? <a href={github}><BsGithub /></a> :
                                                    <Button onClick={linkGithub} style={{ border: "none", background: "linear-gradient(to right, #868f96 0%, #211F1F 100%)" }}><BsGithub /> Link your Github</Button>}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={2}>
                                                Twitter
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip>
                                                            By linking you agree to show your twitter on your public user page.
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button variant="outline-none" className='account-question'><BsFillQuestionCircleFill /></Button>
                                                </OverlayTrigger>
                                            </Form.Label>
                                            <Col sm={10}>
                                                {twitter ? <a href={twitter}><BsTwitter /></a> :
                                                    <Button onClick={linkTwitter} style={{ border: "none", background: "linear-gradient(to right, #868f96 0%, #211F1F 100%)" }}><BsTwitter /> Link your Twitter</Button>}
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div style={{ textAlign: "left" }}>
                                        <Dropdown>
                                            <Dropdown.Toggle>
                                                {this.state.type}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { this.setState({ type: "Posted", curThreads: threads }) }}>Posted</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { this.setState({ type: "Vote up", curThreads: likes }) }}>Voted up</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { this.setState({ type: "Vote down", curThreads: dislikes }) }}>Voted down</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {this.state.curThreads.length == 0 ? <div style={{ textAlign: "center" }}>No thread</div> : <ThreadTable threads={this.state.curThreads} />}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);