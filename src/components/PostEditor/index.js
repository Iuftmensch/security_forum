import React, { useState } from 'react';
import './style.scss'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

function PostEditor(props) {
    const {
        isAuthenticated,
        threadId,
        uuid,
        createPost,
        showLogin,
        content,
        update,
        editPost,
        postId
    } = props;
    const [preview, setPreview] = useState(false);
    const [rows, setRows] = useState(content ? content.split("\n").length : 0);
    const [newPost, setNewPost] = useState(content ? content : "");

    const updateNewPost = (content) => {
        const textRowCount = content ? content.split("\n").length : 0
        setRows(textRowCount);
        setNewPost(content);
    }

    const onSubmit = () => {
        if (!newPost) {
            window.alert("Comment can't be null!");
            return;
        }
        if (update) {
            editPost(postId, {content:newPost}, uuid);
        } else {
            let newPostContent = {
                thread_id: threadId,
                content: newPost,
            };
            createPost(newPostContent,uuid);
        }
        setRows(1);
        setNewPost("");
    };

    return (
        <Container className="post-editor-container">
            <Row style={{ minHeight: "10vh" }} className={preview ? "preview-div" : null}>
                <Col>
                    {preview ? <ReactMarkdown children={newPost} rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} /> :
                        <Form.Control as="textarea" placeholder='Leave your comment here.(Markdown is supported)'
                            rows={rows} value={newPost} onChange={(e) => updateNewPost(e.target.value)} />}
                </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
                <Col style={{ textAlign: "right", paddingRight: "0px" }}>
                    <Button className="preview-btn" onClick={() => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</Button>
                    <Button className="post-btn" onClick={isAuthenticated ? onSubmit : showLogin}>{update ? "Update" : "Post"}</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PostEditor;