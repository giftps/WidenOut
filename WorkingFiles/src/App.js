import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material ui
import Modal from '@mui/material/Modal';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Box from '@mui/material/Box';

// project tools
import io from 'socket.io-client';

import Alert from './components/alert/Alert';
import StatusModal from './components/StatusModal';
import { refreshToken } from './redux/actions/authAction';
import { getPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionsAction';
import { getNotifies } from './redux/actions/notifyAction';

import { getAllGroups } from './redux/actions/groupAction';
import { getgPosts } from './redux/actions/groupPostAction';

import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const { auth, status, modal, userType } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshToken());

        const socket = io();
        dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
        return () => socket.close();
    }, [dispatch, status]);

    useEffect(() => {
        if (auth.token) {
            dispatch(getPosts(auth.token));
            dispatch(getSuggestions(auth.token));
            dispatch(getNotifies(auth.token));
            dispatch(getAllGroups(auth.token));
            dispatch(getgPosts(auth.token));
        }
    }, [dispatch, auth.token]);

    useEffect(() => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {});
        }
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            {auth.token && <SocketClient />}
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <Alert />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
