/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif';
import PostCard from '../../components/PostCard';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const { auth, detailPost } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost({ detailPost, id, auth }));
        if (detailPost.length > 0) {
            const newArr = detailPost.filter((post) => post._id === id);
            setPost(newArr);
        }
    }, [detailPost, dispatch, id, auth]);

    return (
        <div className="posts">
            {post.length === 0 && <img src={LoadIcon} alt="Loading..." className="d-block mx-auto my-4" />}

            {post.map((item) => (
                <>
                    <div className="container home row mx-0">
                        {/* <div className="col-md-1">

                        </div> */}
                        <div className="col-md-12">
                            <PostCard post={item} key={item._id} />
                        </div>
                        {/* <div className="col-md-1">

                        </div> */}
                    </div>
                </>
            ))}
        </div>
    );
};

export default Post;
