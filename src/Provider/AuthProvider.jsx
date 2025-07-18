import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import auth from '../Firebase/firebase.init.js';
import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Set axios base URL
    axios.defaults.baseURL = 'http://localhost:3000';

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users'); // Using baseURL now
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                await fetchUsers();
            } else {
                setUserData([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        userData,
        loading,
        createUser,
        login,
        logout,
        googleSignIn,
        setUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
