import React, { useRef, createRef } from 'react';
import { ListGroup, Badge, Button, Row, Col, Container, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { VscChevronLeft } from "react-icons/vsc";
import { Link } from 'react-router-dom';

function TagList(props) {

    const history = useHistory();

    const charRef = useRef([]);

    const onClick = (tagName) => {
        props.addFilter([tagName], []);
        history.push('/');
    }

    if (charRef.current.length !== 26) {
        charRef.current = Array(26)
            .fill()
            .map((_, i) => charRef.current[i] || createRef());
    }


    let prevChar = '0';

    const tagList = props.tags.sort((a, b) => a.name.localeCompare(b.name)).map(tag => {
        let flag = false;
        const curChar = tag.name.toLowerCase().charAt(0);
        if (curChar !== prevChar) {
            prevChar = curChar;
            flag = true;
        }
        return (
            <ListGroup.Item key={tag.id} ref={flag ? charRef.current[curChar.charCodeAt(0) - 97] : null} className="justify-content-start tag-group" >
                <Row className="tag-row">
                    <Col className="d-flex justify-content-start"><Badge bg="secondary" style={{ cursor: "pointer" }} onClick={() => onClick(tag.name)}>{tag.name}</Badge></Col>
                    <Col className="d-flex justify-content-end"><div onClick={() => onClick(tag.name)} style={{ cursor: "pointer" }}>{tag.thread_count} security {tag.thread_count == 1 ? "post" : "posts"} related to this tag</div></Col>
                </Row>
            </ListGroup.Item>
        )
    })

    const executeScroll = (i) => {
        if (!charRef.current[i].current) {
            return;
        }
        charRef.current[i].current.scrollIntoView({ behavior: "smooth" });
    }

    let buttonList = [];
    let i = 0;

    while (i < 26) {
        const temp = i;
        buttonList.push(<Button variant="secondary" onClick={() => executeScroll(temp)} key={i}>{String.fromCharCode(65 + i)}</Button>)
        i++;
    }

    return (
        <Container className="taglist-container">
            <Row className="justify-content-left tag-list-header">
                <Col><Link to={`/`} style={{ textDecoration: 'none', color: "black" }}><VscChevronLeft />Back</Link></Col>
            </Row>
            <Row>
                <Col className="tag-btn-col col-md-1" style={{width: "4.166666665%",maxWidth: "4.166666665%"}}>
                    <ButtonGroup vertical>
                        {buttonList}
                    </ButtonGroup>
                </Col>
                <Col className="tag-list-col col-md-11" style={{width: "95.833333295%",maxWidth: "95.833333295%"}}>
                    <ListGroup>
                        {tagList}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default TagList;