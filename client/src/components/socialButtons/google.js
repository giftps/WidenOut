import React, { useCallback, useRef, useState } from "react";
import {
    LoginSocialGoogle
} from 'reactjs-social-login'
import { GoogleLoginButton } from "react-social-login-buttons";

const SocialGoogle = () => {
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState()
    const googleRef = useRef(null)

    const onLoginStart = useCallback(() => {
        alert('login start')
    }, [])

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
    }, [])

    return (
        <LoginSocialGoogle
            ref={googleRef}
            client_id={'844845104372-h8htjngp1os1tb79nksc54dq7tko4r8n.apps.googleusercontent.com'}
            //   onLogoutFailure={onLogoutFailure}
            onLoginStart={onLoginStart}
            onLogoutSuccess={onLogoutSuccess}
            onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider)
                setProfile(data)
            }}
            onReject={(err) => {
                console.log(err)
            }}
        >
            <GoogleLoginButton>
                <span>Google</span>
            </GoogleLoginButton>
        </LoginSocialGoogle>
    );

}

export default SocialGoogle;