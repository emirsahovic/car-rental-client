import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [checkingStatus, setCheckingStatus] = useState<boolean>(true);

    const { isSuccessLogin } = useSelector((state: RootState) => state.auth);
    const userLs = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!);

    useEffect(() => {
        if (userLs || isSuccessLogin) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [userLs, isSuccessLogin])

    return { loggedIn, checkingStatus }
}
