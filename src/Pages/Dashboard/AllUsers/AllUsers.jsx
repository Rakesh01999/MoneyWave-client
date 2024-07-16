import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

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

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now !`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakePremium = user => {
        axiosSecure.patch(`/users/premium/${user._id}`)
            .then(res => {
                console.log(res.data)
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
        // <div>
        //     <div className="flex justify-evenly my-4">
        //         <h2 className="text-3xl ">All Users</h2>
        //         <h2 className="text-3xl ">Total Users: {users.length}</h2>
        //     </div>

        //     {/* table */}
        //     <div className="overflow-x-auto">
        //         <table className="table w-full">
        //             {/* head */}
        //             <thead>
        //                 <tr>
        //                     <th>Index</th>
        //                     <th>User Name</th>
        //                     <th>User Email</th>
        //                     <th>Role(Make Admin)</th>
        //                     <th>Make Premium</th>
        //                     <th>Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {
        //                     users.map(
        //                         (user, index) =>
        //                             <tr className="hover" key={user._id}>
        //                                 <th>{index + 1}</th>
        //                                 <td>{user.name}</td>
        //                                 <td>{user.email}</td>
        //                                 <td>
        //                                     {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn bg-blue-500 ">
        //                                         {/* <FaUsers className="text-white text-2xl " /> */}
        //                                         <MdOutlineAdminPanelSettings className="text-white text-2xl " />
        //                                     </button>}
        //                                 </td>
        //                                 <td>
        //                                     {user.userType === 'premium' ? 'Premium' : <button onClick={() => handleMakePremium(user)} className="btn bg-yellow-500 ">
        //                                         {/* <FaUsers className="text-white text-2xl " /> */}
        //                                         <MdWorkspacePremium className="text-white text-2xl " />
        //                                     </button>}
        //                                 </td>
        //                                 <td>
        //                                     <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg ">
        //                                         <FaTrashAlt className="text-red-500" />
        //                                     </button>
        //                                 </td>
        //                             </tr>
        //                     )
        //                 }
        //             </tbody>
        //         </table>
        //     </div>
        // </div>

        <div>
            <div data-aos="zoom-out-up">
                <SectionTitle heading="Manage Users" />
            </div>
            <Box className="p-4">
                <div data-aos="zoom-out-down">
                    <Box className="flex justify-evenly my-4">
                        <Typography variant="h4" className="text-3xl">All Users</Typography>
                        <Typography variant="h4" className="text-3xl">Total Users: {users.length}</Typography>
                    </Box>
                </div>

                <div data-aos="zoom-out-down">
                    <TableContainer className="shadow-lg overflow-x-auto">
                        <Table className="w-full">
                            <TableHead>
                                <TableRow className="bg-gray-200">
                                    <TableCell>Index</TableCell>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>User Email</TableCell>
                                    <TableCell>Role (Make Admin)</TableCell>
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
                                        <TableCell>
                                            {user.role === 'admin' ? (
                                                'Admin'
                                            ) : (
                                                <Button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    variant="contained"
                                                    color="primary"
                                                    className="bg-blue-500 text-white"
                                                    startIcon={<MdOutlineAdminPanelSettings className="text-2xl" />}
                                                >
                                                    Make Admin
                                                </Button>
                                            )}
                                        </TableCell>
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
                </div>

            </Box>
        </div>

    );
};

export default AllUsers;