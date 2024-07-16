import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";

const ApprovedContactRequest = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments/${user.email}`)
            return res.data;
        }
    })

    const handleDeleteUser = payment => {
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

                axiosSecure.delete(`/payments/${payment._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Contact Request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const handleApproveContact = payment => {
        axiosSecure.patch(`/payments/approveContact/${payment._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Contact Request for ${payment.name} is  Approved !`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <div>
            <div data-aos="zoom-in-left">  
            <Box>
                <SectionTitle subHeading="Approve Contact Requests" heading="Approve Contact Info Section" />
                {/* <SectionTitle heading="Manage Users" /> */}
            </Box>
            </div>
            <div data-aos="zoom-in-right">  
            <Box className="p-4">
                <Box className="flex justify-evenly my-4">
                    <Typography variant="h4" className="text-3xl">All Approval Contact Requests: {payments.length}</Typography>
                    {/* <Typography variant="h4" className="text-3xl">Total Users: {users.length}</Typography> */}
                </Box>

                <TableContainer className="shadow-lg overflow-x-auto">
                    <Table className="w-full">
                        <TableHead>
                            <TableRow className="bg-gray-200">
                                <TableCell>Index</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>User Email</TableCell>
                                <TableCell>Biodata ID</TableCell>
                                <TableCell>Approve Contact</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payments, index) => (
                                <TableRow key={payments._id} className="hover:bg-gray-100">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{payments.userName}</TableCell>
                                    <TableCell>{payments.email}</TableCell>
                                    <TableCell>{payments.biodata.BiodataId}</TableCell>

                                    <TableCell>
                                        {payments.status === 'approved' ? (
                                            'approved'
                                        ) : (
                                            <Button
                                                onClick={() => handleApproveContact(payments)}
                                                variant="contained"
                                                color="warning"
                                                className="bg-yellow-200 text-white"
                                                startIcon={<MdWorkspacePremium className="text-2xl" />}
                                            >
                                              Approve Contact 
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleDeleteUser(payments)}
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

export default ApprovedContactRequest;