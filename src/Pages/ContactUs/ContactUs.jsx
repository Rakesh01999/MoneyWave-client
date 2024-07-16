// import { Typography } from '@mui/material';
import React from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { FaPhoneVolume, FaUser } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Helmet } from 'react-helmet';


const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4 mt-14">
            <Helmet>
                <title>Matrimony Mate | Contact Us</title>
            </Helmet>
            <Typography variant="h4" className="mb-6 mt-20 text-center text-blue-500">Contact Us</Typography>
            <Card className="max-w-lg w-full mt-4">
                <div data-aos="zoom-out-down">
                    <CardContent className=''>
                        <Typography variant="h5" className="mb-8 text-center text-blue-600">Get in Touch</Typography>
                        <div className="flex items-center mb-2 gap-2">
                            {/* man Icon Here */}
                            {/* <FaPhoneVolume /> */}
                            <FaUser />
                            <span className="material-icons">Developer: </span>
                            <Typography variant="body1" className="ml-2 text-blue-600"> Rakesh Biswas</Typography>
                        </div>
                        <div className="flex items-center mb-2 gap-2">
                            {/* Phone Icon Here */}
                            <FaPhoneVolume />
                            <span className="material-icons">phone</span>
                            <Typography variant="body1" className="ml-2">+880 19996 47103</Typography>
                        </div>
                        <div className="flex items-center mb-2 gap-2">
                            {/* Email Icon Here */}
                            <MdAttachEmail />
                            <span className="material-icons">Email: </span>
                            <Typography variant="body1" className="ml-2"> rbiswas01999@gmail.com</Typography>
                        </div>
                        <div className="flex items-center mb-4 gap-2">
                            {/* Location Icon Here */}
                            <FaLocationDot />
                            <span className="material-icons">Location:</span>
                            <Typography variant="body1" className="ml-2"> Khulna, Bangladesh</Typography>
                        </div>
                        <form className="flex flex-col space-y-4">
                            <TextField label="Name" variant="outlined" fullWidth required />
                            <TextField label="Email" variant="outlined" fullWidth required />
                            <TextField label="Message" variant="outlined" multiline rows={4} fullWidth required />
                            <Button variant="contained" color="primary">Send Message</Button>
                        </form>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default ContactUs;
