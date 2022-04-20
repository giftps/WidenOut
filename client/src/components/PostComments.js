/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CommentDisplay from 'components/home/comments/CommentDisplay';
import { createComment } from 'redux/actions/commentAction';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'components/Icons';

const PostComments = ({ children, post, onReply, setOnReply }) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const [next, setNext] = useState(2);
    const [replyComments, setReplyComments] = useState([]);
    const [content, setContent] = useState('');

    const { auth, socket, theme } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) {
            if (setOnReply) {
                return setOnReply(false);
            }
            return;
        }

        setContent('');

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        };
        dispatch(createComment({ post, newComment, auth, socket }));
        if (setOnReply) {
            return setOnReply(false);
        }
    };

    useEffect(() => {
        const newCm = post.comments.filter((cm) => !cm.reply);
        setComments(newCm);
        setShowComments(newCm.slice(newCm.length - next));
    }, [post.comments, next]);

    useEffect(() => {
        const newReply = post.comments.filter((cm) => cm.reply);
        setReplyComments(newReply);
    }, [post.comments]);

    return (
        <>
            <div style={{ padding: 10, backgroundColor: '#FBFBFB' }}>
                <div>
                    {showComments.map((comment, index) => (
                        <CommentDisplay
                            key={index}
                            comment={comment}
                            post={post}
                            replyCm={replyComments.filter((item) => item.reply === comment._id)}
                        />
                    ))}
                    {comments.length - next > 0 ? (
                        <div onClick={() => setNext(next + 10)} className="p-2 border-top" style={{ cursor: 'pointer', color: 'crimson' }}>
                            Load more...
                        </div>
                    ) : (
                        comments.length > 2 && (
                            <div onClick={() => setNext(2)} className="p-2 border-top" style={{ cursor: 'pointer', color: 'crimson' }}>
                                Hide...
                            </div>
                        )
                    )}
                </div>
                <div>
                    <form className="card-footer comment_input" onSubmit={handleSubmit}>
                        {children}
                        <Stack direction="row" spacing={2}>
                            <Avatar src={post.user.avatar} aria-label="recipe" />
                            <TextareaAutosize
                                type="text"
                                placeholder="Add comments..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxRows={4}
                                aria-label="maximum height"
                                defaultValue=""
                                style={{
                                    width: '80%',
                                    borderRadius: 5,
                                    border: '1px solid #ccc',
                                    padding: 5,
                                    filter: theme ? 'invert(1)' : 'invert(0)',
                                    color: theme ? 'white' : '#111',
                                    background: theme ? 'rgb(0,0,0,0.3)' : ''
                                }}
                            />
                        </Stack>
                        <Icons setContent={setContent} content={content} theme={theme} />
                        <button type="submit" className="postBtn">
                            <i className="material-icons text-dark">send</i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostComments;
