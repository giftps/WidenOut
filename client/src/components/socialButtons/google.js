import React from 'react';
import GoogleLogin from 'react-google-login';
import { login } from '../../redux/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery } from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';
import Google from 'assets/images/icons/social-google.svg';

const SocialGoogle = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const { auth, status, modal, userType } = useSelector((state) => state);

    React.useEffect(() => {
        if (userType === 'user' && auth.token) navigate('/feeds');
    }, [auth]);

    const responseGoogle = (response) => {
        // console.log(response);

        dispatch(
            login({
                email: response.profileObj.email,
                password: response.profileObj.googleId,
                isSocialLogin: true,
                socialData: response.profileObj
            })
        );
    };

    const failure = (error) => {
        // console.log(error);
    };

    return (
        <div>
            <GoogleLogin
                clientId="113649802903-9fdu7i78s8gs6tinartftj1jjlfci91k.apps.googleusercontent.com"
                render={(renderProps) => (
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={() => renderProps.onClick()}
                            // disabled={() => renderProps.disabled()}
                            size="large"
                            variant="outlined"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign in with Google
                        </Button>
                    </AnimateButton>
                )}
                buttonText="Login"
                onSuccess={(responce) => responseGoogle(responce)}
                onFailure={(error) => failure(error)}
                cookiePolicy="single_host_origin"
                scope="profile"
            />
        </div>
    );
};

export default SocialGoogle;
