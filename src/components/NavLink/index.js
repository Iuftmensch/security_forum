import React, { Component } from 'react';
import { Nav, Navbar, Container, NavItem, NavDropdown, Row, Col, Button, Carousel } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import './style.scss';
import {Link} from 'react-router-dom';


class NavLink extends Component {

    render() {

        const {
            isAuthenticated,
            username,
            name,
            isLoading,
            showLogin,
            showSubscription,
            showThreadModal,
            logout,
            setKey,
            NavKey,
            hot
        } = this.props;

        return (
            <div>
                <Row className="header-msg-bar"><Col>
                    <Carousel controls={false} indicators={false} interval={4000} slide={false}>
                        {/* <Carousel.Item>
                            💡 Today's Hottest: <Link to={`/thread/${hot.id}`}>{hot.name}</Link>
                        </Carousel.Item> */}
                        <Carousel.Item>
                            receive weekly report | <a onClick={showSubscription} style={{textDecoration:"underline"}}>Join Mail List</a>
                        </Carousel.Item>
                    </Carousel>
                </Col></Row>
                <Container className="header-container">
                    <Row>
                        <Col md={3}><a href={`/`}><img src="https://s1.ax1x.com/2022/07/01/jM05nS.png" /></a></Col>
                        <Col md={9}>&nbsp;</Col>
                    </Row>
                    <Row style={{ paddingTop: "10px", height: "30px" }}>
                        <Col className="header-title"><a href={`/`}>Noise Total</a></Col>
                        <Col className="header-name"> {isAuthenticated ? <p>Hi, {name}!</p> : null}</Col>
                    </Row>
                    <Row style={{ alignItems: "center" }}>
                        <Col className="header-intro">Collective intelligence on false positives in security detections.</Col>
                        <Col className="header-button">
                            <Button onClick={isAuthenticated ? showThreadModal : showLogin} className="contrib-btn">
                                <AiOutlinePlus style={{ marginTop: "-3px" }} />
                                Contribute
                            </Button>
                            &nbsp;<span className="dot"></span>&nbsp;
                            {isAuthenticated ?
                                <p>
                                    <a href={`/account/${username}`}>Account Detail</a>
                                    &nbsp;<span className="dot"></span>&nbsp;
                                    <a onClick={logout}>Log Out</a>
                                </p>
                                : <a onClick={showLogin}>Sign In</a>}</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default NavLink;