import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import PostCard from './PostCard';
import { gridSpacing } from 'store/constant';

import { useSelector } from 'react-redux';

import Posts from 'components/home/Posts';
import Status from 'components/home/Status';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const { homePosts } = useSelector((state) => state);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid sx={{ marginTop: 4 }} xs={20} md={8}>
                <PostCard isLoading={isLoading} />
            </Grid>
            <Grid xs={20} md={8}>
                <Posts />
                {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
