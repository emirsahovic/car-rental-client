import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { registerUser } from '../redux/auth/actions/actionCreators';
import * as Yup from 'yup';

import { GrFormView, GrMail } from 'react-icons/gr';

import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Spinner from '../components/Spinner';

export interface FormRegisterValues {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword?: string
}

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccessRegister, isErrorRegister, isLoadingRegister, messageRegister } = useSelector((state: RootState) => state.auth);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter a valid email address').required('Required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contain 8 characters, one uppercase, one lowercase, one number and one special character").required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Required'),
            phoneNumber: Yup.string().matches(/^[0-9]+$/, "Phone number must contain only digits").min(8, 'Phone number should contain at least 8 digits').max(15, 'Phone number cannot be longer than 15 digits').required('Required')
        }),
        onSubmit: (values: FormRegisterValues, { resetForm }) => {
            const { firstName, lastName, email, phoneNumber, password } = values;
            const userData = {
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            }
            dispatch(registerUser(userData) as any);
            if (isSuccessRegister) {
                resetForm();
            }
        }
    })

    useEffect(() => {
        if (isSuccessRegister) {
            navigate('/sign-in');
        }
    }, [navigate, isSuccessRegister])

    if (isLoadingRegister) {
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
                    <Box sx={{ width: '38rem', py: '3.5rem' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '36px', color: '#ff7917', mb: '1rem', mt: { sm: '2rem', md: 0 } }}>Sign Up</Typography>
                        {isErrorRegister && !isLoadingRegister && <Typography id='hideMe' align='center' sx={{ color: '#fff', backgroundColor: '#ff7917', mt: '1.5rem', py: '0.4rem', fontWeight: '600', borderRadius: '4px' }}>{messageRegister}</Typography>}
                        <form onSubmit={formik.handleSubmit} style={{ marginTop: '2.5rem' }}>
                            <TextField
                                fullWidth
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                type='text'
                                name="firstName"
                                size='small'
                                label="First Name"
                                variant="outlined"
                                sx={{ mt: '1.7rem' }} />
                            <TextField
                                fullWidth
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                type='text'
                                name="lastName"
                                size='small'
                                label="Last Name"
                                variant="outlined"
                                sx={{ mt: '1.7rem' }} />
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    type='text'
                                    name="email"
                                    size='small'
                                    label="Email"
                                    variant="outlined"
                                    sx={{ mt: '1.7rem' }} />
                                <GrMail
                                    style={formik.touched.email && formik.errors.email ? { position: 'absolute', bottom: 32, right: 7, fontSize: '1.3rem' } :
                                        { position: 'absolute', bottom: 8, right: 8, fontSize: '1.3rem' }} />
                            </Box>
                            <TextField
                                fullWidth
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                type='text'
                                name="phoneNumber"
                                size='small'
                                label="Phone Number"
                                variant="outlined"
                                sx={{ mt: '1.7rem' }} />
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    size='small'
                                    label="Password"
                                    variant="outlined"
                                    sx={{ mt: '1.7rem' }} />
                                <GrFormView onClick={() => setShowPassword(prevState => !prevState)}
                                    style={formik.touched.password && formik.errors.password && formik.errors.password.length > 100 ? { position: 'absolute', bottom: 48, right: 2, fontSize: '1.8rem', cursor: 'pointer' } : formik.touched.password && formik.errors.password && formik.errors.password.length < 100 ? { position: 'absolute', bottom: 28, right: 2, fontSize: '1.8rem', cursor: 'pointer' } :
                                        { position: 'absolute', bottom: 5, right: 2, fontSize: '1.8rem', cursor: 'pointer' }} />
                            </Box>
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    size='small'
                                    label="Confirm Password"
                                    variant="outlined"
                                    sx={{ mt: '1.7rem' }} />
                                <GrFormView onClick={() => setShowConfirmPassword(prevState => !prevState)}
                                    style={formik.touched.confirmPassword && formik.errors.confirmPassword ? { position: 'absolute', bottom: 28, right: 2, fontSize: '1.8rem', cursor: 'pointer' } :
                                        { position: 'absolute', bottom: 5, right: 2, fontSize: '1.8rem', cursor: 'pointer' }} />
                            </Box>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained' sx={{ mt: { xs: '3.25rem', sm: '6rem', md: '3.25rem' }, mb: '1.5rem', backgroundColor: '#ff7917', textTransform: 'none', fontSize: '18px', fontWeight: '500', color: '#fff' }}>Sign Up</Button>
                        </form>
                        <Typography variant='body1'>You have an account?
                            <Typography component='span' sx={{ fontWeight: 'bold', ml: '0.7rem' }}>
                                <Link to='/sign-in' style={{ textDecoration: 'none', color: '#ff7917' }}>
                                    Sign In
                                </Link>
                            </Typography>
                        </Typography>
                    </Box>
                    <Box component='img' display={{ xs: 'none', md: 'block' }} src={'/assets/signin.png'} sx={{ height: '32rem', width: '44rem', pt: '6rem', position: 'absolute', right: 85 }} alt='Hero' />
                </Box>
            </Container >
            <Box display={{ xs: 'none', md: 'block' }} className="vline" />
        </>
    );
}

export default Register;
