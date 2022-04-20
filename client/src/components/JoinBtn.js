/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../redux/actions/profileAction';

import Status from './groups/Status';

const JoinBtn = ({ user }) => {
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
            {followed ? (
                <>
                    <Status user={user} />
                    <button0 type="button" className="btn-1 hover-in-shadow outer-shadow" onClick={handleUnFollow}>
                        Leave Group
                    </button0>
                </>
            ) : (
                <button type="button" className="btn-1 hover-in-shadow outer-shadow" onClick={handleFollow}>
                    Join Group
                </button>
            )}
        </>
    );
};

export default JoinBtn;
