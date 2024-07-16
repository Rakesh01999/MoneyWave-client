import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const ViewBiodata = () => {
    const { user } = useAuth(AuthContext);
    const [biodatas, setBiodatas] = useState([]);
    const [filteredBiodata, setFilteredBiodata] = useState([]);
    const axiosSecure = useAxiosSecure();

    // console.log("User Email:", user?.email);

    useEffect(() => {
        const fetchBiodatas = async () => {
            try {
                const response = await axiosSecure.get('https://matrimony-server-chi.vercel.app/biodatas');
                setBiodatas(response.data);
            } catch (error) {
                console.error('Error fetching biodatas:', error);
            }
        };

        fetchBiodatas();
    }, [axiosSecure]);

    useEffect(() => {
        if (biodatas.length > 0 && user) {
            console.log("Filtering biodatas for user:", user.email);
            const foundBiodata = biodatas.filter(bio => bio.ContactEmail === user.email);
            // const foundBiodata = biodatas.find(bio => bio.ContactEmail === user.email);
            setFilteredBiodata(foundBiodata);
            // console.log("Filtered biodata:", foundBiodata);
        }
    }, [biodatas, user]);

    // ----- fetching premiumRequested users data -------
    const [filteredPremiumRequest, setFilteredPremiumRequest] = useState([]);

    const { data: premiumRequests = [], refetch } = useQuery({
        queryKey: ['premiumRequests', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`premiumRequests/${user.email}`)
            return res.data;
        }
    })
    // console.log('premiumRequests: ',premiumRequests);
    // useEffect(() => {
    //     if (premiumRequests.length > 0 && user) {
    //         console.log("Filtering premiumRequests for user:", user.email);
    //         const foundPremiumRequests = premiumRequests.filter(bio => bio.email === user.email);
    //         // const foundBiodata = biodatas.find(bio => bio.ContactEmail === user.email);
    //         setFilteredPremiumRequest(foundPremiumRequests);
    //         // console.log("Filtered biodata:", foundPayment);
    //         console.log("Filtered premiumRequests:", filteredPremiumRequest);
    //     }
    // }, [premiumRequests, user]);

    // console.log(filteredBiodata)

    // ------ handleMakePremium ------
    const handleMakePremium = (biodata) => {
        // ---- checking request ------

        const {
            _id,
            email,
            name,
            date,
            "biodata._id": biodataId,
            BiodataType,
            ProfileImage,
            DateOfBirth,
            Height,
            Weight,
            Age,
            Occupation,
            FathersName,
            MothersName,
            PermanentDivision,
            presentDivision,
            ExpectedPartnerAge,
            ExpectedPartnerHeight,
            ExpectedPartnerWeight,
            ContactEmail,
            MobileNumber,
            BiodataId,
            premiumRequeststatus,
            userType
        } = biodata;
        // console.log(_id, email, name, date, biodataId, BiodataType, ProfileImage, DateOfBirth, Height, Weight, Age, Occupation, FathersName, MothersName, PermanentDivision, presentDivision, ExpectedPartnerAge, ExpectedPartnerHeight, ExpectedPartnerWeight, ContactEmail, MobileNumber, BiodataId, premiumRequeststatus, userType);

        console.log(biodata._id);
        // console.log(biodata.ContactEmail);
        const isAlreadyPremiumRequest = premiumRequests.find((premiumRequest) =>
            premiumRequest._id === biodata._id && premiumRequest.ContactEmail === user.email
        );
        const isAlreadyPremium = premiumRequests.find((premium) =>
            premium._id === biodata._id && premium.userType === 'premium'
        );
        console.log(isAlreadyPremiumRequest);
        console.log(isAlreadyPremium);

        // if already exist or not 
        if (isAlreadyPremiumRequest) {
            Swal.fire({
                title: 'Error!',
                text: 'You have already submitted a request. ',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            // toast.error("Borrowing a book twice for a single user is not allowed ");
            return;
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to make your biodata premium !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, make it premium!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // const premiumRequest = {
                        //     email: user.email,
                        //     BiodataId: biodata.BiodataId,
                        //     name: biodata.name,
                        //     date: new Date(),
                        //     biodata,
                        //     premiumRequeststatus: 'pending',
                        //     userType: 'normal'
                        // }
                        const premiumRequest = {
                            // _id,
                            email: biodata.ContactEmail,
                            name,
                            date: new Date(),
                            "biodata._id": biodata._id,
                            BiodataType,
                            ProfileImage,
                            DateOfBirth,
                            Height,
                            Weight,
                            Age,
                            Occupation,
                            FathersName,
                            MothersName,
                            PermanentDivision,
                            presentDivision,
                            ExpectedPartnerAge,
                            ExpectedPartnerHeight,
                            ExpectedPartnerWeight,
                            ContactEmail,
                            MobileNumber,
                            BiodataId,
                            premiumRequeststatus: 'pending',
                            userType: 'normal'
                        }
                        console.log(premiumRequest);
                        console.log(biodata.ContactEmail);
                        // await axiosSecure.post(`https://matrimony-server-chi.vercel.app/biodatas/${biodata._id}/request-premium`);
                        await axiosSecure.post(`/premiumRequests`, premiumRequest);
                        // await axiosSecure.post(`/premiumRequests`, biodata);
                        Swal.fire({
                            title: "Requested!",
                            text: "Your biodata has been sent for premium approval.",
                            icon: "success"
                        });
                    } catch (error) {
                        console.error('Error requesting premium:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to request premium status.",
                            icon: "error"
                        });
                    }
                }
            });
        }

    };

    return (
        <div>
            <div data-aos="zoom-out-left">
                <SectionTitle heading="View Biodata" subHeading="Bio Info" />
            </div>
            <div data-aos="zoom-out-right">
                <Box className="max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-12 mt-1 bg-blue-300 rounded-3xl flex flex-col items-center mb-10">
                    {filteredBiodata.length > 0 ? (
                        filteredBiodata.map((biodata, index) => (
                            <Card key={index} variant="outlined" sx={{ width: '100%', mt: 4 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Name:</span> {biodata.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Biodata Type:</span> {biodata.BiodataType}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Date of Birth:</span> {biodata.DateOfBirth}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Height:</span> {biodata.Height}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Weight:</span> {biodata.Weight}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Age:</span> {biodata.Age}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Occupation:</span> {biodata.Occupation}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Father's Name:</span> {biodata.FathersName}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Mother's Name:</span> {biodata.MothersName}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Permanent Division:</span> {biodata.PermanentDivision}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Present Division:</span> {biodata.presentDivision}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Expected Partner Age:</span> {biodata.ExpectedPartnerAge}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Expected Partner Height:</span> {biodata.ExpectedPartnerHeight}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Expected Partner Weight:</span> {biodata.ExpectedPartnerWeight}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Contact Email:</span> {biodata.ContactEmail}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6"><span style={{ fontWeight: 'bold' }}>Mobile Number:</span> {biodata.MobileNumber}</Typography>
                                        </Grid>
                                    </Grid>
                                    {/* ------ Button --------- */}
                                    <Grid container direction="column" alignItems="center" justifyContent="center">
                                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleMakePremium(biodata)}>
                                            Make Biodata Premium
                                        </Button>
                                    </Grid>

                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No biodata found for the current user.</Typography>
                    )}
                </Box>
            </div>
        </div>
    );
};

export default ViewBiodata;
