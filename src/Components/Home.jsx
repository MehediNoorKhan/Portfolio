import React from 'react';
import Banner from './Banner';
import FeaturedFoods from './FeaturedFoods';
import AnimatedCounter from './AnimatedCounter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <AnimatedCounter></AnimatedCounter>
        </div>
    );
};

export default Home;