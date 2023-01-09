import { ADD_FILTER } from './const';

export const addFilter = (tags,content) => {
    return {
        type: ADD_FILTER,
        tags: tags,
        content: content,
    };
};

