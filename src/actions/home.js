import {
    FETCH_HOME_REQUEST,
    FETCH_HOME_SUCCESS,
    FETCH_HOME_FAILURE,
    SWITCH_PAGE,
    UPDATE_CUR_THREAD
} from './const';
import { fetchThreadsApi, fetchTagsApi } from '../api/thread';
import { apiErrorHandler } from '../utils/errorhandler';
import store from '../store';

export const fetchHomeRequest = () => {
    return {
        type: FETCH_HOME_REQUEST,
    };
};

export const switchPage = (page) => {
    return {
        type: SWITCH_PAGE,
        page
    };
};

export const fetchHomeSuccess = (threads, tags, count) => {
    return {
        type: FETCH_HOME_SUCCESS,
        threads: threads,
        tags: tags,
        count: count
    };
};

export const fetchHomeFailure = error => {
    return {
        type: FETCH_HOME_FAILURE,
        error,
    };
};



export const fetchThreads = () => async (dispatch) => {
    dispatch(fetchHomeRequest());

    let threads, tags, count;

    const params = {
        sort : store.getState().sort.sortType,
        page : store.getState().home.page,
        tags : store.getState().filter.tags,
        content : store.getState().filter.content,
    }

    await fetchThreadsApi(params)
        .then(response => {
            const data = response.data;
            threads = data["threads"];
            count = data["count"];
        })
        .catch(error => {
            const errorMessage = apiErrorHandler(error);
            dispatch(fetchHomeFailure(errorMessage));
        });

    await fetchTagsApi()
        .then(response => {
            tags = response.data;
        })
        .catch(error => {
            const errorMessage = apiErrorHandler(error);
            dispatch(fetchHomeFailure(errorMessage));
        });

    dispatch(fetchHomeSuccess(threads, tags, count));
};

