/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { register } from '../redux/actions/authAction';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import FormHelperText from '@mui/material/FormHelperText';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SwipeableViews from 'react-swipeable-views';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

// ** Import Global types
import { GLOBALTYPES } from '../redux/actions/globalTypes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            WidenOut {new Date().getFullYear()}.
        </Typography>
    );
}
const theme = createTheme();

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)'
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4'
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4'
        }
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1
    }
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#784af4'
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor'
    }
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
        }
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1
    }
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    }),
    ...(ownerState.completed && {
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
    })
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node
};

const Register = () => {
    const { auth, alert } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [isDone, setIsDone] = React.useState(false);
    const [errors, setErrors] = React.useState({
        password: '',
        cf_password: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        gender: '',
        tc: ''
    });

    const steps = ['Welcome', 'Quiz', 'Personal info'];

    // const wno_logo = 'https://res.cloudinary.com/exodussoftware/image/upload/v1642853916/widenout/logos/va6p2luteiqkyf9wlvuh.jpg';

    const initialState = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        cf_password: '',
        gender: '',
        tc: ''
    };
    const [userData, setUserData] = React.useState(initialState);
    // const { fullname, username, email, password, cf_password } = userData;
    const [skipped, setSkipped] = React.useState(new Set());
    const [activeStep, setActiveStep] = React.useState(0);
    const isStepSkipped = (step) => skipped.has(step);

    const isStepOptional = (step) => step === null;
    const [typePass, setTypePass] = React.useState(false);
    const [typeCfPass, setTypeCfPass] = React.useState(false);

    const [Question1, setQuestion1] = React.useState('');
    const [Question2, setQuestion2] = React.useState('');
    const [Question3, setQuestion3] = React.useState('');
    const [Question4, setQuestion4] = React.useState('');

    const handleQuestion1Change = (event) => {
        setQuestion1(event.target.value);
    };

    const handleQuestion2Change = (event) => {
        setQuestion2(event.target.value);
    };

    const handleQuestion3Change = (event) => {
        setQuestion3(event.target.value);
    };

    const handleQuestion4Change = (event) => {
        setQuestion4(event.target.value);
    };

    const handleQuestionSubmit = () => {
        if (Question1 !== 'B') {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Question 1 is wrong try again' } });
        } else if (Question2 !== 'B') {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Question 2 is wrong try again' } });
        } else if (Question3 !== 'C') {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Question 3 is wrong try again' } });
        } else if (Question4 !== 'D') {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Question 4 is wrong try again' } });
        } else {
            setIsDone(true);
            dispatch({ type: GLOBALTYPES.ALERT, payload: { succuss: 'Great! all questions are collect' } });

            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    React.useEffect(() => {
        if (auth.token) history.push('/');
    }, [auth.token, history]);

    const handleChangeQuestionIndex = (event, value) => {
        setQuestionIndex(value);
    };

    const handleChangeIndex = (index) => {
        setQuestionIndex(index);
    };

    const handleNext = () => {
        if (activeStep === 0 && !isDone) {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        } else {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Please make sure you answer all the question' } });
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   dispatch(register(userData));
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('gender'));
        setErrors({
            ...errors,
            password: '',
            cf_password: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            gender: '',
            tc: ''
        });

        // console.log(data.get('tc'))

        if (!data.get('firstName')) {
            setErrors({ ...errors, firstName: 'This field cannot be empty.' });
        } else if (!data.get('lastName')) {
            setErrors({ ...errors, lastName: 'This field cannot be empty.' });
        } else if (!data.get('username')) {
            setErrors({ ...errors, username: 'This field cannot be empty.' });
        } else if (!data.get('email')) {
            setErrors({ ...errors, email: 'This field cannot be empty.' });
        } else if (!data.get('password')) {
            setErrors({ ...errors, password: 'This field cannot be empty.' });
        } else if (data.get('password').length < 6) {
            setErrors({ ...errors, password: 'The password provided is not long enough.' });
        } else if (data.get('password') !== data.get('cf_password')) {
            setErrors({ ...errors, cf_password: 'Password and Confirm password does not match.' });
        } else if (!data.get('gender')) {
            setErrors({ ...errors, gender: 'Please select gender.' });
        } else if (!data.get('tc')) {
            setErrors({ ...errors, tc: 'Agree to  terms and conditions.' });
        } else {
            dispatch(
                register({
                    fullname: `${data.get('firstName')} ${data.get('lastName')}`,
                    username: data.get('username'),
                    email: data.get('email'),
                    password: data.get('password'),
                    cf_password: data.get('cf_password'),
                    gender: data.get('gender')
                })
            );
        }
    };

    return (
        <div>
            <Container maxWidth="md">
                <Box sx={{ width: '100%', margin: 'auto', paddingTop: 10 }}>
                    <Stepper alternativeLabel connector={<ColorlibConnector />} activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <>
                            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button variant="outlined" onClick={handleReset}>
                                    Reset
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            {activeStep === 0 ? (
                                <Box sx={{ mt: 2, mb: 1, padding: 10 }}>
                                    <Typography variant="h4" gutterBottom component="div">
                                        Welcome to JW WidenOut.
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom component="div">
                                        Here you will get a chance to connect with brothers and sisters from all around the world.
                                    </Typography>
                                </Box>
                            ) : activeStep === 1 ? (
                                <div>
                                    <Box
                                        sx={{
                                            mt: 2,
                                            mb: 1,
                                            width: '90%',
                                            alignItems: 'center',
                                            alignContent: 'center'
                                        }}
                                    >
                                        <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom component="div">
                                            Are you one of Jehovahs witnesses? Take the following quiz.
                                        </Typography>
                                        <Paper style={{ margin: 'auto', width: '90%', padding: 10 }} variant="outlined">
                                            <SwipeableViews index={questionIndex} onChangeIndex={handleChangeIndex}>
                                                {/* Question 1 */}

                                                <div style={{ padding: 10 }}>
                                                    <Typography variant="subtitle1" gutterBottom component="div">
                                                        1. ____________ is inspired of God and beneficial for teaching, for reproving, for
                                                        setting things straight, for disciplining in righteousness.
                                                    </Typography>
                                                    <FormControl>
                                                        <FormLabel id="demo-radio-buttons-group-label">Answers</FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-q1"
                                                            defaultValue="none"
                                                            name="radio-buttons-q1"
                                                            value={Question1}
                                                            onChange={handleQuestion1Change}
                                                        >
                                                            <FormControlLabel value="A" control={<Radio />} label="A.	Every scripture" />
                                                            <FormControlLabel value="B" control={<Radio />} label="B. All scripture" />
                                                            <FormControlLabel value="C" control={<Radio />} label="C. Any scripture" />
                                                            <FormControlLabel value="D" control={<Radio />} label="D. Each scripture" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>

                                                {/* Question 2 */}

                                                <div style={{ padding: 10 }}>
                                                    <Typography variant="subtitle1" gutterBottom component="div">
                                                        2. What happens when we die?
                                                    </Typography>
                                                    <FormControl>
                                                        <FormLabel id="demo-radio-buttons-group-label">Answers</FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="radio-buttons-group"
                                                            defaultValue="none"
                                                            name="radio-buttons-q2"
                                                            value={Question2}
                                                            onChange={handleQuestion2Change}
                                                        >
                                                            <FormControlLabel value="A" control={<Radio />} label="A. We go to heaven" />
                                                            <FormControlLabel
                                                                value="B"
                                                                control={<Radio />}
                                                                label="B. We are conscious of nothing "
                                                            />
                                                            <FormControlLabel
                                                                value="C"
                                                                control={<Radio />}
                                                                label="C. We are reincarnated into a different lifeform"
                                                            />
                                                            <FormControlLabel
                                                                value="D"
                                                                control={<Radio />}
                                                                label="D. We turn into angels"
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>

                                                {/* Question 3 */}

                                                <div style={{ padding: 10 }}>
                                                    <Typography variant="subtitle1" gutterBottom component="div">
                                                        3. Keep on, then, _____________the Kingdom and his righteousness, and all these
                                                        other things will be added to you
                                                    </Typography>
                                                    <FormControl>
                                                        <FormLabel id="demo-radio-buttons-group-label">Answers</FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="radio-buttons-group"
                                                            defaultValue="none"
                                                            name="radio-buttons-q2"
                                                            value={Question3}
                                                            onChange={handleQuestion3Change}
                                                        >
                                                            <FormControlLabel value="A" control={<Radio />} label="A. Searching for" />
                                                            <FormControlLabel value="B" control={<Radio />} label="B. Inviting " />
                                                            <FormControlLabel value="C" control={<Radio />} label="C. Seeking first" />
                                                            <FormControlLabel value="D" control={<Radio />} label="D. Praying for" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>

                                                {/* Question 4 */}

                                                <div style={{ padding: 10 }}>
                                                    <Typography variant="subtitle1" gutterBottom component="div">
                                                        4. Sophia has a little brother. What is his name?
                                                    </Typography>
                                                    <FormControl>
                                                        <FormLabel id="demo-radio-buttons-group-label">Answers</FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="radio-buttons-group"
                                                            defaultValue="none"
                                                            name="radio-buttons-q4"
                                                            value={Question4}
                                                            onChange={handleQuestion4Change}
                                                        >
                                                            <FormControlLabel value="A" control={<Radio />} label="A.	Joseph" />
                                                            <FormControlLabel value="B" control={<Radio />} label="B. Mattew" />
                                                            <FormControlLabel value="C" control={<Radio />} label="C. Luke" />
                                                            <FormControlLabel value="D" control={<Radio />} label="D. Caleb" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </SwipeableViews>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    disabled={questionIndex === 0}
                                                    onClick={() => {
                                                        if (questionIndex !== 0) handleChangeQuestionIndex('sub', questionIndex - 1);
                                                    }}
                                                >
                                                    Back
                                                </Button>
                                                {questionIndex === 3 ? (
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            handleQuestionSubmit();
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => {
                                                            handleChangeQuestionIndex('next', questionIndex + 1);
                                                        }}
                                                    >
                                                        Next Question
                                                    </Button>
                                                )}
                                            </div>
                                        </Paper>
                                    </Box>
                                </div>
                            ) : (
                                <ThemeProvider theme={theme}>
                                    <Container component="main" maxWidth="xs">
                                        <CssBaseline />
                                        <Box
                                            sx={{
                                                marginTop: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ width: 100, height: 100 }}>
                                                <img style={{ width: '100%' }} src="./WidenOut-logo.png" alt="logo" />
                                            </div>
                                            <Typography component="h1" variant="h5">
                                                WidenOut
                                            </Typography>
                                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            error={errors.firstName !== ''}
                                                            helperText={errors.firstName}
                                                            autoComplete="given-name"
                                                            name="firstName"
                                                            required
                                                            fullWidth
                                                            id="firstName"
                                                            label="First Name"
                                                            autoFocus
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="lastName"
                                                            label="Last Name"
                                                            name="lastName"
                                                            autoComplete="family-name"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={errors.username !== ''}
                                                            helperText={errors.username}
                                                            required
                                                            fullWidth
                                                            id="username"
                                                            label="Username"
                                                            name="username"
                                                            autoComplete="username"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={errors.email !== ''}
                                                            helperText={errors.email}
                                                            required
                                                            fullWidth
                                                            id="email"
                                                            label="Email Address"
                                                            name="email"
                                                            autoComplete="email"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            error={errors.password !== ''}
                                                            fullWidth
                                                            name="password"
                                                            label="Password"
                                                            type="password"
                                                            id="password"
                                                            autoComplete="new-password"
                                                            helperText={errors.password}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            error={errors.cf_password !== ''}
                                                            fullWidth
                                                            name="cf_password"
                                                            label="Confirm Password"
                                                            type="password"
                                                            id="cf_password"
                                                            autoComplete="cf_password"
                                                            helperText={errors.cf_password}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControl sx={{ m: 3 }} error={errors.gender !== ''} variant="standard">
                                                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                                name="gender"
                                                            >
                                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                            </RadioGroup>
                                                            <FormHelperText>{errors.gender}</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControl sx={{ m: 3 }} error={errors.tc !== ''} variant="standard">
                                                            <FormControlLabel
                                                                name="tc"
                                                                error={errors.tc !== ''}
                                                                control={<Checkbox value="i_agree" color="primary" />}
                                                                label="I agree to terms and conditions."
                                                            />
                                                        </FormControl>
                                                        <FormHelperText>{errors.tc}</FormHelperText>
                                                    </Grid>
                                                </Grid>
                                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                                    Sign Up
                                                </Button>
                                                <Grid container justifyContent="flex-end">
                                                    <Grid item>
                                                        <Link to="/" variant="body2">
                                                            Already have an account? Sign in
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Box>
                                        <Copyright sx={{ mt: 5 }} />
                                    </Container>
                                </ThemeProvider>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button color="inherit" variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button variant="contained" color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                <Button variant="contained" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default Register;
