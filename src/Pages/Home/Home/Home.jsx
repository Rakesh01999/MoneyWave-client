import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import PremiumMemberProfile from "../PremiumMemberProfile/PremiumMemberProfile";
import HowItWorks from "../HowItWorks/HowItWorks";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStory from "../SuccessStory/SuccessStory";

import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Matrimony Mate | Home</title>
            </Helmet>
            <Banner></Banner>
            <PremiumMemberProfile></PremiumMemberProfile>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <SuccessStory></SuccessStory>
            {/* <Category></Category> */}
            {/* <PopularMenu></PopularMenu> */}
            {/* <Featured></Featured> */}
            {/* <Testimonials></Testimonials> */}
        </div>
    );
};

export default Home;