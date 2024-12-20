import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user.svg';
import Login from '../Pages/Login'; // Import the Login component
import { auth } from '../Utils/firebase'; // Assuming Firebase is used for authentication
import Navbar from './Navbar';
import ProfileMenu from './ProfileMenu ';

const Header = () => {
    const [active, setActive] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const [showLogin, setShowLogin] = useState(false); // State to control Login modal
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
    const [userProfile, setUserProfile] = useState(null); // Track user profile

    const toggleMenu = () => setMenuOpened(!menuOpened);

    const handleLoginClick = () => {
        setShowLogin(true); // Show the Login component
    };

    const handleCloseLogin = () => {
        setShowLogin(false); // Hide the Login component
    };

    const handleLogout = async () => {
        await signOut(auth);
        setIsAuthenticated(false);
        setUserProfile(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                if (menuOpened) {
                    setMenuOpened(false);
                }
            }
            setActive(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuOpened]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUserProfile({
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });
            } else {
                setIsAuthenticated(false);
                setUserProfile(null);
            }
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    return (
        <header className='max-padd-container fixed top-1 w-full left-0 right-0 z-50'>
            <div className={`${active ? 'py-0' : 'py-1'} max-padd-container bg-white transition-all duration-200 rounded-full px-5 ring-2 ring-slate-900/5`}>
                <div className='flexBetween py-3'>
                    {/* Logo */}
                    <Link to={'/'}>
                        <span className='font-[900] texet-[24px] font-M'>m
                            <span className='font-[600] medium-20 font-Logo'>Luxe</span>
                        </span>
                    </Link>

                    {/* NavBar */}
                    <div className='flexCenter gap-x-4'>
                        {/* Desktop */}
                        <Navbar containerStyle={"hidden xl:flex gap-x-5 xl:gap-x-10 capitalize medium-15 ring-slate-900/10 rounded-full"} />

                        {/* Mobile */}
                        <Navbar containerStyle={`${menuOpened ? "flex items-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50" :
                            "flex items-start flex-col gap-y-8 capitalize fixed top-20 -right-[100%] p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"}`} />
                    </div>

                    {/* Button */}
                    <div>
                        <div className='flexBetween gap-x-3 sm:gap-x-5 bold-16 '>
                            {!menuOpened ? (
                                <MdMenu onClick={toggleMenu} className='xl:hidden cursor-pointer text-3xl hover:text-secondary' />
                            ) : (
                                <MdClose onClick={toggleMenu} className='xl:hidden cursor-pointer text-3xl hover:text-secondary' />
                            )}
                            {!isAuthenticated ? (
                                <button
                                    className='btn-secondary flexCenter gap-x-2 medium-16 rounded-full'
                                    onClick={handleLoginClick}
                                >
                                    <img src={userIcon} alt="" height={22} width={22} />
                                    <span>Login</span>
                                </button>
                            ) : (
                                <ProfileMenu userProfile={userProfile} handleLogout={handleLogout} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditional Rendering of Login Component */}
            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flexCenter z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-3 right-3 text-xl text-red-500"
                            onClick={handleCloseLogin}
                        >
                            &times;
                        </button>
                        <Login />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
