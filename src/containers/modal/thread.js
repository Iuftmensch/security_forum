import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Modal, Row, Col, Container } from 'react-bootstrap';
import { registerReset, register } from '../../actions/register';
import { hideModal } from '../../actions/modal';
import { createThread, createThreadSave, updateThreadTags, resetNewThread } from '../../actions/thread';
import SimpleMDE from "react-simplemde-editor";
import TagSelector from '../../components/TagSelector';
import { FaRegPaperPlane } from "react-icons/fa";
import StatusMessage from '../../components/StatusMessage';
import './style.scss';
import axios from 'axios';
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    tags: state.home.tags,
    newThreadLoading: state.home.newThreadLoading,
    newThreadSuccess: state.home.newThreadSuccess,
    newThreadName: state.home.newThreadName,
    newThreadContent: state.home.newThreadContent,
    newThreadId: state.home.newThreadId,
    newThreadTags: state.home.newThreadTags,
    newThreadError: state.home.newThreadError,
    newThreadShow: state.home.newThreadShow,
});

const mapDispatchToProps = dispatch => ({
    handleClose: () => {
        dispatch(hideModal());
        dispatch(registerReset());
    },
    createThread: newThread => {
        dispatch(createThread(newThread));
    },
    createThreadSave: newThread => {
        dispatch(createThreadSave(newThread));
    },
    updateThreadTags: tags => {
        dispatch(updateThreadTags(tags));
    },
    resetNewThread: () => {
        dispatch(resetNewThread());
    },
});


let myInterval = null;

const imageUpload = async (image, onSuccess, onError) => {

    try {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'grvdfxdq'); //replace 'grvdfxdq' with your own preset_name
        const res = await axios.post('https://api.cloudinary.com/v1_1/dbbudrkak/image/upload', data); //replace 'dbbudrkak' with your own username
        const { secure_url } = res.data;
        onSuccess(secure_url)
    } catch (error) {
        console.error(error)
    }
}


const editorOptions = {
    spellChecker: false,
    showIcons: ["bold", "strikethrough", "table", "code", "upload-image"],
    hideIcons: ["image", "quote", "fullscreen", "side-by-side"],
    // img upload
    uploadImage: true,
    imageUploadFunction: imageUpload,
    //preview
    previewRender(text) {
        return ReactDOMServer.renderToString(
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {text}
            </ReactMarkdown>
        );
    },
}

let user = null;

class ThreadModal extends Component {

    state = {
        show: true, sliderValue: 60, name: this.props.newThreadName, content: this.props.newThreadContent,
        timeLeft: 0
    };

    handleClose = () => {
        let newThread = {
            name: this.state.name,
            content: this.state.content,
        };
        this.props.createThreadSave(newThread);
        this.setState({ show: false });
        this.props.handleClose();
    };

    handleShow = () => this.setState({ show: true });

    handleEditorChange = (value) => {
        this.setState({ content: value });
    }

    isFormValid = () => {
        const { name, content } = this.state;
        return name && content;
    };


    TriggerTimer = (targetTimeInSeconds = 10) => {
        const finalTime = +new Date() + targetTimeInSeconds * 1000; // set the redirecting time
        myInterval = setInterval(() => (//refresh every second
            this.calculateTimeLeft(finalTime), 1000
        ))
    }

    calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date()
        if (difference >= 0) {
            this.setState({ timeLeft: Math.round(difference / 1000) })
        }
    }

    handleSubmit = () => {
        if (!this.isFormValid()) {
            alert("Title and Content are Mandatory!")
            return;
        }
        let newThread = {
            name: this.state.name,
            content: this.state.content,
            tags: this.props.newThreadTags
        };
        this.setState({ name: "", content: "" });
        this.props.updateThreadTags([]);
        this.props.createThread(newThread);
        this.TriggerTimer();
        setTimeout(() => {
            this.props.handleClose();
            this.props.resetNewThread();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(myInterval);
    }

    render() {
        const {
            isLoading,
            error,
            newThreadSuccess,
            handleClose,
            resetNewThread
        } = this.props;

        const successMessage =
            <Container>
                <Row style={{ height: window.innerHeight * 0.3 }}></Row>
                <Row className="d-flex justify-content-md-center">Congratulations! You've successfully created new thread.</Row>
                <Row className="d-flex justify-content-md-center">Please give us up to 24 hours to review and approve your thread.</Row>
                <Row className="thread-modal-timer"><div>You'll be redirected to home page in {this.state.timeLeft} seconds.<Link to={'/'} onClick={() => { handleClose(); resetNewThread(); }}>Redirect me now</Link></div></Row>
            </Container>

        return (
            <Modal show={this.state.show} fullscreen={true} onHide={this.handleClose} animation={false}>
                {newThreadSuccess ? successMessage :
                    <Modal.Body className="thread-modal-body">
                        <Form className="thread-modal-form">
                            <Form.Group as={Row} className="thread-modal-form-line1">
                                <Col md="7">
                                    <Form.Control type="text" placeholder="Enter topic title" onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
                                </Col>
                                <Col md="5" className="d-flex justify-content-md-end">
                                    <Button onClick={this.handleClose} className="thread-modal-close-btn">Close</Button>
                                    <Button onClick={this.handleSubmit}>Post&nbsp;<FaRegPaperPlane /></Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="thread-modal-form-line2">
                                <Col md="7">
                                    <TagSelector tags={this.props.tags} newThreadTags={this.props.newThreadTags} updateThreadTags={this.props.updateThreadTags} />
                                </Col>
                            </Form.Group>
                        </Form>
                        <SimpleMDE className="editor" onChange={this.handleEditorChange} value={this.state.content} options={editorOptions} />
                    </Modal.Body>}
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadModal);