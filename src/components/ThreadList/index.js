import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Badge, ButtonGroup, Button, Form, FormControl, InputGroup, Pagination } from 'react-bootstrap';
import StatusMessage from '../StatusMessage';
import './style.scss';
import { VscTriangleUp } from "react-icons/vsc";
import { BsFillEyeFill, BsFillPinFill, BsFillTagsFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import uuid from 'react-uuid'


export default function ThreadList(props) {

    const { isLoading, error, threads, page, switchPage, addFilter, filterStr, isAuthenticated,alterSort,sortType,fetchThreads } = props;
    let { threadCount } = props;

    const curFilters = useRef(filterStr);

    let threadCounter = (page - 1) * 10 + 1;

    useEffect(() => {
        curFilters.current.value = filterStr;
        fetchThreads();
    }, [filterStr,page,sortType])

    // extract filters
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const arr = event.target.value.split(" ");
            let tagArr = [];
            let contentArr = [];
            for (let obj of arr) {
                let cur = obj.split(":");
                if (cur.length == 2 && cur[0] == 'tag') {
                    tagArr.push(cur[1]);
                } else if (obj) {
                    contentArr.push(obj);
                }
            }
            addFilter(tagArr, contentArr);
            switchPage(1);
        }
    }


    // create pagination
    var count = [];
    let cur = 0;
    while (threadCount > 0) {
        const curPage = ++cur;
        count.push(<Pagination.Item key={uuid()} active={curPage == page} style={{ cursor: "pointer" }} onClick={() => switchPage(curPage)}>{curPage}</Pagination.Item>);
        if (!isAuthenticated) {
            break;
        }
        threadCount -= 10;
    }

    const getPagination =
        <Pagination>
            <Pagination.First onClick={() => switchPage(1)} />
            <Pagination.Prev onClick={() => switchPage(Math.max(page - 1, 1))} />
            {count}
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next onClick={() => switchPage(cur)} />
            <Pagination.Last onClick={() => switchPage(Math.min(page + 1, cur))} />
        </Pagination>

    if (error || !threads || isLoading) {
        return (
            <StatusMessage
                error={error || !threads}
                errorClassName="forum-error"
                errorMessage={error}
                loading={isLoading}
                loadingMessage={`We are fetching the forum for you`}
                nothing={threads && threads.length === 0}
                nothingMessage={`No threads to display`}
                nothingClassName="forum-error"
                type="default"
            />
        );
    }

    const sortButton =
        <ButtonGroup>
            <Button onClick={() => alterSort("-view")} active={sortType==="-view"}>Hot</Button>
            <Button onClick={() => alterSort("-pinned")} active={sortType==="-pinned"}>Pinned</Button>
            <Button onClick={() => alterSort("-last_activity")} active={sortType==="-last_activity"}>Newest</Button>
            <Button onClick={() => alterSort("-thumb_up")} active={sortType==="-thumb_up"}>Most Votes</Button>
        </ButtonGroup>

    const clearFilters = () => {
        addFilter([], []);
        switchPage(1);
    }

    const clearButton =
        <Button onClick={clearFilters}>
            <MdClear /> clear filters
        </Button>

    const searchButton =
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">
                <BsFillTagsFill />&nbsp;<Link to={`/tag`} style={{ textDecoration: 'none', color: "#464646", fontWeight: "bold" }}>Tags&nbsp;<Badge pill bg="secondary">{props.tags.length}</Badge></Link>
            </InputGroup.Text>
            <FormControl id="basic-url" aria-describedby="basic-addon3" ref={curFilters} defaultValue={filterStr} onKeyDown={handleKeyDown} placeholder={`separate filters by space`} />
        </InputGroup>

    const threadList = threads.map(thread => {
        let {
            id,
            name,
            pinned,
            creator,
            last_activity_form,
            thumb_up,
            view,
            tags,
            username,
            posts,
            uuid
        } = thread;

        let tagList = tags.slice(0, Math.min(5, tags.length)).map((tag, i) => {
            return <div key={i} style={{ display: "inline-block" }}><Badge bg="secondary" className="badge">{tag}</Badge>&nbsp;</div>
        })

        name = name.length > 57 ? name.substring(0, 55) + '...' : name;

        const onClick = () => {
            props.updateThread(id, { view: view + 1 });
        }

        return (
            <ListGroup.Item key={id} className="thread-list-item border-0">
                <Container>
                    <Row className="thread-list-title">
                        <p style={{ display: "inline-block", float: "left" }}>{threadCounter++}&nbsp;{threadCounter > 10 ? "" : " "}|&nbsp;&nbsp;
                            {pinned ?
                                <BsFillPinFill /> : null}
                            <Link className="thread-link" to={`/thread/${uuid}`} onClick={onClick}>{name}</Link>
                        </p>
                    </Row>
                    <Row className="thread-list-detail">
                        <Col>
                            <div style={{ display: "inline-block", float: "left", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
                                {tagList}
                            </div>
                            <div style={{ display: "inline-block", marginLeft: "0px" }} className='thread-detail-info'><span className="dot"></span>&nbsp;last edit {last_activity_form} by <Link to={`/user/${username}`}><p style={{ display: "inline-block" }} className='thread-detail-creator'>{creator}</p></Link> </div>
                            <p style={{ display: "inline-block", float: "right", color: "#9c9b9c" }}>
                                <BiCommentDetail />&thinsp;
                                {posts}&nbsp;
                                <VscTriangleUp />&thinsp;
                                {thumb_up}&nbsp;
                                <BsFillEyeFill />&thinsp;
                                {view}
                            </p>
                        </Col>
                    </Row>

                </Container>
            </ListGroup.Item>
        );
    });

    return (
        <div className="thread-list">
            <Container>
                <Row style={{ paddingTop: "40px", paddingBottom: "40px", textAlign: "left" }}>
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
                <Row>
                    <Col style={{ paddingLeft: "0px", textAlign: "left", fontWeight: "bold" }}>Posts</Col>
                </Row>
                <Row as="div" className="thread-list-header">
                    <Col className="thread-list-search col-md-6" style={{ paddingLeft: 0, width: "54.166666645%", maxWidth: "54.166666645%" }}>{searchButton}</Col>
                    <Col className="thread-list-clear col-md-1" style={{ paddingLeft: 0, width: "12.499999995%", maxWidth: "12.499999995%" }}>{filterStr ? clearButton : null}</Col>
                    <Col className="thread-list-sort" md={4} style={{ paddingRight: 0 }}>{sortButton}</Col>
                </Row>
                <Row>
                    <Col style={{ padding: "0px" }}>
                        <ListGroup className="forum-list">{threadList}</ListGroup>
                    </Col>
                </Row>
                <Row md={2}>&nbsp;</Row>
                {isAuthenticated ? null :
                    <Row className="d-flex justify-content-center">
                        <Col><Button onClick={props.showLogin} style={{ backgroundColor: "transparent", border: "none", color: "#464646", textDecoration: "underline", paddingRight: "0px", fontWeight: "bold" }}>Login</Button> to view more</Col>
                    </Row>}
                <Row md={2}>&nbsp;</Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        {getPagination}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
