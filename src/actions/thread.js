import {
    FETCH_THREAD_REQUEST,
    FETCH_THREAD_SUCCESS,
    FETCH_THREAD_FAILURE,
    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
    RESET_THREAD_SUCCESS,
    CREATE_THREAD_FAILURE,
    UPDATE_THREAD_REQUEST,
    UPDATE_THREAD_SUCCESS,
    UPDATE_THREAD_FAILURE,
    CREATE_THREAD_SAVE,
    UPDATE_THREAD_TAGS,
    UPDATE_VOTE_THREAD
} from './const';
import {
    fetchThreadApi,
    fetchThreadsApi,
    createThreadApi,
    fetchTagsApi,
    updateThreadApi,
    updateVoteThreadApi
} from '../api/thread';
import { fetchUserProfileApi } from '../api/user'
import { apiErrorHandler } from '../utils/errorhandler';
import { fetchHomeSuccess, fetchHomeFailure } from '../actions/home';
import store from '../store';
import { refreshToken,checkFirebase } from './firebase';

export const fetchThreadRequest = () => {
    return {
        type: FETCH_THREAD_REQUEST,
    };
};

export const fetchThreadSuccess = data => {
    return {
        type: FETCH_THREAD_SUCCESS,
        thread: data.thread,
        option: data.option
    };
};

export const fetchThreadFailure = error => {
    return {
        type: FETCH_THREAD_FAILURE,
        error,
    };
};

export const fetchThread = thread => dispatch => {
    dispatch(fetchThreadRequest());
    
    const params = {
        "username": store.getState().auth.username,
    }

    fetchThreadApi(thread,params)
        .then(response => {
            dispatch(fetchThreadSuccess(response.data));
        })
        .catch(error => {
            const errorMessage = apiErrorHandler(error);
            dispatch(fetchThreadFailure(errorMessage));
        });
};

export const createThreadRequest = newThread => {
    return {
        type: CREATE_THREAD_REQUEST,
        newThread,
    };
};

export const createThreadSuccess = newThread => {
    return {
        type: CREATE_THREAD_SUCCESS,
        newThread,
    };
};

export const resetThreadSuccess = () => {
    return {
        type: RESET_THREAD_SUCCESS,
    };
};

export const createThreadFailure = error => {
    return {
        type: CREATE_THREAD_FAILURE,
        error,
    };
};

export const updateThreadRequest = newThread => {
    return {
        type: UPDATE_THREAD_REQUEST,
        newThread,
    };
};

export const updateThreadSuccess = thread => {
    return {
        type: UPDATE_THREAD_SUCCESS,
        thread,
    };
};

export const updateThreadFailure = error => {
    return {
        type: UPDATE_THREAD_FAILURE,
        error,
    };
};

export const createThreadSave = newThread => {
    return {
        type: CREATE_THREAD_SAVE,
        name: newThread.name,
        content: newThread.content,
    };
};

export const updateThreadTags = tags => {
    return {
        type: UPDATE_THREAD_TAGS,
        tags: tags
    };
};

export const createThread = newThread => dispatch => {
    const promise = checkFirebase();
    if (promise) {
        promise.then(token => {
            dispatch(refreshToken(token));
            //call api
            dispatch(createThreadRequest(newThread));
            // let threads, tags, count;
            createThreadApi(newThread)
                .then(response => {
                    dispatch(createThreadSuccess(response.data));
                    // re-load home page
                    // fetchThreadsApi()
                    //     .then(response => {
                    //         threads = response.data;
                    //         fetchTagsApi()
                    //             .then(response => {
                    //                 tags = response.data;
                    //                 dispatch(fetchHomeSuccess(threads, tags));
                    //             })
                    //             .catch(error => {
                    //                 const errorMessage = apiErrorHandler(error);
                    //                 dispatch(fetchHomeFailure(errorMessage));
                    //             });

                    //     })
                    //     .catch(error => {
                    //         const errorMessage = apiErrorHandler(error);
                    //         dispatch(fetchHomeFailure(errorMessage));
                    //     });
                })
                .catch(error => {
                    const errorMessage = apiErrorHandler(error);
                    dispatch(createThreadFailure(errorMessage));
                });
        });
    }
};


export const updateThread = (id, newThread) => dispatch => {
    const promise = checkFirebase();
    if (promise) {
        promise.then(token => {
            dispatch(refreshToken(token));
            //call api
            dispatch(updateThreadRequest(newThread));
            updateThreadApi(id, newThread)
                .then(response => {
                    dispatch(updateThreadSuccess(response.data));
                })
                .catch(error => {
                    const errorMessage = apiErrorHandler(error);
                    dispatch(updateThreadFailure(errorMessage));
                });
        });
    }
};

export const resetNewThread = () => dispatch => {
    dispatch(resetThreadSuccess());
}

export const voteForThread = (params) => dispatch =>{
    const promise = checkFirebase();
    if (promise) {
        promise.then(token => {
            dispatch(refreshToken(token));
            //call api
            updateVoteThreadApi(params)
                .then(response => {
                    const params = {
                        "username": store.getState().auth.username,
                    }
                    const thread = store.getState().thread.uuid;
                    dispatch(fetchThreadRequest());
                    fetchThreadApi(thread,params)
                        .then(response => {
                            dispatch(fetchThreadSuccess(response.data));
                        })
                        .catch(error => {
                            const errorMessage = apiErrorHandler(error);
                            dispatch(fetchThreadFailure(errorMessage));
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

}