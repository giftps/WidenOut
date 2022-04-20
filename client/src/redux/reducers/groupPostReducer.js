/* eslint-disable no-underscore-dangle */
import { POST_G_TYPES } from '../actions/groupPostAction';
import { EditData, DeleteData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2
};

const gPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_G_TYPES.CREATE_G_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };

        case POST_G_TYPES.LOADING_G_POST:
            return {
                ...state,
                loading: action.payload
            };

        case POST_G_TYPES.GET_G_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: action.payload.page
            };

        case POST_G_TYPES.UPDATE_G_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            };

        case POST_G_TYPES.DELETE_G_POST:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload._id)
            };

        case POST_G_TYPES.REPORT_G_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            };

        default:
            return state;
    }
};

export default gPostReducer;
