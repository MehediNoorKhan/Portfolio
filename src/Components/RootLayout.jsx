import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';


const RootLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;