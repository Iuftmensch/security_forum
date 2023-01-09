import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAILURE,
    SUBSCRIPTION_RESET
  } from './const';
  import {subsciptionApi} from '../api/user';
  import {apiErrorHandler} from '../utils/errorhandler';

  export const subscribeRequest = () => {
    return {
      type: SUBSCRIPTION_REQUEST,
    };
  };
  
  export const subscribeSuccess = () => {
    return {
      type: SUBSCRIPTION_SUCCESS,
    };
  };
  
  export const subscribeFailure = error => {
    return {
      type: SUBSCRIPTION_FAILURE,
      error,
    };
  };

  export const subscribeReset = () => {
    return {
      type: SUBSCRIPTION_RESET,
    };
  };
  
  
  export const subscibe = data => dispatch => {
    dispatch(subscribeRequest());
  
    subsciptionApi(data)
      .then(response => {
        dispatch(subscribeSuccess());
      })
      .catch(error => {
        // const errorMessage = apiErrorHandler(error);
        dispatch(subscribeFailure(error.response.data.error));
      });
  };