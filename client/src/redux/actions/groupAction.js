import { GLOBALTYPES } from './globalTypes';
import { getDataAPI } from '../../utils/fetchData';


export const GROUP_TYPES = {
  LOADING: "LOADING_USERS",
  GET_GROUPS: "GET_ALL_GROUPS",
  JOIN: "JOIN",
};


export const getAllGroups = (token) => async dispatch => {
    try {
        dispatch({type: GROUP_TYPES.LOADING, payload: true });

        const res = await getDataAPI(`all_groups`, token);
        
        dispatch({ type: GROUP_TYPES.GET_GROUPS, payload: res.data });

        dispatch({type: GROUP_TYPES.LOADING, payload: false });
        
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} });
    }
}


      