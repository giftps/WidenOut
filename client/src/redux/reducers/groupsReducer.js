import { GROUP_TYPES } from '../actions/groupAction';
import { SUGGEST_TYPES } from '../actions/suggestionsAction';

const initialState = {
    loading: false,
    groups: [],
    posts: [],
    result: 0,
    page: 2
};

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GROUP_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case GROUP_TYPES.GET_GROUPS:
            return {
                ...state,
                groups: action.payload.groups
            };

        case SUGGEST_TYPES.GET_USERS:
            return {
                ...state,
                users: action.payload.users
            };

        default:
            return state;
    }
};

export default groupsReducer;
