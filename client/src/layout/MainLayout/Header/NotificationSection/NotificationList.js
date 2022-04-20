// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
// assets
import { deleteAllNotifies, isReadNotify, NOTIFY_TYPES } from 'redux/actions/notifyAction';
import { useDispatch, useSelector } from 'react-redux';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    width: '100%',
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();
    const { auth, notify } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleIsRead = (msg) => {
        dispatch(isReadNotify({ msg, auth }));
    };

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                minWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {notify.data.map((msg, index) => (
                <Link
                    to={`${msg.url}`}
                    style={{ textDecoration: 'none' }}
                    className="d-flex text-dark align-items-center"
                    onClick={() => handleIsRead(msg)}
                >
                    <ListItemWrapper>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar alt="John Doe" src={msg.user.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={msg.user.username} />
                            <ListItemSecondaryAction>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {moment(msg.createdAt).fromNow()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                {msg.text}
                                {msg.content && <Typography variant="subtitle2">{msg.content.slice(0, 20)}...</Typography>}
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Grid container>
                                    <Grid item>
                                        <Chip label="Unread" sx={chipErrorSX} />
                                    </Grid>
                                    <Grid item>
                                        <Chip label="New" sx={chipWarningSX} />
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </ListItemWrapper>
                    <Divider sx={{ mt: 4.25, mb: 1.25 }} />
                </Link>
            ))}
        </List>
    );
};

export default NotificationList;
