import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import GoogleLogin from 'react-google-login';
import { adminLogin, login } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const SocialGoogle = () => {
    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        console.log(response);

        dispatch(login({
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            isSocialLogin: true,
            socialData: response.profileObj
        }));
    }

    return (
        <div>
            <GoogleLogin
                clientId="113649802903-9fdu7i78s8gs6tinartftj1jjlfci91k.apps.googleusercontent.com"
                render={renderProps => (
                    <GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled} >
                        Google
                    </GoogleLoginButton>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                scope='profile'
            />
        </div>
    );

}

export default SocialGoogle;