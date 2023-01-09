import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFilter } from '../../actions/filter';
import TagList from '../../components/Tag';

const mapStateToProps = state => ({
    tags: state.home.tags,
});

const mapDispatchToProps = dispatch => ({
    addFilter: (tags,content) => {
        dispatch(addFilter(tags,content));
    },
});

class Tag extends Component {

    render() {
        return (
            <TagList {...this.props}/>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tag);