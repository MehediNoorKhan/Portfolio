import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';

const Header = () => {
    const { user, userData, logout } = useContext(AuthContext);

    const handlelogout = () => {
        logout()
            .then(() => { })
            .catch((error) => console.log(error));
    };



    // Find the user object that matches the logged-in user's email
    const currentUser = userData.find(u => String(u.email) === String(user?.email));


    const links = (
        <>
            <NavLink to={'/'} className="mx-2 text-base hover:text-blue-600">Home</NavLink>
            <NavLink to={'/availablefoods'} className="mx-2 text-base hover:text-blue-600">Available Foods</NavLink>
            {user && (
                <>
                    <NavLink to={'/addfood'} className="mx-2 text-base hover:text-blue-600">Add Food</NavLink>
                    <NavLink to={'/managemyfoods'} className="mx-2 text-base hover:text-blue-600">Manage Foods</NavLink>
                    <NavLink to={'/myfoodrequest'} className="mx-2 text-base hover:text-blue-600">My Food Request</NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-gradient-to-r from-blue-50 to-blue-100 shadow-md py-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <NavLink to={'/'} className="text-2xl font-bold text-blue-700 ml-4">FoodZone</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end mr-4 flex items-center gap-3">
                {user ? (
                    <>

                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={currentUser?.photourl || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                        <button onClick={handlelogout} className="btn btn-md btn-outline text-blue-600">Log out</button>
                    </>
                ) : (
                    <>
                        <NavLink to={'/register'}>
                            <button className="btn btn-sm btn-outline mx-1">Register</button>
                        </NavLink>
                        <NavLink to={'/login'}>
                            <button className="btn btn-sm btn-outline mx-1">Sign in</button>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
