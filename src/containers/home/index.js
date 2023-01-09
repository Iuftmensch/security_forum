import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, switchPage } from '../../actions/home';
import { addFilter } from '../../actions/filter';
import { alterSort } from '../../actions/sort';
import ThreadList from '../../components/ThreadList';
import { showModal } from '../../actions/modal'
import { updateThread } from '../../actions/thread';

const mapStateToProps = state => ({
    isLoading: state.home.isLoading,
    threads: state.home.threads,
    threadCount: state.home.count,
    error: state.home.error,
    isAuthenticated: state.auth.isAuthenticated,
    newThreadLoading: state.home.newThreadLoading,
    newThreadSuccess: state.home.newThreadSuccess,
    newThreadName: state.home.newThreadName,
    newThreadContent: state.home.newThreadContent,
    newThreadId: state.home.newThreadId,
    newThreadError: state.home.newThreadError,
    newThreadShow: state.home.newThreadShow,
    filterTags: state.filter.tags,
    filterContent: state.filter.content,
    filterStr: state.filter.filterStr,
    tags: state.home.tags,
    page: state.home.page,
    sortType: state.sort.sortType,
});

const mapDispatchToProps = dispatch => ({
    fetchThreads: () => {
        dispatch(fetchThreads());
    },
    showLogin: () => {
        dispatch(showModal('LOGIN', {}));
    },
    showThreadModal: () => {
        dispatch(showModal('THREAD', {}));
    },
    updateThread: (id, newThread) => {
        dispatch(updateThread(id, newThread))
    },
    switchPage: (page) => {
        dispatch(switchPage(page))
    },
    addFilter: (tags, content) => {
        dispatch(addFilter(tags, content))
    },
    alterSort: (sortType) => {
        dispatch(alterSort(sortType))
    }
});

class Home extends Component {

    componentDidMount() {
        this.props.fetchThreads();
    }

    render() {
        return (
            <ThreadList {...this.props} />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);