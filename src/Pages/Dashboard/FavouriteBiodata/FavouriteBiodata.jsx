import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const FavouriteBiodata = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [filteredFavBio, setFilteredFavBio] = useState([]);
    console.log("User Email:", user?.email);

    const { data: favouriteBiodata = [], refetch } = useQuery({
        queryKey: ['favouriteBiodata', user.email],
        queryFn: async () => {
            // const res = await axiosSecure.get(`favouriteBiodata/${user.email}`)
            const res = await axiosSecure.get(`favouriteBiodata/`)
            return res.data;
        }
    })

    useEffect(() => {
        if (favouriteBiodata.length > 0 && user) {
            console.log("Filtering favouriteBiodata for user:", user.email);
            const foundFavBio = favouriteBiodata.filter(bio => bio.email === user.email);
            // const foundBiodata = biodatas.find(bio => bio.ContactEmail === user.email);
            setFilteredFavBio(foundFavBio);
            console.log("Filtered Fav Biodata:", filteredFavBio);
        }
    }, [favouriteBiodata, user]);


    const handleDeleteRequest = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // axiosSecure.delete(`/users/${user._id}`)
                axiosSecure.delete(`favouriteBiodata/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (

        <Box className="p-4">
            <div data-aos="zoom-in-right">
                <Typography variant="h4" className="text-xl mb-4">
                    Total Favourite Biodata: {filteredFavBio.length}
                </Typography>
            </div>
            {/* <TableContainer component={Paper} className="shadow-lg"> */}
            <div data-aos="zoom-out-left">
                <TableContainer className="shadow-lg">
                    <Table>
                        <TableHead>
                            <TableRow className="bg-gray-200">
                                <TableCell>Sl No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Biodata Id</TableCell>
                                <TableCell>Permanent Address</TableCell>
                                <TableCell>Occupation</TableCell>
                                <TableCell>Operation(Delete)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredFavBio.map((favBio, index) => (
                                <TableRow key={favBio._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{favBio.name}</TableCell>
                                    <TableCell>{favBio.BiodataId}</TableCell>
                                    <TableCell>{favBio.PermanentDivision}</TableCell>
                                    <TableCell>{favBio.Occupation}</TableCell>

                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteRequest(favBio._id)} color="error">
                                            {/* <DeleteIcon /> */}
                                            <FaTrashAlt />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>

    );
};

export default FavouriteBiodata;