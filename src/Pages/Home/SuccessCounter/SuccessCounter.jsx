import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { Card, Grid, Paper, Typography, colors } from '@mui/material';

const SuccessCounter = () => {
    const axiosSecure = useAxiosSecure();
    const [counters, setCounters] = useState({
        totalBiodata: 0,
        girlsBiodata: 0,
        boysBiodata: 0,
        completedMarriages: 0
    });

    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const response = await axiosSecure.get('/counters');
                setCounters(response.data);
            } catch (error) {
                console.error('Failed to fetch counters', error);
            }
        };

        fetchCounters();
    }, []);

    return (
        <div>
            <div data-aos="zoom-in-down">
                <SectionTitle
                    subHeading={"Site Summary Section"}
                    heading={"Success Counter"}>
                </SectionTitle>
            </div>

            <Paper elevation={3} className="p-4 bg-blue-100 rounded-lg shadow-md" sx={{ boxShadow: 'shadow', borderRadius: 'lg' }}>
                {/* <Typography variant="h4" className="mb-4">Success Counters</Typography> */}

                {/* <Grid container spacing={3}> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* <Paper elevation={3} className="p-4 bg-white rounded-lg shadow"> */}
                        <div data-aos="zoom-out-down">
                            <Paper elevation={3} className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-blue-300" sx={{ backgroundColor: 'ButtonHighlight' }}>
                                <Typography variant="h5" className="mb-2">Total Biodata</Typography>
                                <Typography variant="h4">{counters.totalBiodata}</Typography>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* <Paper elevation={3} className="p-4 bg-white rounded-lg shadow"> */}
                        <div data-aos="zoom-out-down">
                            <Paper elevation={3} className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-blue-300" sx={{ backgroundColor: 'ButtonHighlight' }}>
                                <Typography variant="h5" className="mb-2">Girls Biodata</Typography>
                                <Typography variant="h4">{counters.girlsBiodata}</Typography>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* <Paper elevation={3} className="p-4 bg-white rounded-lg shadow"> */}
                        <div data-aos="zoom-out-down">
                            <Paper elevation={3} className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-blue-300" sx={{ backgroundColor: 'ButtonHighlight' }}>
                                <Typography variant="h5" className="mb-2">Boys Biodata</Typography>
                                <Typography variant="h4">{counters.boysBiodata}</Typography>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* <Paper elevation={3} className="p-4 bg-white rounded-lg shadow"> */}
                        <div data-aos="zoom-out-down">
                            <Paper elevation={3} className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-blue-300" sx={{ backgroundColor: 'ButtonHighlight' }}>
                                <Typography variant="h5" className="mb-2">Completed Marriages</Typography>
                                <Typography variant="h4">{counters.completedMarriages}</Typography>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default SuccessCounter;
