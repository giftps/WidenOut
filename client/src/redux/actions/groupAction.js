import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData';


export const GROUP_TYPES = {
    LOADING: "LOADING_USERS",
    GET_GROUPS: "GET_ALL_GROUPS",
    JOIN: "JOIN",

    GET_USER: "GET_PROFILE_USER",
    FOLLOW: "FOLLOW",
    UNFOLLOW: "UNFOLLOW",
    GET_ID: "GET_PROFILE_ID",
    GET_POSTS: "GET_PROFILE_POSTS",
    UPDATE_POST: "UPDATE_PROFILE_POSTS",
};


export const getAllGroups = (token) => async dispatch => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING, payload: true });

        const res = await getDataAPI(`all_groups`, token);

        dispatch({ type: GROUP_TYPES.GET_GROUPS, payload: res.data });

        dispatch({ type: GROUP_TYPES.LOADING, payload: false });

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const getProfileUsers = ({ id, auth }) => async (dispatch) => {

    dispatch({ type: GROUP_TYPES.GET_ID, payload: id })

    try {
        dispatch({ type: GROUP_TYPES.LOADING, payload: true });
        const res = getDataAPI(`/user/${id}`, auth.token);

        const res1 = getDataAPI(`/group_posts/${id}`, auth.token);

        const users = await res;
        const posts = await res1;

        dispatch({ type: GROUP_TYPES.GET_USER, payload: users.data });
        dispatch({ type: GROUP_TYPES.GET_POSTS, payload: { ...posts.data, _id: id, page: 2 } });

        dispatch({ type: GROUP_TYPES.LOADING, payload: false });

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}



