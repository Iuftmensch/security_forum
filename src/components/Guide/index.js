import React, { Component } from 'react';
import './style.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { MdOpenInNew } from "react-icons/md";

class Guide extends Component {
    render() {

        const {
            username,
            isAuthenticated,
            showLogin,
            showSubscription
        } = this.props;

        return (
            <Container className="guide-container">
                <Row style={{ fontWeight: "bold", paddingBottom: "10px" }}>Guidelines</Row>
                <Row>These guidelines are written to offer simple example of contribution and a perspective into what Noise Total values.</Row>
                <Row style={{ fontWeight: "bold", paddingBottom: "10px", paddingTop: "30px" }}>Wanna Contribute?</Row>
                <Row>Nosie Total welcomes sharing of false positive detected. Below guidelines will help facilitate you to make a clear and comprehensive
                    contribution to our community.
                </Row>
                <Row style={{ fontWeight: "bold", paddingBottom: "10px", paddingTop: "30px" }}>1. How to write Post</Row>
                <Row><Col>
                    Considering more flexibility and convenience, we encourage you to use Markdown for your post.
                    Here's <a href="https://www.markdownguide.org/">markdown tutorial<MdOpenInNew /></a>.
                    We also prepare the basic template for your reference, feel free to edit it.
                    Please give us up to 24 hours to review your post and publish it.
                </Col></Row>
                <Row style={{ fontWeight: "bold", paddingBottom: "10px", paddingTop: "30px" }}>2. Link your Twitter or Github</Row>
                <Row>
                    <Col>Link your social accounts via <a onClick={isAuthenticated?null:showLogin} href={isAuthenticated?`/account/${username}`:null}>Account Details -&gt; Account Information</a> to share more false positive findings!</Col>
                </Row>
                <Row style={{ fontWeight: "bold", paddingBottom: "10px", paddingTop: "30px" }}>3. Vote for and comment on posts</Row>
                <Row>
                    Vote up for the false positive indications you've seen before and vice versa. Share your thoughts under each post.
                </Row>
                <Row style={{ fontWeight: "bold", paddingBottom: "10px", paddingTop: "30px" }}>4. Subscribtion</Row>
                <Row>
                    <Col><a onClick={showSubscription}>Join our mail list</a> to receive weekly report on false positive!</Col>
                </Row>
            </Container>
        );
    }
}

export default Guide;