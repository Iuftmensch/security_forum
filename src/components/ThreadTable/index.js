import React from 'react';
import {useState} from 'react';
import { Table, Badge, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.scss'
import uuid from 'react-uuid'

function ThreadTable(props) {

    const {threads} = props;

    console.log("threads",threads)

    const [page,setPage] = useState(1);

    const threadList = threads.slice((page-1)*15,Math.min(threads.length,page*15)).map((thread, i) => {
        let { id, name, tags, created_at, thumb_up, valid,uuid } = thread;
        name = name.length > 57 ? name.substring(0, 55) + '...' : name;
        let tagList = tags.slice(0,Math.min(5,tags.length)).map((tag, i) => {
            return <div key={i} style={{ display: "inline-block" }}><Badge pill bg="light" text="dark">{tag}</Badge>&nbsp;</div>
        });
        return (
            <tr key={i}>
                <td><Link to={`/thread/${uuid}`} style={{ textDecoration: 'none',fontWeight:"bold" }}>{name}</Link></td>
                <td><div>{tagList}</div></td>
                <td style={{ paddingLeft: '25px' }}>{thumb_up}</td>
            </tr>
        );
    })

    var count = [];
    let threadCount = threads ? threads.length : 0;
    let cur = 0;
    while (threadCount > 0) {
        const curPage = ++cur;
        count.push(<Pagination.Item key={uuid()} active={curPage == page} style={{ cursor: "pointer" }} onClick={() => setPage(curPage)}>{curPage}</Pagination.Item>);
        threadCount -= 15;
    }

    const getPagination =
        <Pagination>
            <Pagination.First onClick={() => setPage(1)} />
            <Pagination.Prev onClick={() => setPage(Math.max(page - 1, 1))} />
            {count}
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next onClick={() => setPage(cur)} />
            <Pagination.Last onClick={() => setPage(Math.min(page + 1, cur))} />
        </Pagination>

    return (
        
        <div>
            <Table hover className="thread-table">
                <thead>
                    <tr>
                        <th style={{ width: '400px',color:"#929292" }}>name</th>
                        <th style={{ width: '400px',color:"#929292" }}>tags</th>
                        <th style={{ color:"#929292" }}>votes</th>
                    </tr>
                </thead>
                <tbody>
                    {threadList}
                </tbody>
            </Table>
            <div className="thread-page">{getPagination}</div>
        </div>
    );
}

export default ThreadTable;