import React from 'react';
import {connect} from 'react-redux';
import RegisterModal from './register';
import LoginModal from './login';
import ThreadModal from './thread';
import SubscriptionModal from './subscription';

const ModalContainer = props => {
  switch (props.modalType) {
    case 'REGISTER':
      return <RegisterModal />;
    case 'LOGIN':
      return <LoginModal />;
    case 'THREAD':
      return <ThreadModal />;
    case 'SUBSCRIPTION':
      return <SubscriptionModal />;
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps,
});

export default connect(mapStateToProps)(ModalContainer);
