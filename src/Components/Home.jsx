import React from 'react';
import Banner from './Banner';
import FeaturedFoods from './FeaturedFoods';
import AnimatedCounter from './AnimatedCounter';
import FAQSection from './FAQSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <AnimatedCounter></AnimatedCounter>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;