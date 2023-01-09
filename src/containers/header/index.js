import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import NavLink from '../../components/NavLink'
import { showModal } from '../../actions/modal'
import { logout } from '../../actions/auth'
import { setKey } from '../../actions/nav'

const mapStateToProps = state => ({
  username: state.auth.username,
  name: state.auth.name,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  navKey: state.nav.navKey,
  hot: state.home.hot
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  showRegister: () => {
    dispatch(showModal('REGISTER', {}));
  },
  showLogin: () => {
    dispatch(showModal('LOGIN', {}));
  },
  showSubscription: () => {
    dispatch(showModal('SUBSCRIPTION', {}));
  },
  setKey: (key) => {
    dispatch(setKey(key));
  },
  showThreadModal: () => {
    dispatch(showModal('THREAD', {}));
  },
});

class Header extends Component {

  render() {
    const {
      isAuthenticated,
      username,
      name,
      isLoading,
      logout,
      showRegister,
      showLogin,
      showSubscription,
      showThreadModal,
      setKey,
      navKey,
      hot
    } = this.props;

    return (
      <div>
        <NavLink
          isAuthenticated={isAuthenticated}
          username={username}
          name={name}
          isLoading={isLoading}
          logout={logout}
          showRegister={showRegister}
          showLogin={showLogin}
          showSubscription={showSubscription}
          showThreadModal={showThreadModal}
          setKey={setKey}
          navKey={navKey}
          hot={hot}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);