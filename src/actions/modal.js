import {SHOW_MODAL, HIDE_MODAL} from './const';

export const showModal = (modalType, modalProps) => ({
  type: SHOW_MODAL,
  modalType,
  modalProps,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
