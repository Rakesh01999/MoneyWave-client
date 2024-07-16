import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useBiodata from '../../hooks/useBiodata';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import BiodataCard from '../../Components/BiodataCard/BiodataCard';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Pagination } from '@mui/material';

const Biodatas = () => {
    const [biodatas, refetch] = useBiodata();
    const axiosSecure = useAxiosSecure();
    console.log(biodatas?.length);

    // State for filters
    const [filters, setFilters] = useState({
        ageRange: { min: 18, max: 50 },
        biodataType: '',
        division: '',
    });

    // State for filtered biodatas
    const [filteredBiodatas, setFilteredBiodatas] = useState(biodatas);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Set items per page

    useEffect(() => {
        setFilteredBiodatas(biodatas);
    }, [biodatas]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const [category, key] = name.split('.');

        if (category === 'ageRange') {
            setFilters(prev => ({
                ...prev,
                ageRange: { ...prev.ageRange, [key]: parseInt(value) }
            }));
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const applyFilters = () => {
        let filtered = biodatas;

        // Filter by age range
        filtered = filtered.filter(biodata =>
            biodata.Age >= filters.ageRange.min && biodata.Age <= filters.ageRange.max
        );

        // Filter by biodata type
        if (filters.biodataType) {
            filtered = filtered.filter(biodata => biodata.BiodataType === filters.biodataType);
        }

        // Filter by division
        if (filters.division) {
            filtered = filtered.filter(biodata => biodata.PermanentDivision === filters.division);
        }

        setFilteredBiodatas(filtered);
        setCurrentPage(1); // Reset to the first page after applying filters
    };

    const showAllBiodatas = () => {
        setFilteredBiodatas(biodatas);
        setFilters({
            ageRange: { min: 18, max: 50 },
            biodataType: '',
            division: '',
        });
        setCurrentPage(1); // Reset to the first page when showing all biodatas
    };

    // Calculate the data to display for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBiodatas = filteredBiodatas?.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <Helmet>
                <title>Matrimony Mate | Biodatas</title>
            </Helmet>

            {/* Filter Section */}
            <div className="w-full md:w-1/4 p-4 bg-gray-100">
                <h3 className="text-xl font-bold mt-20 mb-4">Show All data</h3>

                <div className='mt-5 mb-5'>
                    <Button variant="outlined" color="primary" className="w-full" onClick={showAllBiodatas}>
                        <p className='font-bold'>Show All</p>
                    </Button>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4">Filter Options</h3>

                {/* Biodata type Filter */}
                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Biodata Type</InputLabel>
                    <Select
                        label="Biodata Type"
                        name="biodataType"
                        value={filters.biodataType}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>

                {/* Age Range Filter */}
                <div className="my-4">
                    <label className="block mb-2 font-bold">Age Range</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <TextField
                            label="Min Age"
                            variant="outlined"
                            type="number"
                            name="ageRange.min"
                            value={filters.ageRange.min}
                            onChange={handleFilterChange}
                            inputProps={{
                                min: 18,
                            }}
                            className="w-full sm:w-1/2"
                        />
                        <TextField
                            label="Max Age"
                            variant="outlined"
                            type="number"
                            name="ageRange.max"
                            value={filters.ageRange.max}
                            onChange={handleFilterChange}
                            inputProps={{
                                min: 18,
                            }}
                            className="w-full sm:w-1/2"
                        />
                    </div>
                </div>

                {/* Location Filter */}
                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Location</InputLabel>
                    <Select
                        label="Location"
                        name="division"
                        value={filters.division}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Dhaka">Dhaka</MenuItem>
                        <MenuItem value="Chattagram">Chattagram</MenuItem>
                        <MenuItem value="Rangpur">Rangpur</MenuItem>
                        <MenuItem value="Barisal">Barisal</MenuItem>
                        <MenuItem value="Khulna">Khulna</MenuItem>
                        <MenuItem value="Mymensingh">Mymensingh</MenuItem>
                        <MenuItem value="Sylhet">Sylhet</MenuItem>
                    </Select>
                </FormControl>

                <div className='my-4'>
                    <Button variant="contained" color="primary" className="w-full mb-2" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </div>
            </div>

            {/* Biodatas Section */}
            <div className="w-full md:w-3/4 p-4">
                <h3 className="text-3xl text-center my-8 md:my-20">Biodatas {filteredBiodatas?.length}</h3>
                <div className='px-4 py-8 bg-opacity-10 rounded-3xl flex flex-col items-center gap-6 mb-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            currentBiodatas?.map(biodata => <BiodataCard key={biodata._id} biodata={biodata}></BiodataCard>)
                        }
                    </div>
                    <Pagination
                        count={Math.ceil(filteredBiodatas?.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        className="mt-8"
                    />
                </div>
            </div>
        </div>
    );
};

export default Biodatas;
