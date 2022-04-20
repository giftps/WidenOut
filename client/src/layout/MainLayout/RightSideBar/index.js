/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, Grid, Divider, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import { drawerWidth } from 'store/constant';
import ProfileCard from './ProfileCard';
import SuggestionsCard from './Suggestions';
import { getSuggestions } from 'redux/actions/suggestionsAction';

// ==============================|| RightSIDEBAR DRAWER ||============================== //

const RightSidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const { auth, suggestions } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        dispatch(getSuggestions(auth.token));
    }, []);

    const drawer = (
        <>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <ProfileCard isLoading={isLoading} />
                    {/* group divider */}
                    <Divider sx={{ mt: 2.25, mb: 1.25 }} />
                    <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                        Suggestions
                    </Typography>
                    {suggestions.users.map((user) => (
                        <SuggestionsCard key={user._id} user={user} isLoading={suggestions.loading} />
                    ))}
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }} />
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="right"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth + 15,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        border: 'none',
                        zIndex: '1 !important',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

RightSidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default RightSidebar;
