import { ALTER_SORT } from './const';

export const alterSort = (sortType) => {
    return {
        type: ALTER_SORT,
        sortType: sortType,
    };
};

