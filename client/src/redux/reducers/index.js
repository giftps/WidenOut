import { combineReducers } from 'redux';

import auth from './authReducer';
import userType from './userTypeReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import profile from './profileReducer';
import status from './statusReducer';
import homePosts from './postReducer';
import modal from './modalReducer';
import detailPost from './detailPostReducer';
import admin from './adminReducer';
import discover from './discoverReducer';
import suggestions from './suggestionsReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';
import groups from './groupsReducer';
import ghomePosts from './groupPostReducer';
import customizationReducer from './customizationReducer';

export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePosts,
    modal,
    detailPost,
    userType,
    admin,
    discover,
    suggestions,
    socket,
    notify,
    message,
    groups,
    ghomePosts,
    customization: customizationReducer
});
