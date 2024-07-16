import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography, Modal, Box, useMediaQuery, useTheme } from '@mui/material';

const PremiumProfileCard = ({ biodata }) => {
    const { name, BiodataId, ProfileImage, BiodataType, Age, PermanentDivision, Occupation, _id } = biodata;

    return (
        <>
            <div data-aos="zoom-out-down">
                <Card className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-blue-200" sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt={name}
                        height="200"
                        image={ProfileImage}
                        title={name}
                        style={{ objectFit: 'contain', height: '200px' }}
                    />
                    <CardContent className="flex flex-col items-center gap-2">
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            BiodataId: {BiodataId}
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            {PermanentDivision}
                        </Typography>
                        <Typography variant="body1" color="blue">
                            {BiodataType}
                        </Typography>
                        <Typography variant="body1">
                            {Occupation}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Age: {Age}
                        </Typography>
                        <Link to={`/premiumRequests/${_id}`} className="w-full">
                            <Button
                                // onClick={handleBiodataDetails}
                                variant="contained"
                                color="primary"
                                className="mt-4 w-full"
                            >
                                View Profile
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default PremiumProfileCard;
