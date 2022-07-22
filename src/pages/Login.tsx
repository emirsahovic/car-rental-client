import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { loginUser, reset } from '../redux/auth/actions/actionCreators';

import * as Yup from 'yup';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Spinner from '../components/Spinner';

export interface FormLoginValues {
    email: string,
    password: string,
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccessLogin, isErrorLogin, isLoadingLogin, messageLogin } = useSelector((state: RootState) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values: FormLoginValues, actions) => {
            const { email, password } = values;
            const userData = { email, password };
            dispatch(loginUser(userData) as any);

            actions.resetForm();
        }
    })

    const handleClick = () => {
        navigate('/');
    }

    useEffect(() => {
        if (isSuccessLogin) {
            navigate('/');
        }

        dispatch(reset() as any);
    }, [isSuccessLogin, navigate, dispatch])

    if (isLoadingLogin) {
        return <Spinner />
    }

    return (
        <>
            <Container maxWidth='xl'>
                <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} justifyContent='space-between' sx={{ pt: '1rem' }}>
                    <Box component='img' src={'/assets/logo.png'} sx={{ maxHeight: '6rem', maxWidth: '12rem', m: { xs: '2rem auto 0.5rem', md: '0' } }} alt='Logo' />
                    <Typography variant='subtitle1' color='#938F99' sx={{ mr: { xs: '0rem', md: '5.7rem' }, fontWeight: 'bold', fontSize: { xs: '16px', md: '21px' }, pt: '1rem' }} textAlign={{ xs: 'center', md: 'left' }}>Online Car Rental. Simple & Efficient.</Typography>
                </Box>
                <Box display='flex' justifyContent={{ xs: 'space-between', sm: 'center', md: 'space-between' }}>
                    <Box sx={{ width: '38rem', pt: '4rem' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#ff7917', fontSize: '36px', mt: { sm: '2rem', md: 0 } }}>Sign In</Typography>
                        {isErrorLogin && !isLoadingLogin && <Typography id='hideMe' align='center' sx={{ color: '#fff', backgroundColor: '#ff7917', mt: '1.5rem', py: '0.4rem', fontWeight: '600', borderRadius: '4px' }}>{messageLogin}</Typography>}
                        <form onSubmit={formik.handleSubmit} style={{ marginTop: '2.5rem' }}>
                            <TextField
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                type='text'
                                name="email"
                                size='small'
                                label="Email Address"
                                variant="outlined"
                                sx={{ mt: '1.5rem' }} />
                            <TextField
                                fullWidth
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                type='password'
                                name="password"
                                size='small'
                                label="Password"
                                variant="outlined"
                                sx={{ mt: '1.5rem' }} />
                            <Box display='flex' justifyContent='end' marginTop={2}>
                                <Button
                                    onClick={handleClick}
                                    type='submit'
                                    sx={{ textTransform: 'none', fontSize: '16px', color: '#666', "&:hover": { background: 'transparent' } }}>
                                    Sign In As Guest
                                </Button>
                            </Box>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: { xs: '8rem', sm: '10rem', md: '8rem' }, mb: '1.5rem', textTransform: 'none', backgroundColor: '#ff7917', fontSize: '18px', fontWeight: '500', color: '#fff' }}>
                                Sign In
                            </Button>
                        </form>
                        <Box display='flex' marginBottom={{ xs: '3rem', md: '0rem' }}>
                            <Typography>Don't have an account?</Typography>
                            <Typography sx={{ fontWeight: 'bold', ml: '0.5rem' }}>
                                <Link to='/sign-up' style={{ color: '#ff7917', textDecoration: 'none' }}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box component='img' display={{ xs: 'none', md: 'block' }} src={'/assets/signin.png'} sx={{ height: '32rem', width: '44rem', pt: '6rem', position: 'absolute', right: 85 }} alt='Hero' />
                </Box >
            </Container>
            <Box display={{ xs: 'none', md: 'block' }} className="vline" />
        </>
    );
}

export default Login;
