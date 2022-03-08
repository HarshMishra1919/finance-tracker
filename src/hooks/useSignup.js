import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);
        // loading starts
        try {
            //signup user
            const res = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );
            if (!res) {
                throw new Error(
                    'Could not complete signup! please try again...'
                );
            }

            // add display name to user
            await res.user.updateProfile({ displayName: displayName });

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user });
            console.log(res.user);
            
            //loading ends
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    };
    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);
    return { error, isPending, signup };
};
