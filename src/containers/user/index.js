import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, OverlayTrigger, Tooltip, Button, Badge } from 'react-bootstrap';
import { fetchUserProfile } from '../../actions/userprofile'
import ThreadTable from '../../components/ThreadTable'
import { BsGithub, BsTwitter, BsEyeFill, BsFillPersonFill,BsPeopleFill } from "react-icons/bs";
import { BiPaperPlane } from "react-icons/bi";
import CalendarHeatmap from 'react-calendar-heatmap';
import './style.scss'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profileName: state.userProfile.name,
        twitter: state.userProfile.twitter,
        github: state.userProfile.github,
        date_joined: state.userProfile.date_joined,
        last_login: state.userProfile.last_login,
        threads: state.userProfile.threads,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserProfile: username => {
            dispatch(fetchUserProfile(username));
        },
    };
}

function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

class UserDetail extends Component {
    componentDidMount() {
        const { username } = this.props.match.params;
        this.props.fetchUserProfile(username);
    }

    render() {

        const { threads, github, profileName, date_joined, twitter, last_login } = this.props;

        let gitUsername = null, twitterUsername = null;

        if (twitter) {
            const arr = twitter.split("/");
            twitterUsername = arr[arr.length - 1];
        }

        if (github) {
            const arr = github.split("/");
            gitUsername = arr[arr.length - 1];
        }

        const tagsMap = new Map();
        const dateMap = new Map();
        const today = new Date();
        let offset = 0;
        while (offset <= 180) {
            const priorDate = new Date();
            priorDate.setDate(today.getDate() - offset++);
            dateMap.set(priorDate.toISOString().split('T')[0], 0);
        }

        threads.forEach(thread => {
            thread["tags"].forEach(tag => {
                if (tagsMap.get(tag)) {
                    tagsMap.set(tag, tagsMap.get(tag) + 1);
                } else {
                    tagsMap.set(tag, 1);
                }
            });
            const date = thread["created_at_date"];
            if (dateMap.get(date)) {
                dateMap.set(date, dateMap.get(date) + 1);
            } else {
                dateMap.set(date, 1);
            }
        });

        const dateArr = Array.from(dateMap, function (item) {
            const date = item[0].split("-");
            return { date: new Date(date[0], date[1] - 1, date[2]), count: item[1] };
        });

        const tagArr = Array.from(new Map([...tagsMap.entries()].sort((a,b) => b[1] - a[1])), function (item) {
            return { name: item[0], count: item[1] };
        });

        let tagsList = tagArr.map((tag, i) => {
            return <div className="tagdiv" key={i}><div className="tagdiv-left"><Badge pill bg="light" text="dark">{tag.name}</Badge></div>
                <div className="tagdiv-right">{tag.count}
                    <p style={{ display: "inline-block", color: "#bdb6b6",fontFamily:"Roboto",fontSize:"15px"}}>&nbsp;{tag.count>1?"posts":"post"} related</p>
                </div>
            </div>
        });

        return (
            <div className="user-detail">
                <Container className="user-detail-container">
                    <Row>
                        <Col sm={3}>
                            <div className="user-detail-info">
                                <div>
                                    <div style={{fontWeight: "bold"}}>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip>
                                                    Username
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant="outline-none"><BsFillPersonFill /></Button>
                                        </OverlayTrigger>
                                        {profileName}
                                    </div>
                                    {github ?
                                        <div>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Github
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="outline-none"><BsGithub /></Button>
                                            </OverlayTrigger>
                                            <a href={github} style={{ textDecoration: 'none' }}>@{gitUsername}</a>
                                        </div> : null}
                                    {twitter ?
                                        <div>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip>
                                                        Twitter
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="outline-none"><BsTwitter /></Button>
                                            </OverlayTrigger>
                                            <a href={twitter} style={{ textDecoration: 'none' }}>@{twitterUsername}</a>
                                        </div> : null}
                                    <div style={{color: "#5e5959"}}>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip>
                                                    Member Since
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant="outline-none"><BsPeopleFill /></Button>
                                        </OverlayTrigger>
                                        {date_joined}
                                    </div>
                                    <div style={{color: "#5e5959"}}>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip>
                                                    Last Seen
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant="outline-none"><BsEyeFill /></Button>
                                        </OverlayTrigger>
                                        {last_login}
                                    </div>
                                    <div style={{color: "#5e5959"}}>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip>
                                                    Contributions
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant="outline-none"><BiPaperPlane /></Button>
                                        </OverlayTrigger>
                                        {threads.length}
                                    </div>
                                </div>
                                <div className='hr'><hr /></div>
                                <div className='user-detail-tags'>
                                    <p className='user-detail-title'>Top Tags</p>
                                    {tagsList}
                                    <div>&nbsp;</div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={9}>
                            <div className="user-detail-threads">
                                <p className='user-detail-title'>User contributions in last 6 months</p>
                                <CalendarHeatmap
                                    startDate={shiftDate(today, -180)}
                                    endDate={shiftDate(today, -1)}
                                    values={dateArr}
                                    classForValue={value => {
                                        if (!value) {
                                            return 'color-empty';
                                        }
                                        return `color-github-${value.count}`;
                                    }}
                                    titleForValue={value => `${value.count} contributions on ${value.date.toISOString().slice(0, 10)}`}
                                />
                            </div>
                            <div className="user-detail-table">
                                <p className='user-detail-title'>Contributions</p>
                                <ThreadTable threads={threads} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetail);