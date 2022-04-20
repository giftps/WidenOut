/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { follow, unfollow } from 'redux/actions/profileAction';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    marginTop: 5,
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const SuggestionsCard = ({ isLoading, user }) => {
    const theme = useTheme();
    const [followed, setFollowed] = useState(false);

    const { auth, profile, socket } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (auth.user.following.find((item) => item._id === user._id)) {
            setFollowed(true);
        }
        return () => setFollowed(false);
    }, [auth.user.following, user._id]);

    const handleFollow = async () => {
        if (load) return;

        setFollowed(true);
        setLoad(true);
        await dispatch(follow({ users: profile.users, user, auth, socket }));
        setLoad(false);
    };

    const handleUnFollow = async () => {
        if (load) return;

        setFollowed(false);
        setLoad(true);
        await dispatch(unfollow({ users: profile.users, user, auth, socket }));
        setLoad(false);
    };

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={user.avatar}
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.warning.light,
                                            color: theme.palette.warning.dark
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={<Typography variant="h4">{user.username}</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: theme.palette.grey[500],
                                                mt: 0.5
                                            }}
                                        >
                                            {user.msg ? (
                                                <>
                                                    <div>{user.text}</div>
                                                    {user.media.length > 0 && (
                                                        <div>
                                                            {user.media.length} <i className="fas fa-image" />
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                user.fullname
                                            )}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {followed ? (
                                <Button variant="contained" color="error" size="small" disableElevation onClick={handleUnFollow}>
                                    Unfollow
                                </Button>
                            ) : (
                                <Button variant="contained" size="small" disableElevation onClick={handleFollow}>
                                    Follow
                                </Button>
                            )}
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

SuggestionsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default SuggestionsCard;
