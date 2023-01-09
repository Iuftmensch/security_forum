import {
  FETCH_THREAD_REQUEST,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE,
  UPDATE_THREAD_REQUEST,
  UPDATE_THREAD_SUCCESS,
  UPDATE_THREAD_FAILURE,
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
} from '../actions/const';

const threadState = {
  isLoading: false,
  id: null,
  uuid: null,
  name: null,
  content: null,
  pinned: false,
  creator: null,
  last_activity: null,
  thumb_up: 0,
  view: 0,
  tags: [],
  username: null,
  posts: [],
  edit_id: -1,
  error: null,
};

const actionState = {
  up: false,
  down: false,
}

const newPostInitialState = {
  newPostSuccess: false,
  newPostLoading: false,
  newPostError: null,
};

const initialState = {
  ...threadState,
  ...actionState,
  ...newPostInitialState
}

const thread = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREAD_REQUEST:
      return {
        ...initialState,
        isLoading: true,
        error: null,
      };
    case FETCH_THREAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        thumb_up: action.thread.thumb_up,
        id: action.thread.id,
        uuid: action.thread.uuid,
        name: action.thread.name,
        content: action.thread.content,
        pinned: action.thread.pinned,
        creator: action.thread.creator,
        last_activity: action.thread.last_activity_form,
        view: action.thread.view,
        tags: action.thread.tags,
        username: action.thread.username,
        posts: action.thread.posts,
        up: action.option.like,
        down: action.option.dislike,
        error: null,
      };
    // case UPDATE_THREAD_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     thumb_up: action.thread.thumb_up,
    //     view: action.thread.view,
    //     error: null,
    //   };
    case FETCH_THREAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case CREATE_POST_REQUEST:
      return {
        ...state,
        newPostLoading: true,
        newPostError: null,
        newPostSuccess: false,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        newPostLoading: false,
        newPostError: null,
        newPostSuccess: true,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        newPostLoading: false,
        newPostError: action.error,
        newPostSuccess: false,
      };
    case UPDATE_CUR_POST:
      return {
        ...state,
        posts: action.posts
      };
    case OPEN_POST_EDITOR:
      return {
        ...state,
        edit_id: action.id
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        edit_id: -1
      };
    default:
      return state;
  }
};

export default thread;
