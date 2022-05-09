import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../../../redux/actions/adminAction';

const RegisterAdmin = () => {
    const { auth, alert, socket } = useSelector((state) => state);

    const dispatch = useDispatch();
    const history = useNavigate();

    const initialState = {
        name: '',
        about: ''
    };
    const [userData, setUserData] = useState(initialState);
    const { name, about } = userData;

    useEffect(() => {
        if (auth.token) history.push('/');
    }, [auth.token, history]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   dispatch(createGroup({ userData, auth, socket }));
    //   setUserData(initialState);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createGroup({ name, about, auth, socket }));
    };

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                </div>
                <div className="status_body">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={handleChangeInput}
                        value={name}
                        name="name"
                        style={{ background: `${alert.name ? '#fd2d6a14' : ''} ` }}
                        placeholder={`${auth.user.username}, Group Name`}
                    />
                    <input
                        type="text"
                        className="form-control"
                        id="about"
                        onChange={handleChangeInput}
                        value={about}
                        name="about"
                        style={{ background: `${alert.about ? '#fd2d6a14' : ''} ` }}
                        placeholder={`${auth.user.username}, About Group`}
                    />
                </div>
                <div className="status_footer">
                    <button type="submit" className="btn btn-primary w-100">
                        Post
                    </button>
                </div>
            </form>
            {/* <form onSubmit={handleSubmit} className="inner-shadow">
        <h3 className="text-uppercase text-center mb-4 auth-heading">
          Create New Group
        </h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <div className="outer-shadow hover-in-shadow form-input-wrap">
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={handleChangeInput}
              value={name}
              name="name"
              style={{ background: `${alert.name ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.name ? alert.name : ""}
          </small>
        </div>

        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About
          </label>
          <div className="outer-shadow hover-in-shadow form-input-wrap">
            <input
              type="text"
              className="form-control"
              id="about"
              onChange={handleChangeInput}
              value={about}
              name="about"
              style={{ background: `${alert.about ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.about ? alert.about : ""}
          </small>
        </div>


        <button
          type="submit"
          className="btn-1 w-100 d-flex outer-shadow hover-in-shadow justify-content-center"
        >
          Create
        </button>
      </form> */}
        </div>
    );
};

export default RegisterAdmin;
