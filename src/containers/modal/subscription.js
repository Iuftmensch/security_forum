import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Offcanvas, Form, Button, FloatingLabel, Container, Col, Row } from 'react-bootstrap';
import StatusMessage from '../../components/StatusMessage';
import { hideModal, showModal } from '../../actions/modal';
import { subscibe, subscribeReset } from '../../actions/subscribe';
import './style.scss';

const mapStateToProps = state => ({
    isLoading: state.subscribe.isLoading,
    error: state.subscribe.error,
    success: state.subscribe.success,
});

const mapDispatchToProps = dispatch => ({
    handleClose: () => {
        dispatch(hideModal());
    },
    subscibe: (data) => {
        dispatch(subscibe(data));
    },
    subscribeReset: () => {
        dispatch(subscribeReset());
    },
});

class SubscriptionModal extends Component {

    state = { show: true, email: '' };


    isFormValid = () => {
        const { email } = this.state;

        let isFormValid = true;
        if (!email) {
            isFormValid = false;
            window.alert("Please enter valid email address!");
        }
        return isFormValid;
    };

    handleSubmit = () => {
        if (this.isFormValid()) {
            this.props.subscibe({ email: this.state.email });
        }
    };

    handleClose = () => { this.setState({ show: false }); this.props.handleClose(); this.props.subscribeReset() };
    handleShow = () => this.setState({ show: true });

    render() {
        const {
            isLoading,
            error,
            success
        } = this.props;

        const statusMessage = (
            <StatusMessage
                error={error}
                errorMessage={error || 'Subscription Error'}
                loading={isLoading}
                loadingMessage={'Subscribing...'}
                success={success}
                successMessage={`You've successfully subscribed to our News Letter!`}
                type="modal"
            />
        );

        return (
            <Offcanvas className="subscibe-modal" show={this.state.show} onHide={this.handleClose} placement={"bottom"} scroll={true} style={{ minHeight: "300px" }}>
                <Offcanvas.Body>
                    <Container>
                        <Row style={{ fontSize: "20px" }}><Col><img src='https://s1.ax1x.com/2022/07/08/j0TrBF.png' style={{width:"80px"}}/>Subscribe to receive weekly report of Noise Total</Col></Row>
                        <Row style={{alignItems:"center"}}>
                            <Col md={3}>&nbsp;</Col>
                            <Col md={5}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Enter Your Emial Address"
                                >
                                    <Form.Control type="email" placeholder="Enter Your Emial Address" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} disabled={isLoading} />
                                </FloatingLabel>

                            </Col>
                            <Col md={4} style={{ textAlign: "left" }}>
                                <Button type="submit" onClick={this.handleSubmit}>
                                    Subscribe
                                </Button>
                            </Col>
                        </Row>
                        <Row className="subs-status">
                            <Col md={3}></Col>
                            <Col md={5}>{statusMessage}</Col>
                            <Col md={4}></Col>
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
)(SubscriptionModal);