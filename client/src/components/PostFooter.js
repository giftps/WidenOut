/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import LikeButton from './LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, savePost, unLikePost, unSavePost } from 'redux/actions/postAction';
import ShareModal from './ShareModal';
import Typography from '@mui/material/Typography';
// assets
import { IconMessageCircle2, IconThumbUp, IconShare } from '@tabler/icons';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ReactPhotoCollage } from 'react-photo-collage';

const setting = {
    width: '100%',
    height: ['250px', '170px'],
    layout: [1, 4],
    photos: [
        {
            source: 'https://images.unsplash.com/photo-1517088455889-bfa75135412c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5548929376f93d8b1b7a21097df03bd&auto=format&fit=crop&w=749&q=80'
        },
        {
            source: 'https://images.unsplash.com/photo-1526656892012-7b336603ed46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=31c8e58b58c25dfcc18452ed29b52951&auto=format&fit=crop&w=334&q=80'
        },
        {
            source: 'https://images.unsplash.com/photo-1521024221340-efe7d7fa239b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9ad8a99d809d3fa3a9e8dff3ecc81878&auto=format&fit=crop&w=750&q=80'
        },
        {
            source: 'https://images.unsplash.com/photo-1523038793606-2fd28f837a85?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=919b76f4229e41416653aeb10e84e94a&auto=format&fit=crop&w=334&q=80'
        },
        {
            source: 'https://images.unsplash.com/photo-1516832970803-325be7a92aa5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=93d7ac9abad6167aecb49ebd67fd5b6d&auto=format&fit=crop&w=751&q=80'
        },
        {
            source: 'https://images.unsplash.com/photo-1526938972776-11558ad4de30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=973795a277e861265b0fabbf4a96afe2&auto=format&fit=crop&w=750&q=80'
        },
        {
            source: 'https://images.unsplash.com/photo-1464550838636-1a3496df938b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f22dbf6c13ea7c21e803aa721437b691&auto=format&fit=crop&w=888&q=80'
        }
    ],
    showNumOfRemainingPhotos: true
};

function PostFooter({ post }) {
    const [isLike, setIsLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);
    const [isShare, setIsShare] = useState(false);

    const dispatch = useDispatch();
    const { auth, theme, socket } = useSelector((state) => state);

    useEffect(() => {
        if (post.likes.find((like) => like._id === auth.user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user._id]);

    const handleLike = async () => {
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleUnLike = async () => {
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(unLikePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleSavePost = async () => {
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(savePost({ post, auth }));
        setSaveLoad(false);
    };

    const handleUnSavePost = async () => {
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(unSavePost({ post, auth }));
        setSaveLoad(false);
    };

    useEffect(() => {
        if (auth.user.saved.find((id) => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [post._id, auth.user.saved]);

    return (
        <>
            <ReactPhotoCollage {...setting} />
            {/* {post.images.length > 0 && <CardMedia sx={{ borderRadius: 3 }} component="img" image={post.images[0].url} alt="Pics" />} */}
            <div style={{ width: '100%', paddingLeft: 18, paddingRight: 18 }}>
                <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
            </div>
            <CardActions sx={{ mt: -5, mb: -5, justifyContent: 'space-between' }} disableSpacing>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginTop: 7, marginRight: 5 }}>
                        <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                    </div>
                    <div style={{ marginTop: 7 }}>{post.likes.length}</div>
                    <div style={{ marginTop: 7, marginRight: 5, marginLeft: 13 }}>
                        <Link to={`/post/${post._id}`} className="text-dark">
                            <i className="far fa-comments" />
                        </Link>
                    </div>
                    <div style={{ marginTop: 7 }}>{post.comments.length}</div>
                </div>
                <i className="fa fa-share" alt="Send" onClick={() => setIsShare(!isShare)} />
            </CardActions>
            <div style={{ width: '100%', paddingLeft: 18, paddingRight: 18 }}>
                <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
            </div>
        </>
    );
}

export default PostFooter;
