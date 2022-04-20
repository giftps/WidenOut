/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SwipeableViews from 'react-swipeable-views';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// material icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// ** Import Global types
import { GLOBALTYPES } from 'redux/actions/globalTypes';

function Quiz(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [isDone, setIsDone] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(2);
    const [skipped, setSkipped] = React.useState(new Set());

    const [Question1, setQuestion1] = React.useState('');
    const [Question2, setQuestion2] = React.useState('');
    const [Question3, setQuestion3] = React.useState('');
    const [Question4, setQuestion4] = React.useState('');

    React.useEffect(() => {
        props.setIsDisabled();
    }, []);

    const handleChangeIndex = (index) => {
        setQuestionIndex(index);
    };

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

    const handleChangeQuestionIndex = (event, value) => {
        setQuestionIndex(value);
    };

    const isStepSkipped = (step) => skipped.has(step);

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
            props.isDone();
        }
    };

    return (
        <div>
            <MainCard border elevation={1} content={false} boxShadow shadow={theme.shadows[1]}>
                <div style={{ maxHeight: 'calc(100vh - 368px)', maxWidth: '90vw', overflow: 'hidden' }}>
                    <SwipeableViews index={questionIndex} onChangeIndex={handleChangeIndex}>
                        {/* Question 1 */}

                        <div style={{ padding: 10 }}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                1. ____________ is inspired of God and beneficial for teaching, for reproving, for setting things straight,
                                for disciplining in righteousness.
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
                                    <FormControlLabel value="B" control={<Radio />} label="B. We are conscious of nothing " />
                                    <FormControlLabel
                                        value="C"
                                        control={<Radio />}
                                        label="C. We are reincarnated into a different lifeform"
                                    />
                                    <FormControlLabel value="D" control={<Radio />} label="D. We turn into angels" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {/* Question 3 */}

                        <div style={{ padding: 10 }}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                3. Keep on, then, _____________the Kingdom and his righteousness, and all these other things will be added
                                to you
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
                </div>
            </MainCard>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}
            >
                <Button
                    variant="outlined"
                    disabled={questionIndex === 0}
                    startIcon={<ArrowBackIosIcon />}
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
                        endIcon={<ArrowForwardIosIcon />}
                        variant="outlined"
                        onClick={() => {
                            handleChangeQuestionIndex('next', questionIndex + 1);
                        }}
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Quiz;
