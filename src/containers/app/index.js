import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import App from '../../App';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logout());
    },
});

class AppContainer extends Component {
    render() {
        return (
            <App {...this.props} />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppContainer);