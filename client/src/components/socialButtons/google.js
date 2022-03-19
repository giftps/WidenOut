import React from "react";
// import {
//     LoginSocialGoogle
// } from 'reactjs-social-login'
// import { GoogleLoginButton } from "react-social-login-buttons";
import GoogleLogin from 'react-google-login';
// import { GoogleLogin } from 'react-google-login';

const SocialGoogle = () => {
    // const [provider, setProvider] = useState('')
    // const [profile, setProfile] = useState()
    // const googleRef = useRef(null)

    // const onLoginStart = useCallback(() => {
    //     alert('login start')
    // }, [])

    // const onLogoutSuccess = useCallback(() => {
    //     setProfile(null)
    //     setProvider('')
    //     alert('logout success')
    // }, [])

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <div>
            <GoogleLogin
        clientId="326538060414-5vqrgaosddu857h2siom011r796tfl4j.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
        </div>
    );

}

export default SocialGoogle;