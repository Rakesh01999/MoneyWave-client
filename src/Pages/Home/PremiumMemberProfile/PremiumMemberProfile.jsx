import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import PremiumProfileCard from '../../../Components/PremiumProfileCard/PremiumProfileCard';
import 'animate.css';

const PremiumMemberProfile = () => {
    const axiosSecure = useAxiosSecure();
    const [premiumRequest, setPremiumRequest] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchPremiumRequests = async () => {
            try {
                const response = await axiosSecure.get('/premiumRequests');
                setPremiumRequest(response.data);
            } catch (error) {
                console.error('Error fetching premiumRequests :', error);
            }
        };

        fetchPremiumRequests();
    }, []);

    // Filter to get only premium users
    const premiumUsers = premiumRequest.filter(user => user.userType === "premium");

    // Sort users based on age and selected order
    const sortedPremiumUsers = premiumUsers.sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.Age - b.Age;
        } else {
            return b.Age - a.Age;
        }
    });

    const displayedUsers = showAll ? sortedPremiumUsers : sortedPremiumUsers.slice(0, 6);

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div>
            <h1 class="animate__animated animate__zoomIn">
                <SectionTitle
                    subHeading={"Find Here"}
                    heading={"Premium Member Profile"}>
                </SectionTitle>
            </h1>
            <div className='flex items-center justify-center'>
            {/* <div data-aos="zoom-out-down"> */}
            <div data-aos="zoom-out-right">

                <FormControl variant="outlined" className="w-48 mb-4">
                    <InputLabel>Sort by Age</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        label="Sort by Age"
                    >
                        <MenuItem value="ascending">Ascending</MenuItem>
                        <MenuItem value="descending">Descending</MenuItem>
                    </Select>
                </FormControl>
            </div>
            </div>
            <div className='px-4 py-8 bg-opacity-10 rounded-3xl flex flex-col items-center gap-6 mb-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {displayedUsers.map((profile, index) => (
                        <PremiumProfileCard key={index} biodata={profile} />
                    ))}
                </div>
                <Button variant="contained" color="primary" onClick={handleShowAll}>
                    {showAll ? "Show Less" : "Show All"}
                </Button>
            </div>
        </div >
    );
};

export default PremiumMemberProfile;
