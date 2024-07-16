import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const EditBiodata = () => {
    // const { id } = useParams();
    // console.log('check id', id);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(AuthContext);
    // console.log('here-user', user);
    // const [biodata, setBiodata] = useState({
    //     BiodataType: '',
    //     Name: '',
    //     ProfileImageLink: '',
    //     DateOfBirth: '',
    //     Height: '',
    //     Weight: '',
    //     Age: '',
    //     Occupation: '',
    //     Race: '',
    //     FathersName: '',
    //     MothersName: '',
    //     PermanentDivision: '',
    //     PresentDivision: '',
    //     ExpectedPartnerAge: '',
    //     ExpectedPartnerHeight: '',
    //     ExpectedPartnerWeight: '',
    //     ContactEmail: '',
    //     MobileNumber: '',
    // });
    // console.log('Printing biodata',biodata);

    // useEffect(() => {
    //     const fetchBiodata = async () => {
    //         try {
    //             const response = await axios.get(`/biodatas/${id}`);
    //             setBiodata(response.data);
    //         } catch (error) {
    //             console.error('Error fetching biodata:', error);
    //         }
    //     };
    //     fetchBiodata();
    // }, [id]);

    // const handleChange = (event) => {
    //     setBiodata({ ...biodata, [event.target.name]: event.target.value });
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const BiodataType = form.BiodataType.value;
        const name = form.name.value;
        // const email = form.email.value;
        const photo = form.photo.value;
        const DateOfBirth = form.DateOfBirth.value;
        const Height = form.Height.value;
        const Weight = form.Weight.value;
        // console.log('Name: ', name);
        // console.log('Photo: ', photo);
        // console.log('email: ', email);
        console.log(BiodataType, name, photo);
        // console.log('Biodata Object', biodata);
        const biodata = {
            BiodataType: form.BiodataType.value,
            name: form.name.value,
            // email: form.email.value,
            ProfileImage: form.photo.value,
            DateOfBirth: form.DateOfBirth.value,
            Height: form.Height.value,
            Weight: form.Weight.value,
            Age: form.Age.value,
            Occupation: form.Occupation.value,
            FathersName: form.FathersName.value,
            MothersName: form.MothersName.value,
            PermanentDivision: form.PermanentDivision.value,
            presentDivision: form.presentDivision.value,
            ExpectedPartnerAge: form.ExpectedPartnerAge.value,
            ExpectedPartnerHeight: form.ExpectedPartnerHeight.value,
            ExpectedPartnerWeight: form.ExpectedPartnerWeight.value,
            ContactEmail: form.ContactEmail.value,
            MobileNumber: form.MobileNumber.value

        }
        try {
            // await axios.put(`/biodatas/${id}`, biodata);
            // await axios.post(`/biodatas`, biodata);
            await axiosSecure.post(`/biodatas`, biodata);
            console.log('Biodata updated successfully');
            Swal.fire({
                title: 'success!',
                text: 'Successfully updated this biodata . ',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error updating biodata:', error);
            Swal.fire({
                title: 'error!',
                text: `${error}. `,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            <div data-aos="zoom-out-down">
                <SectionTitle heading="BioData Form" subHeading="Please fill up the below form to update Biodata Info"></SectionTitle>
            </div>

            <Box className="max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-12 mt-10 bg-blue-300 rounded-3xl flex flex-col items-center mb-10">

                <div data-aos="zoom-out-down">
                    <Box mt={8} p={4} bgcolor="white" boxShadow={3} borderRadius={0}>
                        <Typography variant="h4" align="center" gutterBottom>
                            <span className="text-blue-500 font-bold animate__animated animate__fadeInDown">Edit / Create Biodata</span>
                        </Typography>
                        <form onSubmit={handleSubmit}>

                            {/* <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" name="name" className="w-full border px-2 py-1" required />
                    </div> */}

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="biodata-type-label">Biodata Type</InputLabel>
                                <Select
                                    labelId="biodata-type-label"
                                    id="biodata-type"
                                    name="BiodataType"
                                    // value={biodata.BiodataType}
                                    // onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Name"
                                name="name"
                                defaultValue={user.displayName}
                                required
                                fullWidth
                                margin="normal"
                            />

                            {/* <TextField
                        label="Email"
                        name="email"
                        type="email"
                        required
                        fullWidth
                        margin="normal"
                    /> */}

                            <TextField
                                label="Photo URL"
                                name="photo"
                                defaultValue={user.photoURL}
                                required
                                fullWidth
                                margin="normal"
                            />

                            <TextField
                                label="Date of Birth"
                                name="DateOfBirth"
                                type="date"
                                // value={biodata.DateOfBirth}
                                // onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="height-label">Height</InputLabel>
                                <Select
                                    labelId="height-label"
                                    id="height"
                                    name="Height"
                                    // value={biodata.Height}
                                    // onChange={handleChange}
                                    required
                                >
                                    {/* Add options for height */}
                                    <MenuItem value="Less Than 5'">Less Than 5'</MenuItem>
                                    <MenuItem value="5'1">5'1</MenuItem>
                                    <MenuItem value="5'2">5'2</MenuItem>
                                    <MenuItem value="5'3">5'3</MenuItem>
                                    <MenuItem value="5'4">5'4</MenuItem>
                                    <MenuItem value="5'5">5'5</MenuItem>
                                    <MenuItem value="5'6">5'6</MenuItem>
                                    <MenuItem value="5'7">5'7</MenuItem>
                                    <MenuItem value="5'8">5'8</MenuItem>
                                    <MenuItem value="5'9">5'9</MenuItem>
                                    <MenuItem value="5'10">5'10</MenuItem>
                                    <MenuItem value="5'11">5'11</MenuItem>
                                    <MenuItem value="6'0">6'0</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="weight-label">Weight</InputLabel>
                                <Select
                                    labelId="weight-label"
                                    id="weight"
                                    name="Weight"
                                    // value={biodata.Weight}
                                    // onChange={handleChange}
                                    required
                                >
                                    {/* Add options for weight */}
                                    <MenuItem value="40-50 kg">40-50 kg</MenuItem>
                                    <MenuItem value="51-60 kg">51-60 kg</MenuItem>
                                    <MenuItem value="61-70 kg">61-70 kg</MenuItem>
                                    <MenuItem value="71-80 kg">71-80 kg</MenuItem>
                                    <MenuItem value="81-90 kg">81-90 kg</MenuItem>
                                    <MenuItem value="91-100 kg">91-100 kg</MenuItem>
                                    <MenuItem value="101-110 kg">101-110 kg</MenuItem>

                                </Select>
                            </FormControl>
                            <TextField
                                label="Age"
                                name="Age"
                                type="number"
                                // value={biodata.Age}
                                // onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                                inputProps={{
                                    min: 18,
                                }}
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="occupation-label">Occupation</InputLabel>
                                <Select
                                    labelId="occupation-label"
                                    id="occupation"
                                    name="Occupation"
                                    // value={biodata.Occupation}
                                    // onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                                    <MenuItem value="Business Analyst">Business Analyst</MenuItem>
                                    <MenuItem value="Project Manager">Project Manager</MenuItem>
                                    <MenuItem value="Data Scientist">Data Scientist</MenuItem>
                                    <MenuItem value="Marketing Manager">Marketing Manager</MenuItem>
                                    <MenuItem value="Financial Analyst">Financial Analyst</MenuItem>
                                    <MenuItem value="Human Resources Manager">Human Resources Manager</MenuItem>
                                    <MenuItem value="Sales Representative">Sales Representative</MenuItem>
                                    <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
                                    <MenuItem value="Accountant">Accountant</MenuItem>
                                    <MenuItem value="Lawyer">Lawyer</MenuItem>
                                    <MenuItem value="Doctor">Doctor</MenuItem>
                                    <MenuItem value="Nurse">Nurse</MenuItem>
                                    <MenuItem value="Teacher">Teacher</MenuItem>
                                    <MenuItem value="Student">Student</MenuItem>
                                    <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="race-label">Race</InputLabel>
                                <Select
                                    labelId="race-label"
                                    id="race"
                                    name="Race"
                                    // value={biodata.Race}
                                    // onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Asian">Asian</MenuItem>
                                    <MenuItem value="Black or African American">Black or African American</MenuItem>
                                    <MenuItem value="Native American or Alaska Native">Native American or Alaska Native</MenuItem>
                                    <MenuItem value="Pacific Islander">Pacific Islander</MenuItem>
                                    <MenuItem value="White">White</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Father's Name"
                                name="FathersName"
                                // value={biodata.FathersName}
                                // onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Mother's Name"
                                name="MothersName"
                                // value={biodata.MothersName}
                                // onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="permanent-division-label">Permanent Division</InputLabel>
                                <Select
                                    labelId="permanent-division-label"
                                    id="permanent-division"
                                    name="PermanentDivision"
                                    // value={biodata.PermanentDivision}
                                    // onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Dhaka">Dhaka</MenuItem>
                                    <MenuItem value="Chattagram">Chattagram</MenuItem>
                                    <MenuItem value="Rangpur">Rangpur</MenuItem>
                                    <MenuItem value="Barisal">Barisal</MenuItem>
                                    <MenuItem value="Khulna">Khulna</MenuItem>
                                    <MenuItem value="Mymensingh">Mymensingh</MenuItem>
                                    <MenuItem value="Sylhet">Sylhet</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="present-division-label">Present Division</InputLabel>
                                <Select
                                    labelId="present-division-label"
                                    id="present-division"
                                    name="presentDivision"
                                    // value={biodata.PresentDivision}
                                    // onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Dhaka">Dhaka</MenuItem>
                                    <MenuItem value="Chattagram">Chattagram</MenuItem>
                                    <MenuItem value="Rangpur">Rangpur</MenuItem>
                                    <MenuItem value="Barisal">Barisal</MenuItem>
                                    <MenuItem value="Khulna">Khulna</MenuItem>
                                    <MenuItem value="Mymensingh">Mymensingh</MenuItem>
                                    <MenuItem value="Sylhet">Sylhet</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Expected Partner Age"
                                name="ExpectedPartnerAge"
                                type="number"
                                // value={biodata.ExpectedPartnerAge}
                                // onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="expected-partner-height-label">Expected Partner Height</InputLabel>
                                <Select
                                    labelId="expected-partner-height-label"
                                    id="expected-partner-height"
                                    name="ExpectedPartnerHeight"
                                    // value={biodata.ExpectedPartnerHeight}
                                    // onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="5'1">5'1</MenuItem>
                                    <MenuItem value="5'2">5'2</MenuItem>
                                    <MenuItem value="5'3">5'3</MenuItem>
                                    <MenuItem value="5'4">5'4</MenuItem>
                                    <MenuItem value="5'5">5'5</MenuItem>
                                    <MenuItem value="5'6">5'6</MenuItem>
                                    <MenuItem value="5'7">5'7</MenuItem>
                                    <MenuItem value="5'8">5'8</MenuItem>
                                    <MenuItem value="5'9">5'9</MenuItem>
                                    <MenuItem value="5'10">5'10</MenuItem>
                                    <MenuItem value="5'11">5'11</MenuItem>
                                    <MenuItem value="6'0">6'0</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="expected-partner-weight-label">Expected Partner Weight</InputLabel>
                                <Select
                                    labelId="expected-partner-weight-label"
                                    id="expected-partner-weight"
                                    name="ExpectedPartnerWeight"
                                    // value={biodata.ExpectedPartnerWeight}
                                    // onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="40-50 kg">40-50 kg</MenuItem>
                                    <MenuItem value="51-60 kg">51-60 kg</MenuItem>
                                    <MenuItem value="61-70 kg">61-70 kg</MenuItem>
                                    <MenuItem value="71-80 kg">71-80 kg</MenuItem>
                                    <MenuItem value="81-90 kg">81-90 kg</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Contact Email"
                                name="ContactEmail"
                                // value={biodata.ContactEmail}
                                defaultValue={user.email}
                                // onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                    // readOnly: false,
                                }}
                            />
                            <TextField
                                label="Mobile Number"
                                name="MobileNumber"
                                // value={biodata.MobileNumber}
                                // onChange={handleChange}
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
                                <span className="md:text-xl">Save and Publish</span>
                            </Button>
                        </form>


                        <Typography variant="body1" align="center">
                            Go to{" "}
                            <Link to="/biodatas" className="text-blue-500 font-bold">
                                Biodatas
                            </Link>
                        </Typography>
                    </Box>
                </div>


            </Box>
        </div>
    );
};

export default EditBiodata;



