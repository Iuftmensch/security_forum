import React, { Component } from 'react';
import './style.scss';
import { Container, Row, Col, Badge } from 'react-bootstrap';

class Release extends Component {
    render() {
        return (
            <Container className="release-container">
                <Row style={{ fontWeight: "bold" }}><Col>Release Notes</Col></Row>
                {/* version */}
                <Row style={{paddingTop:"40px",paddingLeft:"0px"}}>
                    <Col md={2} style={{paddingLeft:"0px"}}>June 30, 2022</Col>
                    <Col md={10} style={{fontWeight:"bold"}}>Release 0.1.1</Col>
                </Row>
                <Row style={{paddingBottom:"20px"}}>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}>More interaction.</Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Comment on each post.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Vote for each comment.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col  md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Authentication token expired too soon for some users.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col  md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Relocate to previous page when going back to home page.
                    </Col>
                </Row>
                {/* version */}
                <Row style={{paddingTop:"40px",paddingLeft:"0px"}}>
                    <Col md={2} style={{paddingLeft:"0px"}}>June 23, 2022</Col>
                    <Col md={10} style={{fontWeight:"bold"}}>Release 0.1.0</Col>
                </Row>
                <Row style={{paddingBottom:"20px"}}>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}>&#x1F95E; A big rewrite of UI.</Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Subscribe News Letter.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Tag sorter.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Image uploader on contribution page.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col  md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Highlight of codeblock on thread detail page.
                    </Col>
                </Row>
                {/* version */}
                <Row style={{paddingTop:"40px"}}>
                    <Col md={2} style={{paddingLeft:"0px"}}>Jun 18, 2022</Col>
                    <Col md={10} style={{fontWeight:"bold"}}>Release 0.0.3</Col>
                </Row>
                <Row style={{paddingBottom:"20px"}}>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}>&#x1F950; Focus on user profile.</Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        User public detail page showing contribution distributions.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Member can now manage their posts, link their github or/and twitter account on account detail page.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Rendering of special format on thread detail page.
                    </Col>
                </Row>
                {/* version */}
                <Row style={{paddingTop:"40px"}}>
                    <Col md={2} style={{paddingLeft:"0px"}}>Jun 13, 2022</Col>
                    <Col md={10} style={{fontWeight:"bold"}}>Release 0.0.2</Col>
                </Row>
                <Row style={{paddingBottom:"20px"}}>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}>Still a feedback week.</Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Disorder on home page and thread detail page.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Token expired too soon after user login.
                    </Col>
                </Row>
                {/* version */}
                <Row style={{paddingTop:"40px"}}>
                    <Col md={2} style={{paddingLeft:"0px"}}>Jun 8, 2022</Col>
                    <Col md={10}style={{fontWeight:"bold"}}>Release 0.0.1</Col>
                </Row>
                <Row style={{paddingBottom:"20px"}}>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}>It's a feedback week.</Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Default template on contribute page as the reference for memeber.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        User can now search threads using tag name as well as key words.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Removed redundant attributes of post like 'confidence'.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='secondary'>FIXED</Badge>&nbsp;
                        Authentication issue when login.
                    </Col>
                </Row>
                {/* version */}
                <Row style={{paddingTop:"40px"}}>
                    <Col md={2} style={{paddingLeft:"0px"}}>Jun 2, 2022</Col>
                    <Col md={10} style={{fontWeight:"bold"}}>Release 0.0.0</Col>
                </Row>
                <Row style={{paddingBottom:"20px"}}>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}>Noise Total Launched.</Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Contribute to forum and vote for post.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Sign up and sign in using social accounts.
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={10}><span className="dot"></span>&nbsp;<Badge bg='success'>NEW</Badge>&nbsp;
                        Sort threads and search threads by tag name.
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Release;