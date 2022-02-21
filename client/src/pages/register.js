import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SwipeableViews from "react-swipeable-views";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
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
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
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
  icon: PropTypes.node,
};

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [questionIndex, setQuestionIndex] = React.useState(0);

  const steps = ["Welcome", "Quiz", "Personal info"];

  const wno_logo =
    "https://res.cloudinary.com/exodussoftware/image/upload/v1642853916/widenout/logos/va6p2luteiqkyf9wlvuh.jpg";

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = React.useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = React.useState(false);
  const [typeCfPass, setTypeCfPass] = React.useState(false);

  const [Question1, setQuestion1] = React.useState("");
  const [Question2, setQuestion2] = React.useState("");
  const [Question3, setQuestion3] = React.useState("");
  const [Question4, setQuestion4] = React.useState("");

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
    console.log(Question1);
    console.log(Question2);
    console.log(Question3);
    console.log(Question4);
  };

  React.useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeQuestionIndex = (event, value) => {
    setQuestionIndex(value);
  };

  const handleChangeIndex = (index) => {
    setQuestionIndex(index);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ width: "100%", margin: "auto", paddingTop: 10 }}>
          <Stepper
            alternativeLabel
            connector={<ColorlibConnector />}
            activeStep={activeStep}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <Box sx={{ mt: 2, mb: 1, padding: 10 }}>
                  <Typography variant="h4" gutterBottom component="div">
                    Welcome to JW WidenOut.
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Here you will get a chance to connect with brothers and
                    sisters from all around the world.
                  </Typography>
                </Box>
              ) : activeStep === 1 ? (
                <div>
                  <Box
                    sx={{
                      mt: 2,
                      mb: 1,
                      width: "90%",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Typography
                      style={{ textAlign: "center" }}
                      variant="h6"
                      gutterBottom
                      component="div"
                    >
                      Are you one of Jehovahs witnesses? Take the following
                      quiz.
                    </Typography>
                    <Paper
                      style={{ margin: "auto", width: "90%", padding: 10 }}
                      variant="outlined"
                    >
                      <SwipeableViews
                        index={questionIndex}
                        onChangeIndex={handleChangeIndex}
                      >
                        {/* Question 1 */}

                        <div style={{ padding: 10 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            1. ____________ is inspired of God and beneficial
                            for teaching, for reproving, for setting things
                            straight, for disciplining in righteousness.
                          </Typography>
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Answers
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-q1"
                              defaultValue="none"
                              name="radio-buttons-q1"
                              value={Question1}
                              onChange={handleQuestion1Change}
                            >
                              <FormControlLabel
                                value="q1A"
                                control={<Radio />}
                                label="A.	Every scripture"
                              />
                              <FormControlLabel
                                value="q1B"
                                control={<Radio />}
                                label="B. All scripture"
                              />
                              <FormControlLabel
                                value="q1C"
                                control={<Radio />}
                                label="C. Any scripture"
                              />
                              <FormControlLabel
                                value="q1D"
                                control={<Radio />}
                                label="D. Each scripture"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>

                        {/* Question 2 */}

                        <div style={{ padding: 10 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            2. What happens when we die?
                          </Typography>
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Answers
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="radio-buttons-group"
                              defaultValue="none"
                              name="radio-buttons-q2"
                              value={Question2}
                              onChange={handleQuestion2Change}
                            >
                              <FormControlLabel
                                value="q2A"
                                control={<Radio />}
                                label="A. We go to heaven"
                              />
                              <FormControlLabel
                                value="q2B"
                                control={<Radio />}
                                label="B. We are conscious of nothing "
                              />
                              <FormControlLabel
                                value="q2C"
                                control={<Radio />}
                                label="C. We are reincarnated into a different lifeform"
                              />
                              <FormControlLabel
                                value="q2D"
                                control={<Radio />}
                                label="D. We turn into angels"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>

                        {/* Question 3 */}

                        <div style={{ padding: 10 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            3. Keep on, then, _____________the Kingdom and his
                            righteousness, and all these other things will be
                            added to you
                          </Typography>
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Answers
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="radio-buttons-group"
                              defaultValue="none"
                              name="radio-buttons-q2"
                              value={Question3}
                              onChange={handleQuestion3Change}
                            >
                              <FormControlLabel
                                value="q3A"
                                control={<Radio />}
                                label="A. Searching for"
                              />
                              <FormControlLabel
                                value="q3B"
                                control={<Radio />}
                                label="B. Inviting "
                              />
                              <FormControlLabel
                                value="q3C"
                                control={<Radio />}
                                label="C. Seeking first"
                              />
                              <FormControlLabel
                                value="q4D"
                                control={<Radio />}
                                label="D. Praying for"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>

                        {/* Question 4 */}

                        <div style={{ padding: 10 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            4. Sophia has a little brother. What is his name?
                          </Typography>
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Answers
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="radio-buttons-group"
                              defaultValue="none"
                              name="radio-buttons-q4"
                              value={Question4}
                              onChange={handleQuestion4Change}
                            >
                              <FormControlLabel
                                value="q4A"
                                control={<Radio />}
                                label="A.	Joseph"
                              />
                              <FormControlLabel
                                value="q4B"
                                control={<Radio />}
                                label="B. Mattew"
                              />
                              <FormControlLabel
                                value="q4C"
                                control={<Radio />}
                                label="C. Luke"
                              />
                              <FormControlLabel
                                value="q4D"
                                control={<Radio />}
                                label="D. Caleb"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </SwipeableViews>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outlined"
                          disabled={questionIndex === 0}
                          onClick={() => {
                            if (questionIndex != 0)
                              handleChangeQuestionIndex(
                                "sub",
                                questionIndex - 1
                              );
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
                              handleChangeQuestionIndex(
                                "next",
                                questionIndex + 1
                              );
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
                <div className="auth_page">
                  <form onSubmit={handleSubmit} className="inner-shadow">
                    <h3 className="text-uppercase text-center mb-4 auth-heading">
                      <img src={wno_logo} alt="logo" width="200" />
                    </h3>
                    <div className="mb-3">
                      <label htmlFor="fullname" className="form-label">
                        Full name
                      </label>
                      <div className="outer-shadow hover-in-shadow form-input-wrap">
                        <input
                          type="text"
                          className="form-control"
                          id="fullname"
                          onChange={handleChangeInput}
                          value={fullname}
                          name="fullname"
                          style={{
                            background: `${alert.fullname ? "#fd2d6a14" : ""} `,
                          }}
                        />
                      </div>
                      <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ""}
                      </small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        User name
                      </label>
                      <div className="outer-shadow hover-in-shadow form-input-wrap">
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          onChange={handleChangeInput}
                          value={username.toLowerCase().replace(/ /g, "")}
                          name="username"
                          style={{
                            background: `${alert.username ? "#fd2d6a14" : ""} `,
                          }}
                        />
                      </div>
                      <small className="form-text text-danger">
                        {alert.username ? alert.username : ""}
                      </small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <div className="outer-shadow hover-in-shadow form-input-wrap">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          aria-describedby="emailHelp"
                          onChange={handleChangeInput}
                          value={email}
                          name="email"
                          style={{
                            background: `${alert.email ? "#fd2d6a14" : ""} `,
                          }}
                        />
                      </div>
                      <small className="form-text text-danger">
                        {alert.email ? alert.email : ""}
                      </small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="pass">
                        <div className="outer-shadow hover-in-shadow form-input-wrap">
                          <input
                            type={typePass ? "text" : "password"}
                            className="form-control"
                            id="password"
                            onChange={handleChangeInput}
                            value={password}
                            name="password"
                            style={{
                              background: `${
                                alert.password ? "#fd2d6a14" : ""
                              } `,
                            }}
                          />
                          <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? "Hide" : "Show"}
                          </small>
                        </div>
                      </div>
                      <small className="form-text text-danger">
                        {alert.password ? alert.password : ""}
                      </small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cf_password" className="form-label">
                        Confirm Password
                      </label>
                      <div className="pass">
                        <div className="outer-shadow hover-in-shadow form-input-wrap">
                          <input
                            type={typeCfPass ? "text" : "password"}
                            className="form-control"
                            id="cf_password"
                            onChange={handleChangeInput}
                            value={cf_password}
                            name="cf_password"
                            style={{
                              background: `${
                                alert.cf_password ? "#fd2d6a14" : ""
                              } `,
                            }}
                          />
                          <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? "Hide" : "Show"}
                          </small>
                        </div>
                      </div>
                      <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ""}
                      </small>
                    </div>

                    <div className="d-flex justify-content-evenly  mx-0 mb-1">
                      <label htmlFor="male">
                        Male:
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          defaultChecked
                          onChange={handleChangeInput}
                        />
                      </label>

                      <label htmlFor="female">
                        Female:
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          onChange={handleChangeInput}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn-1 w-100 d-flex outer-shadow hover-in-shadow justify-content-center"
                    >
                      Register
                    </button>
                    <p className="my-2">
                      Already have an account?{" "}
                      <Link to="/" style={{ color: "crimson" }}>
                        Login Now.
                      </Link>
                    </p>
                  </form>
                </div>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleSkip}
                    sx={{ mr: 1 }}
                  >
                    Skip
                  </Button>
                )}

                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Register;
