import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Avatar, TextField, Typography, Divider, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { GLOBALTYPES } from 'redux/actions/globalTypes';

// chart data
import StatusModal from 'components/StatusModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const PostCard = ({ isLoading }) => {
    const theme = useTheme();
    const { auth, profile, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <MainCard>
                <Grid container justifyContent="center">
                    <div style={{ padding: 5 }}>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                            Create new post
                        </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Divider />
                    </div>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <Avatar
                            src={auth.avatar}
                            sx={{
                                ...theme.typography.mediumAvatar,
                                margin: '8px 0 8px 8px !important',
                                width: 45,
                                height: 45,
                                cursor: 'pointer'
                            }}
                        />
                        <div
                            style={{
                                width: '100%',
                                height: 50,
                                marginTop: 5,
                                marginLeft: 5,
                                backgroundColor: '#F7F7F7',
                                borderRadius: 20,
                                padding: 10
                            }}
                        >
                            {auth.user.username}, widen out...
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Divider />
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-star', marginTop: 5 }}>
                        <Button onClick={() => handleOpen()} style={{ marginRight: 10 }}>
                            Camera
                        </Button>
                        <Button>Photos</Button>
                    </div>
                </Grid>

                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <StatusModal />
                    </Box>
                </Modal>
            </MainCard>
        </>
    );
};

PostCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PostCard;
