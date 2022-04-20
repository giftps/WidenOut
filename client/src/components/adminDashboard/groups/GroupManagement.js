import React from 'react';
import '../main/Main.css';
import { useSelector } from 'react-redux';
import CreateGroup from './CreateGroup';

const AdminManagement = () => {
    const { auth } = useSelector((state) => state);
    return (
        <div className="main_admin">
            <div className="main__container">
                <div className="main__title">
                    <div className="main__greeting">
                        <h1>Hello {auth.user.username}</h1>
                        <p>Welcome to your Admin Management</p>
                    </div>
                </div>
                <CreateGroup />
            </div>
        </div>
    );
};

export default AdminManagement;
