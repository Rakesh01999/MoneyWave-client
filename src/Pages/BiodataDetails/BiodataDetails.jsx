import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import BiodataCard from '../../Components/BiodataCard/BiodataCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Box, Button, Typography } from '@mui/material';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const BiodataDetails = () => {
    const biodata = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { _id, BiodataId, name, BiodataType, ProfileImage, PermanentDivision, Age, Occupation, Email, PhoneNumber } = biodata;
    const [similarBiodatas, setSimilarBiodatas] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchSimilarBiodatas = async () => {
            try {
                const response = await axiosSecure.get(`/filtered-biodatas?type=${BiodataType}&limit=3`);
                setSimilarBiodatas(response.data);
            } catch (error) {
                console.error('Error fetching similar biodatas:', error);
            }
        };
        fetchSimilarBiodatas();
    }, [BiodataType, axiosSecure]);

    const [favouriteBiodata, setFavouriteBiodata] = useState([]);
    useEffect(() => {
        fetch('https://matrimony-server-chi.vercel.app/favouriteBiodata')
            .then(res => res.json())
            .then(data => setFavouriteBiodata(data));
    }, []);

    const email = user.email;

    const newFavouriteBiodata = { BiodataId, name, BiodataType, ProfileImage, PermanentDivision, Age, Occupation, email };

    const handleAddToFavouriteBiodata = async () => {
        const isAlreadyFavourite = favouriteBiodata.find((favBiodata) =>
            favBiodata.BiodataId === BiodataId && favBiodata.email === user.email
        );

        if (isAlreadyFavourite) {
            Swal.fire({
                title: 'Error!',
                text: 'You have already added this biodata to your favourite collection.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await axiosSecure.post('/favouriteBiodata', newFavouriteBiodata);
            Swal.fire({
                title: 'Success!',
                text: 'Successfully added this biodata to your favourite collection.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error adding biodata to favourite collection:', error);
        }
    };

    // --------- combine all premium users -----

    const { data: premiumUsers = [] } = useQuery({
        queryKey: ['premiumUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premiumUsers/users');
            return res.data;
        }
    });

    const { data: premiumRequests = [] } = useQuery({
        queryKey: ['premiumRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premiumUsers/premiumRequests');
            return res.data;
        }
    });

    // Combine the data from both collections
    const allPremiumData = [...premiumUsers, ...premiumRequests];

    // Check if the current user is in the combined premium data
    const isPremiumUser = allPremiumData.some((premiumUser) => premiumUser.email === user.email);

    return (
        <div>
            <Helmet>
                <title>Matrimony Mate | Biodata Details</title>
            </Helmet>

            <Box className="max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-12 mt-20 bg-blue-300 rounded-3xl flex flex-col items-center mb-10">
                <Typography variant="h3" className="text-center my-8 md:my-12">
                    <span className='text-2xl md:text-4xl '>Biodata Details</span>
                </Typography>
                <Box className="px-4">
                    <img className="md:w-full md:h-full rounded-2xl mt-7 mx-auto" src={ProfileImage} alt="" />
                </Box>
                <Box className="w-full p-6 text-xl md:text-[25px] mt-28">
                    <Typography variant="h4" className="font-bold">
                        {name}
                    </Typography>
                    <Typography variant="body1" className="mt-4">
                        <span className="font-bold">Biodata Id:</span> {BiodataId}
                    </Typography>
                    <hr className="my-3" />
                    <Typography variant="body1" className="my-6">
                        <span className="font-bold">Gender:</span> {BiodataType}
                    </Typography>
                    <hr className="my-3" />
                    <Typography variant="body1">
                        <span className="font-bold">Location(PermanentDivision):</span> {PermanentDivision}
                    </Typography>
                    <Typography variant="body1" className="my-5">
                        <span className="font-bold">Age:</span> {Age}
                    </Typography>
                    <hr className="my-3" />
                    <Box className="flex gap-4">
                        <Typography variant="body1" className="font-bold">
                            Occupation:
                        </Typography>
                        <Typography variant="body1">{Occupation}</Typography>
                    </Box>
                    <hr className="my-3 border-green-500" />

                    {
                        isPremiumUser ?
                            <>
                                <Typography variant="body1" className="mt-4">
                                    <span className="font-bold">Email:</span> {biodata.ContactEmail}
                                </Typography>
                                <Typography variant="body1" className="mt-4">
                                    <span className="font-bold">Phone Number:</span> {biodata.MobileNumber}
                                </Typography>
                            </>
                            :
                            <>
                                <div className="flex justify-center mt-4">
                                    <Link to={`/checkOut/${_id}`}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="mt-4 w-full"
                                        >
                                            Request Contact Info
                                        </Button>
                                    </Link>
                                </div>
                            </>
                    }
                </Box>

                <div className="flex justify-center">
                    <Button
                        onClick={handleAddToFavouriteBiodata}
                        variant="contained"
                        color="primary"
                        className="mt-4 w-2/3 lg:w-full"
                    >
                        Add To Favourite Biodata
                    </Button>
                </div>


            </Box>

            <Box className="max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-12 bg-blue-300 rounded-3xl flex flex-col items-center mb-10">
                <Typography variant="h3" className="text-center my-8 md:my-12">
                    <span className='text-2xl md:text-4xl '>Similar Biodatas</span>
                </Typography>
                <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {similarBiodatas.map((similarBiodata) => (
                        <BiodataCard key={similarBiodata._id} biodata={similarBiodata} />
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default BiodataDetails;
