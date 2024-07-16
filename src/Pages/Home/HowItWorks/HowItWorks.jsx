import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
// import HowItWorksImage1 from './images/how-it-works-1.jpg';
// import HowItWorksImage2 from './images/how-it-works-2.jpg';
// import HowItWorksImage3 from './images/how-it-works-3.jpg';
import { MdFindInPage } from "react-icons/md";

const HowItWorks = () => {
    return (
        <div>
            <SectionTitle
                subHeading={"Want to know about this site"}
                heading={"How It Works"}>
            </SectionTitle>
            {/* <h3 className='text-3xl mt-10 font-bold'>How It Works</h3> */}
            <section id="how-it-works" style={{ backgroundColor: '#f9f9f9', padding: '80px 0' }}>
                <div data-aos="zoom-out-down">
                </div>
                <Container>
                    {/* <Typography variant="h3" align="center" gutterBottom>
                    How It Works
                </Typography> */}
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={4} >
                            {/* <Card className="hover:shadow-2xl transition duration-300 ease-in-out p-4 hover:bg-blue-300" sx={{ backgroundColor: 'ButtonHighlight' }}> */}
                            <div data-aos="zoom-out-down">    
                            <Card className="hover:shadow-2xl transition duration-300 ease-in-out p-4" sx={{ backgroundColor: '' }}>
                                <CardMedia
                                    component="img"
                                    // image={HowItWorksImage1}
                                    image={"https://i.postimg.cc/5N01mTHY/1.jpg"}

                                    alt="Find Matches"
                                    style={{ height: 200, width: 200 }}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Find Matches
                                    </Typography>
                                    <Typography>
                                        Browse through profiles and find matches based on your preferences.
                                    </Typography>
                                </CardContent>
                            </Card>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <div data-aos="zoom-out-down">    
                            <Card className="hover:shadow-2xl transition duration-300 ease-in-out p-4 " sx={{ backgroundColor: '' }}>
                                <CardMedia
                                    component="img"
                                    // image={HowItWorksImage2}
                                    image={"https://i.postimg.cc/0N1LhBNC/2.jpg"}
                                    alt="Connect"
                                    style={{ height: 200, width: 200 }}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Connect
                                    </Typography>
                                    <Typography>
                                        Connect with potential matches and start conversations to get to know each other.
                                    </Typography>
                                </CardContent>
                            </Card>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <div data-aos="zoom-out-down">    
                            <Card className="hover:shadow-2xl transition duration-300 ease-in-out p-4 " sx={{ backgroundColor: '' }}>
                                <CardMedia
                                    component="img"
                                    // image={HowItWorksImage3}
                                    image={"https://i.postimg.cc/TwCFL2Jk/3.png"}
                                    alt="Meet"
                                    style={{ height: 200, width: 200 }}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Meet
                                    </Typography>
                                    <Typography>
                                        Arrange meetings with matches and take the next step towards building a relationship.
                                    </Typography>
                                </CardContent>
                            </Card>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </div>
    );
};

export default HowItWorks;



