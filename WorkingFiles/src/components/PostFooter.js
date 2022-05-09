/* eslint-disable array-callback-return */
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

function PostFooter({ post, photos }) {
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

    const ImageRender = () => {
        if (post.images.length !== 0) {
            if (post.images.length > 1) {
                return <ReactPhotoCollage photos={photos.photos} showNumOfRemainingPhotos {...photos} />;
            }
            return <CardMedia sx={{ borderRadius: 3 }} component="img" image={post.images[0].url} alt="Pics" />;
        }
        return null;
    };

    return (
        <>
            <ImageRender />
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
