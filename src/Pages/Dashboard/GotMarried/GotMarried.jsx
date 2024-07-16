import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const GotMarried = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const successStory = {
            userId: user.uid,
            userName: user.displayName,
            selfBiodataId: form.SelfBiodataId.value,
            partnerBiodataId: form.PartnerBiodataId.value,
            coupleImage: form.CoupleImage.value,
            story: form.story.value,
            createdAt: new Date()
        };

        try {
            await axiosSecure.post(`/successStory`, successStory);
            Swal.fire({
                title: 'Success!',
                text: 'Your success story has been submitted.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            form.reset();  // Reset form after submission
        } catch (error) {
            console.error('Error submitting success story:', error);
            Swal.fire({
                title: 'Error!',
                text: `Could not submit your success story. Please try again later.`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Box className="p-4">
            <div data-aos="zoom-out-down">  
            <SectionTitle subHeading="Got Married" heading="Share Your Success Story" />
            </div>
            <div data-aos="zoom-in-down">  
            <Box mt={8} p={4} bgcolor="white" boxShadow={3} borderRadius={0}>
                <Typography variant="h4" align="center" gutterBottom>
                    <span className="text-blue-500 font-bold">Tell Us About Your Journey</span>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Self Biodata Id"
                        name="SelfBiodataId"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        label="Partner Biodata Id"
                        name="PartnerBiodataId"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        label="Couple Image Link"
                        name="CoupleImage"
                        type="url"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Success Story Review"
                        name="story"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4 h-12 bg-blue-600 hover:bg-blue-700"
                    >
                        <span className="md:text-xl">Submit</span>
                    </Button>
                </form>
                <Typography variant="body1" align="center" className="mt-4">
                    Go to{" "}
                    <Link to="/biodatas" className="text-blue-500 font-bold">
                        Biodatas
                    </Link>
                </Typography>
            </Box>
            </div>
        </Box>
    );
};

export default GotMarried;
