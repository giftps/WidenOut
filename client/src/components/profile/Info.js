/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import JoinBtn from '../JoinBtn';
import Following from './Following';
import Followers from './Followers';
import ChangePassword from './ChangePassword';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

import { addUser, getConversations } from '../../redux/actions/messageAction';

const Info = ({ id, auth, profile, dispatch }) => {
    const { message } = useSelector((state) => state);

    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const history = useNavigate();

    const handleAddUser = (user) => {
        // setSearch('');
        // setSearchUsers([]);
        dispatch(addUser({ user, message }));
        return history(`/message/${user._id}`);
    };
    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations({ auth }));
    }, [dispatch, auth, message.firstLoad]);

    const page = 10;
    useEffect(() => {
        if (message.resultUsers >= (page - 1) * 9 && page > 1) {
            dispatch(getConversations({ auth, page }));
        }
    }, [message.resultUsers, page, auth, dispatch]);

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        } else {
            const newData = profile.users.filter((user) => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [showFollowers, showFollowing, onEdit, dispatch]);

    return (
        <div className="info">
            {userData.map((user) => (
                <div key={user._id} className="info_container">
                    {(() => {
                        if (user.role === 'group') {
                            return (
                                <>
                                    <div
                                        className="outer-shadow d-flex justify-content-center align-items-center"
                                        style={{ borderRadius: '50%', height: '170px', width: '170px' }}
                                    >
                                        <Avatar src={user.avatar} size="supper-avatar" />
                                    </div>

                                    <div className="info_content">
                                        <div className="info_content_title">
                                            <h2>{user.fullname}</h2>
                                            {user._id === auth.user._id ? (
                                                <button
                                                    type="button"
                                                    className="btn-1 outer-shadow hover-in-shadow"
                                                    onClick={() => setChangePassword(true)}
                                                >
                                                    change password
                                                </button>
                                            ) : (
                                                ''
                                            )}
                                            {user._id === auth.user._id ? (
                                                <button
                                                    type="button"
                                                    className="btn-1 outer-shadow hover-in-shadow"
                                                    onClick={() => setOnEdit(true)}
                                                >
                                                    Edit Profile
                                                </button>
                                            ) : (
                                                <JoinBtn user={user} />
                                            )}
                                        </div>

                                        <div className="follow_btn">
                                            {/* Disable onClick for now📝😼/}
                      {/* <span className="mr-4" onClick={() => setShowFollowers(true)}> */}
                                            <span className="mr-4">{user.members.length} Members</span>
                                            {/* <span className="ml-4" onClick={() => setShowFollowing(true)}>
                        {user.following.length} Following
                      </span> */}
                                        </div>

                                        <h6>
                                            {user.username} <span className="color-violet">{user.mobile}</span>
                                        </h6>
                                        <p>{user.story}</p>
                                    </div>

                                    {onEdit && <EditProfile setOnEdit={setOnEdit} />}
                                    {changePassword && <ChangePassword setChangePassword={setChangePassword} />}

                                    {showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers} />}
                                    {showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing} />}
                                </>
                            );
                        }
                        if (user.role === 'user') {
                            return (
                                <>
                                    <div
                                        className="outer-shadow d-flex justify-content-center align-items-center"
                                        style={{ borderRadius: '50%', height: '170px', width: '170px' }}
                                    >
                                        <Avatar src={user.avatar} size="supper-avatar" />
                                    </div>

                                    <div className="info_content">
                                        <div className="info_content_title">
                                            <h2>{user.username}</h2>
                                            {user._id === auth.user._id ? (
                                                <button
                                                    type="button"
                                                    className="btn-1 outer-shadow hover-in-shadow"
                                                    onClick={() => setOnEdit(true)}
                                                >
                                                    Edit Profile
                                                </button>
                                            ) : (
                                                <FollowBtn user={user} />
                                            )}
                                            {user._id === auth.user._id ? (
                                                <button
                                                    type="button"
                                                    className="btn-1 outer-shadow hover-in-shadow"
                                                    onClick={() => setChangePassword(true)}
                                                >
                                                    change password
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn-1 hover-in-shadow outer-shadow"
                                                    onClick={() => handleAddUser(user)}
                                                >
                                                    <span className={`material-icons `}>email</span>
                                                </button>
                                            )}
                                        </div>

                                        <div className="follow_btn">
                                            <span className="mr-4" onClick={() => setShowFollowers(true)}>
                                                {user.followers.length} Followers
                                            </span>
                                            <span className="ml-4" onClick={() => setShowFollowing(true)}>
                                                {user.following.length} Following
                                            </span>
                                        </div>

                                        <h6>
                                            {user.fullname} <span className="color-violet">{user.mobile}</span>
                                        </h6>
                                        <p className="m-0">{user.address}</p>
                                        <h6>{user.email}</h6>
                                        <a style={{ textDecoration: 'none' }} href={user.website} target="_blank" rel="noreferrer">
                                            {user.website}
                                        </a>
                                        <p>{user.story}</p>
                                    </div>

                                    {onEdit && <EditProfile setOnEdit={setOnEdit} />}
                                    {changePassword && <ChangePassword setChangePassword={setChangePassword} />}

                                    {showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers} />}
                                    {showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing} />}
                                </>
                            );
                        }
                        return <div>You are a Admin.</div>;
                    })()}
                </div>
            ))}
        </div>
    );
};

export default Info;
