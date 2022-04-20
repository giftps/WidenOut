/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import UserCard from '../UserCard';
import FollowBtn from '../FollowBtn';
import { useSelector } from 'react-redux';

const Following = ({ users, setShowFollowing }) => {
    const { auth } = useSelector((state) => state);
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center follow_box-heading">Following</h5>
                <hr />
                {users.map((user) => (
                    <UserCard key={user._id} setShowFollowing={setShowFollowing} user={user}>
                        {auth.user._id !== user._id && <FollowBtn user={user} />}
                    </UserCard>
                ))}

                <div className="close" onClick={() => setShowFollowing(false)}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default Following;
