import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    UPDATE_CUR_POST,
    OPEN_POST_EDITOR,
} from './const';
import { createPostApi, editPostApi, deletePostApi,updateVotePostApi } from '../api/post';
import { fetchThreadApi } from '../api/thread';
import { fetchThreadRequest, fetchThreadSuccess, fetchThreadFailure } from './thread';
import { apiErrorHandler } from '../utils/errorhandler';
import { refreshToken,checkFirebase } from './firebase';
import store from '../store';

export const createPostRequest = () => {
    return {
        type: CREATE_POST_REQUEST,
    };
};

export const createPostSuccess = () => {
    return {
        type: CREATE_POST_SUCCESS,
    };
};

export const createPostFailure = error => {
    return {
        type: CREATE_POST_FAILURE,
        error,
    };
};

export const deletePostRequest = id => {
    return {
        type: DELETE_POST_REQUEST,
        id,
    };
};

export const deletePostSuccess = id => {
    return {
        type: DELETE_POST_SUCCESS,
        id,
    };
};

export const deletePostFailure = (id, error) => {
    return {
        type: DELETE_POST_FAILURE,
        id,
        error,
    };
};

export const editPostRequest = id => {
    return {
        type: EDIT_POST_REQUEST,
        id,
    };
};

export const editPostSuccess = id => {
    return {
        type: EDIT_POST_SUCCESS,
        id,
    };
};

export const editPostFailure = (id, error) => {
    return {
        type: EDIT_POST_FAILURE,
        id,
        error,
    };
};

export const createPost = (newPost,threadID) => dispatch => {
    const promise = checkFirebase();
    if (promise) {
        promise.then(token => {
            dispatch(refreshToken(token));
            //call api
            dispatch(createPostRequest());
            createPostApi(newPost)
                .then(response => {
                    dispatch(createPostSuccess());
                    const params = {
                        "username": store.getState().auth.username,
                    }
                    fetchThreadApi(threadID,params)
                        .then(response => {
                            dispatch(fetchThreadSuccess(response.data));
                        })
                        .catch(error => {
                            const errorMessage = apiErrorHandler(error);
                            dispatch(fetchThreadFailure(errorMessage));
                        });
                })
                .catch(error => {
                    const errorMessage = apiErrorHandler(error);
                    dispatch(createPostFailure(errorMessage));
                });
        });
    }
};

export const deletePost = (id, threadID) => dispatch => {
    const promise = checkFirebase();
    if (promise) {
        promise.then(token => {
            dispatch(refreshToken(token));
            //call api
            dispatch(deletePostRequest(id));
            deletePostApi(id)
                .then(response => {
                    dispatch(deletePostSuccess(id));
                    const params = {
                        "username": store.getState().auth.username,
                    }
                    fetchThreadApi(threadID,params)
                        .then(response => {
                            dispatch(fetchThreadSuccess(response.data));
                        })
                        .catch(error => {
                            const errorMessage = apiErrorHandler(error);
                            dispatch(fetchThreadFailure(errorMessage));
                        });
                })
                .catch(error => {
                    const errorMessage = apiErrorHandler(error);
                    dispatch(deletePostFailure(id, errorMessage));
                });
        });
    }
};

export const editPost = (id, content, threadID) => dispatch => {
    const promise = checkFirebase();
    if (promise) {
        promise.then(token => {
            dispatch(refreshToken(token));
            //call api
            dispatch(editPostRequest(id));
            editPostApi(id, content)
                .then(response => {
                    dispatch(editPostSuccess(id));
                    const params = {
                        "username": store.getState().auth.username,
                    }
                    fetchThreadApi(threadID,params)
                        .then(response => {
                            dispatch(fetchThreadSuccess(response.data));
                        })
                        .catch(error => {
                            const errorMessage = apiErrorHandler(error);
                            dispatch(fetchThreadFailure(errorMessage));
                        });
                })
                .catch(error => {
                    const errorMessage = apiErrorHandler(error);
                    dispatch(editPostFailure(id, errorMessage));
                });
        });
    }
};

export const updateCurPost = posts => {
    return {
        type: UPDATE_CUR_POST,
        posts,
    };
};

export const openPostEditor = (id) => {
    return {
        type: OPEN_POST_EDITOR,
        id
    };
};

export const voteForPost = (params) => dispatch =>{
    const promise = checkFirebase();
    if (promise) {
        promise.then(token => {
            dispatch(refreshToken(token));
            //call api
            updateVotePostApi(params)
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