import { ADD_FILTER } from '../actions/const';

const initialState = {
  tags: [],
  content: [],
  filterStr: ""
};

const createFilterStr = (tagsArr, contentArr) => {
  let curFilters = "";
  for (let content of contentArr) {
    curFilters += (curFilters ? " " : "") + content;
  }
  for (let tag of tagsArr) {
    curFilters += (curFilters ? " " : "") + "tag:" + tag;
  }
  return curFilters;
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        tags: action.tags,
        content: action.content,
        filterStr: createFilterStr(action.tags,action.content)
      };
    default:
      return state;
  }
};

export default filter;
