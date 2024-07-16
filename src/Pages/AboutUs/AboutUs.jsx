import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { GrStatusUnknown } from "react-icons/gr";
import { TbTargetArrow } from "react-icons/tb";
import { GiTeamIdea } from "react-icons/gi";
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4 mt-16">
            <Helmet>
                <title>Matrimony Mate | About Us</title>
            </Helmet>
            <div data-aos="zoom-out-down">
                <Typography variant="h4" className="mb-10 text-center text-blue-500">About Us</Typography>
            </div>
            {/* <Card className="max-w-lg w-full"> */}
            <Card className='mt-4'>
                <div data-aos="zoom-out-down">
                    <CardContent className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-white" sx={{ backgroundColor: 'ButtonHighlight' }}>
                        <span className='flex items-center justify-center gap-2'>
                            <GrStatusUnknown className='text-xl' />
                            <Typography variant="h5" className="mb-4 text-center">Who We Are</Typography>
                        </span>
                        <Typography variant="body1" className="mb-4">
                            We are a dedicated team of professionals passionate about bringing people together. With years of experience in the matchmaking industry, we strive to provide a trusted platform where individuals can find meaningful connections and lifelong partners.
                        </Typography>
                    </CardContent>
                </div>
                <div data-aos="zoom-out-down">
                    <CardContent className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-white" sx={{ backgroundColor: 'ButtonHighlight' }}>
                        <span className='flex items-center justify-center gap-2'>
                            <TbTargetArrow className='text-xl' />
                            <Typography variant="h5" className="mb-4 text-center">Our Mission</Typography>
                        </span>
                        <Typography variant="body1" className="mb-4">
                            Our mission is to create a secure and user-friendly environment where individuals can explore potential matches and build meaningful relationships. We aim to facilitate connections that lead to happy and successful marriages. Our commitment is to help you find your perfect match with ease and confidence.
                        </Typography>
                    </CardContent>
                </div>
                <div data-aos="zoom-out-down">
                    <CardContent className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-white" sx={{ backgroundColor: 'ButtonHighlight' }}>
                        <span className='flex items-center justify-center gap-2'>
                            <GiTeamIdea className='text-xl' />
                            <Typography variant="h5" className="mb-4 text-center">Our Team</Typography>
                        </span>
                        <Typography variant="body1" className="mb-4">
                            Our team consists of experienced professionals who are dedicated to providing exceptional service and support. We work tirelessly to ensure that your experience on our platform is positive and successful. From customer service representatives to matchmakers, each member of our team plays a vital role in helping you find your perfect partner.
                        </Typography>
                        <div className="flex justify-center items-center">
                            <span className="material-icons">group</span>
                            <Typography variant="body1" className="ml-2">Meet our dedicated team</Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default AboutUs;
