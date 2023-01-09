import React, { Component } from 'react';
import './style.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { MdOpenInNew } from "react-icons/md";

class Footer extends Component {
    render() {
        return (
            <Container className="footer-container">
                <Row style={{ paddingTop: "30px", paddingBottom: "30px", textAlign: "left" }}>
                    <Col style={{ paddingLeft: "0px" }}>
                        <span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                    </Col>
                </Row>
                <Row style={{ fontWeight: "bold", paddingBottom: "10px" }}>About Noise Total</Row>
                <Row>Noise Total is a comunnity aiming at discovering and publishing accurate false positive indications
                    in security detections.
                </Row>
                <Row style={{ fontWeight: "bold", paddingBottom: "10px", paddingTop: "30px" }}>Elsewhere</Row>
                <Row><Col style={{ paddingLeft: "0px" }}><a href='/guide'>Guidelines</a>, <a href='/about'>About</a>, <a href='/release'>Release Notes</a>,
                    &thinsp;<a href='https://twitter.com/NoiseTotal'>Twitter<MdOpenInNew /></a>,
                    &thinsp;<a href='https://join.slack.com/t/slack-9jv7957/shared_invite/zt-1c18lrcmp-lmE1YPH626Dx_2v1ZGxvyQ'>Slack<MdOpenInNew /></a>
                </Col>
                </Row>
                <Row style={{ paddingTop:"10px" }}>
                    <Col style={{ paddingLeft: "0px" }}>
                        <text>Sponsored by </text>
                        <a href="https://www.dtonomy.com/"><img src='https://s1.ax1x.com/2022/08/07/vKCjjP.png' style={{ width: "80px" }} /></a>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "5px", paddingBottom: "15px", textAlign: "left" }}>
                    <Col style={{ paddingLeft: "0px"}}>
                        <span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                        &nbsp;<span className="dot"></span>&nbsp;
                    </Col>
                </Row>
                <Row style={{ alignItems: "center", paddingTop:"15px" }}>
                    <Col style={{paddingLeft:"0px"}}>
                        © 2022 · <a href='/release'>Release 0.1.1</a>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                        <img src='https://s1.ax1x.com/2022/07/08/j0TrBF.png' style={{ width: "70px" }} />
                    </Col>
                </Row>
                <Row>&nbsp;</Row>
                
                <Row>&nbsp;</Row>
            </Container>
        );
    }
}

export default Footer;