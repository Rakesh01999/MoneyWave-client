import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const MyContactRequest = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // const { data: payments = [] } = useQuery({
    //     queryKey: ['payments', user.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`payments/${user.email}`)
    //         return res.data;
    //     }
    // })

    // const [payments, setPayments] = useState([]);
    const [filteredPayment, setFilteredPayment] = useState([]);
    // console.log("User Email:", user?.email);

    // useEffect(() => {
    //     const fetchPayments = async () => {
    //         try {
    //             const response = await axiosSecure.get(`payments/${user.email}`)
    //             setPayments(response.data);
    //         } catch (error) {
    //             console.error('Error fetching biodatas:', error);
    //         }
    //     };

    //     fetchPayments();
    // }, [axiosSecure]);

    // const { data: payments = [], refetch } = useQuery(['payments', user?.email], async () => {
    //     const res = await axiosSecure.get(`payments/${user.email}`);
    //     return res.data;
    // });

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments/${user.email}`)
            return res.data;
        }
    })

    useEffect(() => {
        if (payments.length > 0 && user) {
            // console.log("Filtering payments for user:", user.email);
            const foundPayment = payments.filter(bio => bio.email === user.email);
            // const foundBiodata = biodatas.find(bio => bio.ContactEmail === user.email);
            setFilteredPayment(foundPayment);
            // console.log("Filtered biodata:", foundPayment);
            // console.log("Filtered Payment:", filteredPayment);
        }
    }, [payments, user]);


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
                axiosSecure.delete(`payments/${_id}`)
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
        // <div>
        //     <h2 className="text-xl">Total Contact Requests: {filteredPayment.length}</h2>

        //     {/* table */}
        //     <div className="overflow-x-auto">
        //         <table className="table">
        //             {/* head */}
        //             <thead>
        //                 <tr>
        //                     <th>#</th>
        //                     <th>Name</th>
        //                     <th>Biodata Id</th>
        //                     <th>Status</th>
        //                     <th>Mobile No</th>
        //                     <th>Email</th>
        //                     <th>Operation</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {
        //                     filteredPayment.map((payment, index) =>
        //                         <tr key={payment._id}>
        //                             <th>{index + 1}</th>
        //                             <td>{payment.name}</td>
        //                             <td>{payment.BiodataId}</td>
        //                             <td>{payment.status}</td>
        //                             <td>
        //                                 {payment.biodata.MobileNumber}
        //                             </td>
        //                             <td>
        //                                 {payment.biodata.ContactEmail}
        //                             </td>
        //                             <td>
        //                                 <button onClick={() => handleDeleteRequest(payment._id)} className="btn btn-ghost btn-lg ">
        //                                     <FaTrashAlt className="text-red-500" />
        //                                 </button>
        //                             </td>
        //                         </tr>)
        //                 }

        //             </tbody>
        //         </table>
        //     </div>
        // </div>

        <Box className="p-4">
            <div data-aos="zoom-out-down">  
            <Typography variant="h4" className="text-xl mb-4">
                Total Contact Requests: {filteredPayment.length}
            </Typography>
            </div>
            {/* <TableContainer component={Paper} className="shadow-lg"> */}
            <div data-aos="zoom-out-up">  
            <TableContainer className="shadow-lg">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-200">
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Biodata Id</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Mobile No</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPayment.map((payment, index) => (
                            <TableRow key={payment._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{payment.name}</TableCell>
                                <TableCell>{payment.BiodataId}</TableCell>
                                <TableCell>{payment.status}</TableCell>
                                <TableCell>
                                    {
                                        payment.status === 'approved' ?

                                            payment.biodata?.MobileNumber
                                            :
                                            'Not Eligible'
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        payment.status === 'approved' ?

                                            payment.biodata?.ContactEmail
                                            :
                                            'Not Eligible'
                                    }
                                    {/* {payment.biodata?.ContactEmail} */}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteRequest(payment._id)} color="error">
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

export default MyContactRequest;