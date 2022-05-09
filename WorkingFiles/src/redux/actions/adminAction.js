/* eslint-disable no-underscore-dangle */
import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, deleteDataAPI, postDataAPI } from '../../utils/fetchData';
import { createNotify } from './notifyAction';

export const ADMIN_TYPES = {
    GET_TOTAL_USERS: 'GET_TOTAL_USERS',
    GET_TOTAL_GROUPS: 'GET_TOTAL_GROUPS',
    GET_TOTAL_POSTS: 'GET_TOTAL_POSTS',
    GET_TOTAL_COMMENTS: 'GET_TOTAL_COMMENTS',
    GET_TOTAL_LIKES: 'GET_TOTAL_LIKES',
    GET_TOTAL_SPAM_POSTS: 'GET_TOTAL_SPAM_POSTS',
    GET_TOTAL_ACTIVE_USERS: 'GET_TOTAL_ACTIVE_USERS',
    GET_SPAM_POSTS: 'GET_SPAM_POSTS',
    LOADING_ADMIN: 'LOADING_ADMIN',
    DELETE_POST: 'DELETE_POST',
    CREATE_GROUP: 'CREATE_GROUP'
};

export const getTotalUsers = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
        const res = await getDataAPI('get_total_users', token);
        dispatch({ type: ADMIN_TYPES.GET_TOTAL_USERS, payload: res.data });

        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
};

export const getTotalGroups = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
        const res = await getDataAPI('get_total_groups', token);
        dispatch({ type: ADMIN_TYPES.GET_TOTAL_GROUPS, payload: res.data });

        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
};

export const getTotalPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
        const res = await getDataAPI('get_total_posts', token);
        dispatch({ type: ADMIN_TYPES.GET_TOTAL_POSTS, payload: res.data });

        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
};

export const getTotalComments = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
        const res = await getDataAPI('get_total_comments', token);
        dispatch({ type: ADMIN_TYPES.GET_TOTAL_COMMENTS, payload: res.data });

        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
};

export const getTotalLikes = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
        const res = await getDataAPI('get_total_likes', token);
        dispatch({ type: ADMIN_TYPES.GET_TOTAL_LIKES, payload: res.data });

        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
};

export const getTotalSpamPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
        const res = await getDataAPI('get_total_spam_posts', token);
        dispatch({ type: ADMIN_TYPES.GET_TOTAL_SPAM_POSTS, payload: res.data });

        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
};

export const getSpamPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
        const res = await getDataAPI('get_spam_posts', token);

        dispatch({ type: ADMIN_TYPES.GET_SPAM_POSTS, payload: res.data.spamPosts });

        dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
};

export const deleteSpamPost =
    ({ post, auth, socket }) =>
    async (dispatch) => {
        dispatch({ type: ADMIN_TYPES.DELETE_POST, payload: post });

        try {
            const res = await deleteDataAPI(`delete_spam_posts/${post._id}`, auth.token);

            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

            // todo notification
            const msg = {
                id: auth.user._id,
                text: 'Your Post is deleted due to too many reports.',
                recipients: [post.user._id],
                url: `/profile/${post.user._id}`
            };

            dispatch(createNotify({ msg, auth, socket }));
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            });
        }
    };

export const getTotalActiveUsers =
    ({ auth, socket }) =>
    async (dispatch) => {
        try {
            socket.emit('getActiveUsers', auth.user._id);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            });
        }
    };

// export const createGroup = ({data, socket}) => async (dispatch) => {
// //  console.log(jwt)
//   try {
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

//     const res = await postDataAPI("create_group", data);

//     dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: { error: err.response.data.msg },
//     });
//   }
// };

export const createGroup =
    ({ name, about, auth, socket }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await postDataAPI('create_group', { name, about }, auth.token);

            dispatch({ type: ADMIN_TYPES.CREATE_GROUP, payload: { ...res.data.newGroup, user: auth.user } });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

            // todo notification
            const msg = {
                id: res.data.newGroup._id,
                text: 'Added a new post.',
                // recipients: res.data.newGroup.user.members,
                url: `/post/${res.data.newGroup._id}`,
                name,
                about
            };

            // dispatch(createNotify({ msg, auth, socket }));
            console.log(msg);
        } catch (err) {
            console.log(err);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            });
        }
    };
