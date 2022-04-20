/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SubCard from 'ui-component/cards/SubCard';

// Project assets
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { BASE_URL } from 'utils/config';

import { GLOBALTYPES } from 'redux/actions/globalTypes';
import { deletePost, reportPost } from 'redux/actions/postAction';
import PostFooter from './PostFooter';
import PostComments from './PostComments';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const ITEM_HEIGHT = 48;

const PostCard = ({ post, user, theme }) => {
    const { auth, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [readMore, setReadMore] = React.useState();

    const [openSnac, setOpenSnac] = React.useState(false);
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        console.log(post);
    }, []);

    const handleClickSnac = (msg) => {
        setMessage(msg);
        setOpenSnac(true);
    };

    const handleCloseSnac = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnac(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditPost = (EditPost) => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { EditPost, onEdit: true } });
    };

    const handleDeletePost = (DeletePost) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deletePost({ DeletePost, auth, socket }));
            return navigate('/');
        }
    };

    const handleReportPost = (ReportPost) => {
        dispatch(reportPost({ ReportPost, auth }));
        handleClose();
    };

    const handleCopyLink = (PostLink) => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${PostLink._id}`);
        handleClose();
        handleClickSnac('Link copied successfuly');
    };

    return (
        <Card sx={{ marginTop: 2, marginBottom: 2 }}>
            <CardHeader
                avatar={
                    <Avatar src={post.user.avatar} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${post.user._id}`}>
                        {post.user.username}
                    </Link>
                }
                subheader={moment(post.createdAt).fromNow()}
            />
            {/* Menu start */}
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch'
                    }
                }}
            >
                {auth.user._id === post.user._id && (
                    <MenuItem onClick={() => handleEditPost(post)}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                )}
                {auth.user._id === post.user._id && (
                    <MenuItem onClick={() => handleDeletePost(post)}>
                        <ListItemIcon>
                            <DeleteForeverIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                )}
                <MenuItem onClick={() => handleCopyLink(post)}>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy Link</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleReportPost(post)}>
                    <ListItemIcon>
                        <ReportProblemIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Report this post</ListItemText>
                </MenuItem>
            </Menu>
            <CardContent sx={{ mt: -5 }}>
                <Typography variant="body2">
                    {post.content.length < 60 ? post.content : readMore ? `${post.content} ` : `${post.content.slice(0, 60)}  ...`}
                    {post.content.length > 60 && (
                        <span className="readMore" onClick={() => setReadMore(!readMore)}>
                            {readMore ? 'Hide Content' : 'Read More'}
                        </span>
                    )}
                </Typography>
            </CardContent>
            <PostFooter post={post} />
            <PostComments post={post} />
            {/* Snackbar */}
            <Snackbar open={openSnac} autoHideDuration={6000} onClose={handleCloseSnac}>
                <Alert onClose={handleCloseSnac} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default PostCard;
