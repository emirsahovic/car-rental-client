import { Props, slide as Menu } from "react-burger-menu";
import { Stack, Box, Typography, Button } from '@mui/material';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/auth/actions/actionCreators';
import Spinner from './Spinner';
import { useState } from 'react';
import AdminMenu from './AdminMenu';

export default (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Menu> & Readonly<Props>) => {
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const { isLoadingLogout, isSuccessLogin } = useSelector((state: RootState) => state.auth);
    const userLs = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!);

    const handleLogout = () => {
        dispatch(logout() as any);
        if (!isLoadingLogout)
            setIsLoggedOut(true);
    }

    const routeMatch = (url: string): boolean | undefined => {
        if (pathname === url) return true;
    }

    if (isLoadingLogout) {
        return <Spinner />
    }

    if (isLoggedOut) {
        return <Navigate to='/sign-in' />
    }

    return (
        <Menu {...props}>
            <img src={'/assets/logo.png'} style={{ width: '5.5rem', marginTop: '-3.5rem', marginLeft: '-1rem', marginBottom: '2rem' }} alt='Logo' />
            <Stack direction='column' justifyContent='space-between' alignItems='center' sx={{ py: '1rem' }}>
                <Stack direction='column'>
                    <Link to='/' className={`${routeMatch('/') && 'prim-color'} link-hover`} style={{ color: '#bfbfbf', marginBottom: `${userLs && userLs?.email === 'admin' ? '0.8rem' : '0'}` }}>Home</Link>
                    {(userLs || isSuccessLogin) && userLs?.email === 'admin' ?
                        <Box>
                            <AdminMenu color='#bfbfbf' />
                        </Box> :
                        <Link to='/vehicles/page/1' className={`${routeMatch(`/vehicles/page/${1}`) && 'prim-color'} link-hover`} style={{ color: '#bfbfbf', marginTop: '0.8rem' }}>Vehicles</Link>
                    }
                    {(userLs || isSuccessLogin) && userLs?.email !== 'admin' ?
                        <Link to='/rentals/page/1' className={`${routeMatch(`/rentals/page/${1}`) && 'prim-color'} link-hover`} style={{ color: '#bfbfbf', marginTop: '0.8rem' }}>Rentals</Link>
                        : userLs ?
                            <Link to='/users/page/1' className={`${routeMatch(`/users/page/${1}`) && 'prim-color'} link-hover`} style={{ color: '#bfbfbf', marginTop: '0.8rem' }}>Users</Link>
                            : null
                    }
                    <Link to='/about' className={`${routeMatch('/about') && 'prim-color'} link-hover`} style={{ color: '#bfbfbf', marginTop: '0.8rem' }}>About Us</Link>
                    <Link to='/contact' className={`${routeMatch('/contact') && 'prim-color'} link-hover`} style={{ color: '#bfbfbf', marginTop: '0.8rem' }}>Contact Us</Link>
                </Stack>
                {(userLs || isSuccessLogin) && userLs?.email === 'admin' ?
                    <>
                        <div style={{ marginTop: '1.5rem', height: '1px', width: '100%', background: '#bfbfbf' }} />
                        <Stack spacing={2} direction='row' alignItems='center' paddingBottom={0.8} marginTop={4}>
                            <Typography component='span' sx={{ fontSize: '18px', color: '#e6e6e6', pb: '0.2rem' }}>Admin <Typography component='span' sx={{ fontSize: '30px', mx: '0.2rem' }}>|</Typography></Typography>
                            <Button onClick={handleLogout} variant='contained' sx={{ fontSize: '17px', textTransform: 'none', py: '0.04rem', px: '0.8rem', fontWeight: '400', color: '#fff', mt: '1.7rem' }}>
                                Log out
                            </Button>
                        </Stack>
                    </>
                    : (userLs || isSuccessLogin) && userLs?.email !== 'admin' ?
                        <Button onClick={handleLogout} variant='contained' sx={{ fontSize: '17px', textTransform: 'none', py: '0.04rem', px: '0.8rem', fontWeight: '400', color: '#fff', mt: '1.7rem' }}>
                            Log out
                        </Button>
                        :
                        <>
                            <div style={{ marginTop: '1.5rem', height: '1px', width: '100%', background: '#bfbfbf' }} />
                            <Stack direction='row' spacing={3} alignItems='center' color='#72717d' justifyContent='center' marginTop={4}>
                                <Link to='/sign-in' style={{ color: '#bfbfbf' }}>
                                    Log In
                                </Link>
                                <Link to='/sign-up' className='link-hover' style={{ color: '#bfbfbf' }}>
                                    <Button variant='contained' sx={{ fontSize: '18px', textTransform: 'none', py: '0.08rem', px: '1rem', fontWeight: '500', color: '#fff' }}>Register</Button>
                                </Link>
                            </Stack>
                        </>
                }
            </Stack>
        </Menu >
    );
};