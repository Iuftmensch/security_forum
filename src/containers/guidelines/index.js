import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal';
import Guide from '../../components/Guide'

const mapStateToProps = state => ({
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    showLogin: () => {
        dispatch(showModal('LOGIN', {}));
    },
    showSubscription: () => {
        dispatch(showModal('SUBSCRIPTION', {}));
    },
});

class GuideContainer extends Component {

    render() {
        const {
            username,
            isAuthenticated,
            showLogin,
            showSubscription
        } = this.props;

        return (
            <Guide 
            username={username}
            isAuthenticated={isAuthenticated}
            showLogin={showLogin}
            showSubscription={showSubscription}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GuideContainer);