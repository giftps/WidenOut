import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerGroup } from "../../../redux/actions/authAction";

const RegisterGroup = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    story: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, story} = userData;

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userData.role = "group";
    userData.email = "group-admin@widenout.com";
    userData.password = "group-password";
    userData.cf_password = "group-password";
    // console.log(userData);
    dispatch(registerGroup(userData));
    setUserData(initialState);
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} className="inner-shadow">
        <h3 className="text-uppercase text-center mb-4 auth-heading">
          Create New Group
        </h3>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Group name
          </label>
          <div className="outer-shadow hover-in-shadow form-input-wrap">
            <input
              type="text"
              className="form-control"
              id="fullname"
              onChange={handleChangeInput}
              value={fullname}
              name="fullname"
              style={{ background: `${alert.fullname ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>

        <div className="mb-3">
          <label htmlFor="story" className="form-label">
            About group
          </label>
          <div className="outer-shadow hover-in-shadow form-input-wrap">
            <input
              type="text"
              className="form-control"
              id="story"
              onChange={handleChangeInput}
              value={story}
              name="story"
              style={{ background: `${alert.story ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.story ? alert.story : ""}
          </small>
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Group slug name
          </label>
          <div className="outer-shadow hover-in-shadow form-input-wrap">
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={handleChangeInput}
              value={username.toLowerCase().replace(/ /g, "")}
              name="username"
              style={{ background: `${alert.username ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <button
          type="submit"
          className="btn-1 w-100 d-flex outer-shadow hover-in-shadow justify-content-center"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default RegisterGroup;
