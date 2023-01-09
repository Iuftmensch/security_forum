import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAILURE,
    SUBSCRIPTION_RESET
} from '../actions/const';

const initialState = {
    isLoading: false,
    error: null,
    success: false,
};

const subscribe = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                success :false
            };
        case SUBSCRIPTION_SUCCESS:
            return {
                isLoading: false,
                error: null,
                success :true
            };
        case SUBSCRIPTION_FAILURE:
            return {
                isLoading: false,
                error: action.error,
                success : false
            };
        case SUBSCRIPTION_RESET:
            return {
                isLoading: false,
                error: null,
                success : false
            };
        default:
            return state;
    }
};

export default subscribe;
