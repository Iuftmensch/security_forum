import { ALTER_SORT } from '../actions/const';

const initialState = {
  sortType: "-last_activity",
};

const sort = (state = initialState, action) => {
  switch (action.type) {
    case ALTER_SORT:
      return {
        sortType: action.sortType,
      };
    default:
      return state;
  }
};

export default sort;
