import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Box, Button, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/Sort';

const SuccessStory = () => {
  const [stories, setStories] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosSecure.get('/successStory');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
  };

  const sortedStories = [...stories].sort((a, b) => {
    const dateA = new Date(a.MarriageDate);
    const dateB = new Date(b.MarriageDate);
    return sortAscending ? dateA - dateB : dateB - dateA;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4">
      <div data-aos="zoom-out-down">  
      <SectionTitle subHeading="Story Section" heading="Success Story" />
      </div>
      
      <Box className="flex justify-between items-center my-4">
        <Typography variant="h4" className="text-3xl text-blue-600">All Success Stories</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SortIcon />}
          onClick={handleSortToggle}
        >
          {sortAscending ? 'Sort Descending' : 'Sort Ascending'}
        </Button>
      </Box>
      <section className="py-12">
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedStories.map((story, index) => (
            
            <Card key={index} className="hover:shadow-2xl transition duration-300 ease-in-out" sx={{ backgroundColor: 'ButtonHighlight' }}>
              <div data-aos="zoom-out-down">  
              <CardMedia
                component="img"
                height="200"
                image={story.coupleImage}
                alt="Couple"
              />
              </div>
              <CardContent>

                <Typography variant="body2" color="textSecondary" className="mt-2">
                  <strong>Marriage Date:</strong> {formatDate(story.MarriageDate)}
                </Typography>
                <Typography variant="h6" className="font-semibold mb-2">
                  Story by: {story.userName}
                </Typography>                
                <Typography variant="body2" color="textSecondary">
                  {story.story}
                </Typography>
                <Box className="flex items-center mt-2">
                  <strong className="mr-2">Review:</strong>
                  {Array(story.rating).fill().map((_, i) => (
                    <StarIcon key={i} className="text-yellow-500" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </section>
    </div>
  );
};

export default SuccessStory;
