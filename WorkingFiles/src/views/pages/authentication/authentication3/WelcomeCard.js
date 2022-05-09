/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Grid, Box, Typography, Button } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Logo from 'components/Logo';

function WelcomeCard(props) {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    React.useEffect(() => {
        props.setIsEnabled();
    }, []);

    return (
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: 100 }}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 208px)' }}>
                    <div style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                        <Box alignItems="center" sx={{ mb: 2 }}>
                            <Logo color="#8D8D8D" width={70} textMargin={40} title="Widen Out" />
                        </Box>
                        <Typography variant="h2" style={{ fontSize: 40 }}>
                            <span style={{ fontWeight: 100 }}>This is where </span> <em>your group chats</em>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Here you will get a chance to connect with brothers and sisters from all around the world. Widen out is the best
                            way to stay connected with all your favorite groups and clubs
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    onClick={() => {
                                        props.onClick();
                                        console.log('hello');
                                    }}
                                    variant="outlined"
                                    sx={{
                                        cursor: 'unset',
                                        py: 0.5,
                                        px: 7,
                                        borderColor: `${theme.palette.warning.dark['#f57c00']} !important`,
                                        color: `${theme.palette.grey[900]}!important`,
                                        fontWeight: 500,
                                        borderRadius: `${customization.borderRadius}px`
                                    }}
                                    disableRipple
                                    // disabled
                                >
                                    Get started
                                </Button>
                            </AnimateButton>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default WelcomeCard;
