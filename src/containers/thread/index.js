import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Badge, OverlayTrigger, Tooltip, ButtonGroup, Form, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchThread, voteForThread } from '../../actions/thread';
import { createPost, deletePost, editPost, updateCurPost, openPostEditor,voteForPost } from '../../actions/post';
import { refreshToken } from '../../actions/firebase';
import { showModal } from '../../actions/modal'
import { BsFillPersonFill, BsFillPinFill,BsPencil,BsTrash } from "react-icons/bs";
import { MdArrowDropUp, MdArrowDropDown, MdClear } from "react-icons/md";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { VscChevronLeft } from "react-icons/vsc";
import { BiCommentDetail } from "react-icons/bi";
import './style.scss';
import PostEditor from '../../components/PostEditor';

function mapStateToProps(state) {
    return {
        isLoading: state.thread.isLoading,
        threadId: state.thread.id,
        uuid: state.thread.uuid,
        name: state.thread.name,
        username: state.thread.username,
        content: state.thread.content,
        pinned: state.thread.pinned,
        creator: state.thread.creator,
        error: state.thread.error,
        last_activity: state.thread.last_activity,
        thumb_up: state.thread.thumb_up,
        view: state.thread.view,
        tags: state.thread.tags,
        up: state.thread.up,
        down: state.thread.down,
        posts: state.thread.posts,
        edit_id: state.thread.edit_id,
        isAuthenticated: state.auth.isAuthenticated,
        loginUser: state.auth.username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchThread: thread => {
            dispatch(fetchThread(thread));
        },
        createPost: (newPost, uuid) => {
            dispatch(createPost(newPost, uuid));
        },
        deletePost: (id, uuid) => {
            dispatch(deletePost(id, uuid));
        },
        editPost: (id, content, uuid) => {
            dispatch(editPost(id, content, uuid));
        },
        updateCurPost: (posts) => {
            dispatch(updateCurPost(posts));
        },
        showLogin: () => {
            dispatch(showModal('LOGIN', {}));
        },
        openPostEditor: (id) => {
            dispatch(openPostEditor(id));
        },
        refreshToken: () => {
            dispatch(refreshToken());
        },
        voteForThread: (params) => {
            dispatch(voteForThread(params));
        },
        voteForPost: (params) => {
            dispatch(voteForPost(params));
        },
    };
}

let user = null;

class Thread extends Component {


    componentDidMount() {
        const { thread } = this.props.match.params;
        this.props.fetchThread(thread);
    }

    vote = (up,postId) => {
        const { threadId,voteForThread,voteForPost } = this.props;
        const option = up ? "like" : "dislike";
        if (postId) {
            const params = {
                post: postId,
                option: option
            }
            voteForPost(params);
        } else {
            const params = {
                thread: threadId,
                option: option
            }
            voteForThread(params);
        }
    }

    state = { newPost: "", rows: 1, preview: false };

    sortPost = (sortType, reverse) => {
        const sorted = reverse ? [...this.props.posts].sort((a, b) => a[sortType] - b[sortType]) :
            [...this.props.posts].sort((a, b) => b[sortType] - a[sortType]);
        this.props.updateCurPost(sorted);
    }

    render() {
        const {
            threadId,
            uuid,
            isLoading,
            name,
            content,
            pinned,
            creator,
            error,
            last_activity,
            view,
            tags,
            thumb_up,
            up,
            down,
            isAuthenticated,
            showLogin,
            username,
            posts,
            createPost,
            editPost,
            loginUser,
            edit_id,
            openPostEditor
        } = this.props

        let tagList = tags.map((tag, i) => {
            return <div key={i}><Badge bg="secondary">{tag}</Badge>&nbsp;</div>
        })

        const sortButton =
            <ButtonGroup className="post-sort-btn">
                <Button onClick={() => this.sortPost("thumb_up", false)}>Most Votes</Button>
                <Button onClick={() => this.sortPost("created_at", false)}>Newest to Oldest</Button>
                <Button onClick={() => this.sortPost("created_at", true)}>Oldest to Newest</Button>
            </ButtonGroup>

        const postList = this.props.posts.map(post => {
            let {
                id,
                content,
                created_at_natural,
                creator_username,
                creator_name,
                thumb_up,
                like,
                dislike
            } = post;

            return (
                <ListGroup.Item key={id} className="border-0">
                    <Container>
                        <Row>
                            <Col className="post-detail">
                                <BsFillPersonFill style={{ paddingBottom: "2px" }} />&thinsp;<a href={`/user/${creator_username}`}>{creator_name}</a>
                                &nbsp;&nbsp;&nbsp;&nbsp;{created_at_natural}
                            </Col>
                        </Row>
                        <Row style={{ paddingLeft: "18px", marginTop: "10px" }}>
                            <Col>
                                {edit_id == id ? <PostEditor
                                    isAuthenticated={isAuthenticated}
                                    threadId={threadId}
                                    uuid={uuid}
                                    createPost={createPost}
                                    showLogin={showLogin}
                                    content={content}
                                    update={true}
                                    editPost={editPost}
                                    postId={id}
                                /> :
                                    <ReactMarkdown children={content} rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} />}
                            </Col>
                        </Row>
                        <Row style={{ paddingLeft: "18px" }} className="post-action">
                            <Col>
                                <Button style={{ paddingTop: "0px" }}><MdArrowDropUp color={like ? "#696969" : "#C0C0C0"} fontSize="1.5em" onClick={isAuthenticated ? () => this.vote(true,id) : showLogin} /></Button>{thumb_up}
                                <Button style={{ paddingTop: "0px" }}><MdArrowDropDown color={dislike ? "#696969" : "#C0C0C0"} fontSize="1.5em" onClick={isAuthenticated ? () => this.vote(false,id) : showLogin} /></Button>
                                {/* <Button><BsReply color="#C0C0C0" fontSize="1.2em"/>&thinsp;Reply</Button> */}
                                {creator_username === loginUser ?
                                    <Button style={{ fontSize: "15px" }} onClick={() => edit_id == id ? openPostEditor(-1) : openPostEditor(id)}>
                                        {edit_id == id ? <MdClear style={{ marginBottom: "3px" }} /> :
                                            <BsPencil style={{ marginBottom: "3px" }} />}&thinsp;{edit_id == id ? "Cancel Edit" : "Edit"}
                                    </Button>
                                    : null}
                                {creator_username === loginUser ? (<Button style={{ fontSize: "15px" }} onClick={() => this.props.deletePost(id, uuid)}><BsTrash />&thinsp;Delete</Button>) : null}
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
            );
        });

        return (
            <div className="thread-detail">
                <Container className="thread-detail-container">
                    <Row className="thread-detail-header">
                        <Col xs="1" className="justify-content-start">
                            <div><Link to={`/`} style={{ textDecoration: 'none' }}><VscChevronLeft />Back</Link></div>
                            {/* <div onClick={() => this.props.history.goBack()}><VscChevronLeft />Back</div> */}
                        </Col>
                        <Col xs="11" className="justify-content-start text-secondary square border-start" style={{ fontWeight: "bold"}}>
                            {pinned ? <BsFillPinFill /> : null}{name}
                        </Col>
                    </Row>
                    <Row><hr /></Row>
                    <Row>
                        <Col xs="1" className="thread-detail-action">
                            <Row className="justify-content-center">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip>
                                            I've seen this before
                                        </Tooltip>
                                    }
                                >
                                    <Button className={up ? "button-selected" : ""} onClick={isAuthenticated ? () => this.vote(true,null) : showLogin}><MdArrowDropUp /></Button>
                                </OverlayTrigger>
                            </Row>
                            <Row className="justify-content-center">{thumb_up}</Row>
                            <Row className="justify-content-center">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip>
                                            I haven't seen this before
                                        </Tooltip>
                                    }
                                >
                                    <Button className={down ? "button-selected" : ""} onClick={isAuthenticated ? () => this.vote(false,null) : showLogin}><MdArrowDropDown /></Button>
                                </OverlayTrigger></Row>
                        </Col>
                        <Col>
                            <Row style={{ height: "15px" }}>
                                <div className="thread-detail-info"><Link to={`/user/${username}`} style={{ textDecoration: 'none' }}><p className='author'><BsFillPersonFill style={{ marginTop: "-5px" }} /> {creator}</p></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>{last_activity} &nbsp; {view} views</p></div>
                            </Row>
                            <Row style={{ height: "30px" }}>&nbsp;</Row>
                            <Row>
                                <Col xs="12" className="thread-detail-md">
                                    <ReactMarkdown children={content} rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} />
                                </Col>
                            </Row>
                            <Row style={{ height: "10px" }}>&nbsp;</Row>
                            <Row className="justify-content-start">
                                <Col xs="10" className="thread-detail-tags">{tagList}</Col>
                            </Row>
                            <Row>&nbsp;</Row>
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: "#FAFAFA", marginBottom: "10px" }}>
                        <Col style={{ textAlign: "left", paddingTop: "5px" }}><BiCommentDetail /> Comments: {posts.length}</Col>
                        <Col style={{ textAlign: "right" }}>{sortButton}</Col>
                    </Row>
                    <PostEditor
                        isAuthenticated={isAuthenticated}
                        threadId={threadId}
                        uuid={uuid}
                        createPost={createPost}
                        showLogin={showLogin}
                    />
                    <Row>
                        <Col>
                            <ListGroup className="thread-detail-list">{postList}</ListGroup>
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                </Container>
                <Row>&nbsp;</Row>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);