/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-curly-brace-presence */
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { Divider, Stack, List, ListItem, ListItemAvatar, ListItemText, Grid, Avatar, Typography, useMediaQuery } from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import MainCard from 'ui-component/cards/MainCard';
// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import WelcomeCard from './WelcomeCard';
import Quiz from './quiz';
import RegisterForm from '../auth-forms/AuthRegister';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'components/Logo';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            WidenOut {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

const Register = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isDisabled, setisDisabled] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const { auth, status, modal, userType } = useSelector((state) => state);

    React.useEffect(() => {
        if (userType === 'user' && auth.token) navigate('/feeds');
    }, [userType]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = [
        {
            label: 'Welcome to JW WidenOut.',
            footNote: 'Get a chance to connect',
            description: <WelcomeCard setIsEnabled={() => setisDisabled(false)} onClick={handleNext} />,
            isFullScreen: false
        },
        {
            label: 'Are you one of Jehovahs witnesses?',
            footNote: 'Take the following quiz. Answer all the given questions',
            description: <Quiz isDone={() => setRegister(true)} setIsDisabled={() => setisDisabled(true)} />,
            isFullScreen: false
        },
        {
            label: 'Register',
            footNote: 'new account',
            description: `Loading...`,
            isFullScreen: true
        }
    ];

    const maxSteps = steps.length;

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    {register ? (
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item sx={{ mb: 1 }}>
                                            <Link to="#" style={{ textDecoration: 'none' }}>
                                                <Logo width={40} title="Widen Out" />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                direction={matchDownSM ? 'column-reverse' : 'row'}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Grid item>
                                                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                        <Typography
                                                            color={theme.palette.secondary.main}
                                                            gutterBottom
                                                            variant={matchDownSM ? 'h3' : 'h2'}
                                                        >
                                                            Sign up
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="16px"
                                                            textAlign={matchDownSM ? 'center' : 'inherit'}
                                                        >
                                                            Enter your credentials to continue
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <RegisterForm />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={Link}
                                                    to="/login"
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Already have an account?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Box sx={{ maxWidth: 800, flexGrow: 1 }}>
                                <CardWrapper border={false} content={false}>
                                    <Box sx={{ p: 2 }}>
                                        <List sx={{ py: 0 }}>
                                            <ListItem alignItems="center" disableGutters sx={{ py: 0, maxHeight: 25 }}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            // ...theme.typography.commonAvatar,
                                                            backgroundColor: theme.palette.warning.light,
                                                            color: theme.palette.warning.dark
                                                        }}
                                                    >
                                                        <StorefrontTwoToneIcon fontSize="inherit" />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    sx={{
                                                        py: 0,
                                                        p: 0
                                                    }}
                                                    primary={<Typography variant="h4">{steps[activeStep].label}</Typography>}
                                                    secondary={
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                color: theme.palette.grey[500],
                                                                mt: 0
                                                            }}
                                                        >
                                                            {steps[activeStep].footNote}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </CardWrapper>

                                <Box
                                    style={{ overflow: 'auto' }}
                                    sx={{ minHeight: 'calc(100vh - 118px)', maxWidth: 800, width: '100%', p: 2 }}
                                >
                                    {steps[activeStep].description}
                                </Box>
                                <MobileStepper
                                    variant="text"
                                    steps={maxSteps}
                                    position="static"
                                    activeStep={activeStep}
                                    nextButton={
                                        <Button type="button" size="small" onClick={handleNext} disabled={isDisabled}>
                                            Next
                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                            Back
                                        </Button>
                                    }
                                />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Register;
