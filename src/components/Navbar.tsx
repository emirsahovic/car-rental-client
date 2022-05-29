import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/auth/actions/actionCreators';
import Spinner from './Spinner';
import { useState } from 'react';
import AdminMenu from './AdminMenu';

const Navbar = () => {
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
    const { pathname } = useLocation();
    const { pageNumber } = useParams();
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
        <Container maxWidth='xl'>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ py: '1rem' }}>
                <Link to='/'>
                    <Box display='flex' alignItems='center'>
                        <img style={{ width: '6.8rem', height: '4.8rem' }} src={'/assets/logo.png'} alt='Logo' />
                        <Typography variant='h6' marginLeft={1.5}>Car Rental</Typography>
                    </Box>
                </Link>
                <Stack direction='row' spacing={5} alignItems='center' color='#72717d'>
                    <Link to='/' className={`${routeMatch('/') && 'prim-color'} link-hover`}>Home</Link>
                    {(userLs || isSuccessLogin) && userLs?.email === 'admin' ?
                        <AdminMenu color='#72717d' /> :
                        <Link to='/vehicles/page/1' className={`${routeMatch(`/vehicles/page/${pageNumber}`) && 'prim-color'} link-hover`}>Vehicles</Link>
                    }
                    {(userLs || isSuccessLogin) && userLs?.email !== 'admin' ?
                        <Link to='/rentals/page/1' className={`${routeMatch(`/rentals/page/${pageNumber}`) && 'prim-color'} link-hover`}>Rentals</Link>
                        : userLs ?
                            <Link to='/users/page/1' className={`${routeMatch(`/users/page/${pageNumber}`) && 'prim-color'} link-hover`}>Users</Link>
                            : null
                    }
                    <Link to='/about' className={`${routeMatch('/about') && 'prim-color'} link-hover`}>About Us</Link>
                    <Link to='/contact' className={`${routeMatch('/contact') && 'prim-color'} link-hover`}>Contact Us</Link>
                </Stack>
                {(userLs || isSuccessLogin) && userLs?.email === 'admin' ?
                    <Stack spacing={2} direction='row' alignItems='center' paddingBottom={0.8}>
                        <Typography component='span' sx={{ fontSize: '18px', color: '#72717d', pb: '0.2rem' }}>Admin <Typography component='span' sx={{ fontSize: '30px', mx: '0.2rem' }}>|</Typography></Typography>
                        <Button onClick={handleLogout} variant='contained' sx={{ fontSize: '18px', textTransform: 'none', py: '0.08rem', px: '1rem', fontWeight: '500', color: '#fff' }}>
                            Log out
                        </Button>
                    </Stack>
                    : (userLs || isSuccessLogin) && userLs?.email !== 'admin' ?
                        <Button onClick={handleLogout} variant='contained' sx={{ fontSize: '18px', textTransform: 'none', py: '0.08rem', px: '1rem', fontWeight: '500', color: '#fff' }}>
                            Log out
                        </Button>
                        : <Stack direction='row' spacing={3} alignItems='center' color='#72717d'>
                            <Link to='/sign-in' className='link-hover'>Log In</Link>
                            <Link to='/sign-up'>
                                <Button variant='contained' sx={{ fontSize: '18px', textTransform: 'none', py: '0.08rem', px: '1rem', fontWeight: '500', color: '#fff' }}>Register</Button>
                            </Link>
                        </Stack>
                }
            </Stack>
        </Container >
    )
}

export default Navbar
