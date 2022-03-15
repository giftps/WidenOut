import React, { useCallback, useRef, useState } from "react";
import {
    LoginSocialFacebook
} from 'reactjs-social-login'
import { FacebookLoginButton } from "react-social-login-buttons";

const SocialFacebook = () => {
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState()
    const facebookRef = useRef(null)

    const onLoginStart = useCallback(() => {
        alert('login start')
    }, [])

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
    }, [])

    return (
        <LoginSocialFacebook
            ref={facebookRef}
            appId={'657319568198782'}
            // onLoginStart={onLoginStart}
            onLogoutSuccess={ onLogoutSuccess }
            onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider)
                setProfile(data)
            }}
            onReject={(err) => {
                console.log(err)
            }}
        >
            <FacebookLoginButton>
                <span>Facebook</span>
            </FacebookLoginButton>
        </LoginSocialFacebook>
    );

}

export default SocialFacebook;