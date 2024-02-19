import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addUser, removeUser } from '../utils/slice/userSlice';
import { motion } from "framer-motion";


const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible
};
// import { changeLanguage } from '../utils/configSlice';
// import { toast } from 'react-toastify';

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const handleUserIconClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    //   const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                if (window.location.pathname === '/') {
                    navigate('/home');
                }
            } else {
                dispatch(removeUser());
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // toast.success('You have been successfully signed out. Come back soon!');
            })
            .catch(() => {
                navigate('/error');
            });
    };


    return (
        <motion.div initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 1 } }}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            className="">

        </motion.div>
    );
};

export default Header;


