import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ApprovedPremium = () => {

    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // const res = await axiosSecure.get('/users');
            const res = await axiosSecure.get('/premiumRequests');
            return res.data;
        }
    })

    // console.log(users);

    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/premiumRequests/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const handleMakePremium = user => {
        console.log(user._id);

        axiosSecure.patch(`/premiumRequests/premium/${user._id}`)
        // axiosSecure.patch(`/premiumRequests/${user._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is  Premium Now !`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (

        <div>
            <div data-aos="zoom-in-down">  
            <Box>
                <SectionTitle subHeading="Premium Requests" heading="Approve Premium Section" />
                {/* <SectionTitle heading="Manage Users" /> */}
            </Box>
            </div>
            <div data-aos="zoom-in-up">  
            <Box className="p-4">
                <Box className="flex justify-evenly my-4">
                    <Typography variant="h4" className="text-3xl">All Premium Approval Requests: {users.length}</Typography>
                    {/* <Typography variant="h4" className="text-3xl">Total Users: {users.length}</Typography> */}
                </Box>

                <TableContainer className="shadow-lg overflow-x-auto">
                    <Table className="w-full">
                        <TableHead>
                            <TableRow className="bg-gray-200">
                                <TableCell>Index</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>User Email</TableCell>
                                <TableCell>Make Premium</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user._id} className="hover:bg-gray-100">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    {/* <TableCell>{user.ContactEmail}</TableCell> */}

                                    <TableCell>
                                        {user.userType === 'premium' ? (
                                            'Premium'
                                        ) : (
                                            <Button
                                                onClick={() => handleMakePremium(user)}
                                                variant="contained"
                                                color="warning"
                                                className="bg-yellow-200 text-white"
                                                startIcon={<MdWorkspacePremium className="text-2xl" />}
                                            >
                                                Make Premium
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleDeleteUser(user)}
                                            className="text-red-500"
                                        >
                                            <FaTrashAlt />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            </div>
        </div>

    );
};

export default ApprovedPremium;