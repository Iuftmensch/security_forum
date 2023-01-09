import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE,
  CREATE_THREAD_REQUEST,
  CREATE_THREAD_SUCCESS,
  RESET_THREAD_SUCCESS,
  CREATE_THREAD_FAILURE,
  CREATE_THREAD_SAVE,
  UPDATE_THREAD_TAGS,
  LOGOUT,
  SWITCH_PAGE,
} from '../actions/const';

const homeInitialState = {
  isLoading: false,
  threads: [],
  hot:{id:0},
  tags: [],
  count : 0,
  error: null,
  page: 1
};

const threadTemplate = String.raw`
**What happened**\
*eg: What happened when...*

**Example**

*eg1: Code Block*

*eg2: Screenshot*

*eg3: File*\
*hash:*\
*file path:*

**Reference Link**\
*eg: reference url*
`;

const newThreadInitialState = {
  newThreadLoading: false,
  newThreadSuccess: false,
  newThreadName: '',
  newThreadContent: threadTemplate,
  newThreadId: null,
  newThreadTags: null,
  newThreadError: null,
  newThreadShow: false,
};

const initialState = {
  ...homeInitialState,
  ...newThreadInitialState,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_HOME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        threads: action.threads,
        count: action.count,
        // hot: action.threads.sort((a,b)=>b.view-a.view)[0],
        tags: action.tags,
        error: null,
      };
    case FETCH_HOME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SWITCH_PAGE:
      return {
        ...state,
        isLoading: false,
        page: action.page
      };
    case CREATE_THREAD_REQUEST:
      return {
        ...state,
        newThreadLoading: true,
        newThreadSuccess: false,
        newThreadError: null,
        newThreadName: action.newThread.name,
        newThreadContent: action.newThread.content,
        newThreadTags: action.newThread.tags,
      };
    case CREATE_THREAD_SUCCESS:
      return {
        ...state,
        newThreadLoading: false,
        newThreadSuccess: true,
        newThreadName: '',
        newThreadContent: threadTemplate,
        newThreadTags: null,
        newThreadId: action.newThread.id,
        newThreadShow: false,
        newThreadError: null,
      };
    case RESET_THREAD_SUCCESS:
      return {
        ...state,
        newThreadSuccess: false
      };
    case CREATE_THREAD_FAILURE:
      return {
        ...state,
        newThreadLoading: false,
        newThreadSuccess: false,
        newThreadId: null,
        newThreadShow: true,
        newThreadError: action.error,
      };
    case CREATE_THREAD_SAVE:
      return {
        ...state,
        newThreadName: action.name,
        newThreadContent: action.content,
      };
    case UPDATE_THREAD_TAGS:
      return {
        ...state,
        newThreadTags: action.tags,
      };
    case LOGOUT:
      return {
        ...state,
        ...newThreadInitialState,
      };
    default:
      return state;
  }
};

export default home;
