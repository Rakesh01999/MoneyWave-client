import React, { useEffect, useState } from 'react';
import {
  Box, Button, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Dialog, DialogContent, DialogTitle
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';

const AdminSuccessStory = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);
  const [open, setOpen] = useState(false);

  const { refetch, data: stories = [] } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/successStory');
      return res.data;
    }
  });

  const handleViewStory = (story) => {
    setSelectedStory(story);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStory(null);
  };

  const handleDeleteStory = (story) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/successStory/${story._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'Story has been deleted.', 'success');
            }
          })
      }
    });
  };

  return (
    <div>
      <div data-aos="zoom-in-down">
        <Box>
          <SectionTitle subHeading="Admin Section" heading="Success Stories" />
        </Box>
      </div>
      <div data-aos="zoom-out-up">
        <Box className="p-4">
          <Box className="flex justify-evenly my-4">
            <Typography variant="h4" className="text-3xl">All Success Stories: {stories.length}</Typography>
          </Box>
          <TableContainer className="shadow-lg overflow-x-auto">
            <Table className="w-full">
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell>Index</TableCell>
                  <TableCell>Male Biodata Id</TableCell>
                  <TableCell>Female Biodata Id</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stories.map((story, index) => (
                  <TableRow key={story._id} className="hover:bg-gray-100">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{story.selfBiodataId}</TableCell>
                    <TableCell>{story.partnerBiodataId}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewStory(story)}
                        variant="contained"
                        color="primary"
                        className="text-white"
                      >
                        View Story
                      </Button>
                      <IconButton
                        onClick={() => handleDeleteStory(story)}
                        className="text-red-500 ml-2"
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
      <div data-aos="zoom-out-left">
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle className="text-center">Success Story</DialogTitle>
          <DialogContent>
            {selectedStory && (
              <div>
                <Typography variant="h6" gutterBottom>
                  Story by: {selectedStory.userName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedStory.story}
                </Typography>
                <img
                  src={selectedStory.coupleImage}
                  alt="Couple"
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminSuccessStory;
