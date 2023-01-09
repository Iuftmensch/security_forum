import {
    SET_KEY,
} from '../actions/const';

const initialState = {
    navKey: 'home',
};

const nav = (state = initialState, action) => {
    switch (action.type) {
        case SET_KEY:
            return {
                navKey: action.key
            };
        default:
            return state;
    }
};

export default nav;
