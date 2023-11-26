/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";



export const AuthContext = createContext();
const gProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword( auth, email, password);
    };
    //update user
    const updateUser = ( name, url ) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL :url
        });
    };
    //login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    //google sign in
    const signIn = () => {
        setLoading(true);
        return signInWithPopup(auth, gProvider);
    };
    //observer
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);
    //logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authInfo = {
        user,
        loading,
        createUser,
        updateUser,
        login,
        signIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;