import { Container, Grid, Box, Stack, Typography, TextField, Button } from '@mui/material';
import { MdFacebook, MdLocationPin } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';
import { FaTwitter, FaPhoneAlt } from 'react-icons/fa';

import emailjs from 'emailjs-com';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Sidebar from '../components/Sidebar';

const ContactUs = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Enter a valid email address').required('Required'),
            message: Yup.string().required('Required')
        }),
        onSubmit: (values, actions) => {
            emailjs.send(process.env.REACT_APP_EMAIL_SERVICEID as string, process.env.REACT_APP_EMAIL_TEMPLATE2ID as string, values as unknown as Record<string, unknown>, process.env.REACT_APP_EMAIL_KEY as string)
                .then((result) => { console.log(result.text); },
                    (error) => { console.log(error.text); });
            actions.resetForm();
        }
    })

    return (
        <>
            <Box display={{ xs: 'none', md: 'block' }} sx={{ mb: '4rem' }}>
                <Navbar />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </Box>
            <Container maxWidth='xl'>
                <Box sx={{ color: '#323642' }}>
                    <Grid container columnSpacing={20}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Typography variant='h2' sx={{ mt: { xs: '8rem', sm: '8.6rem', md: '0' } }}>Contact us</Typography>
                                <Grid container rowSpacing={10} sx={{ ml: '10px', mt: '1px' }}>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant='body1' fontWeight='bold'> Address</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box display='flex' alignItems='center'>
                                            <MdLocationPin size={30} />
                                            <Typography variant='body1' marginLeft={0.5}> Testna 31C</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant='body1' fontWeight='bold'> Phone number</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Box display='flex' alignItems='center'>
                                                <FaPhoneAlt size={20} />
                                                <Typography variant='body1' marginLeft='1em'> 032/556-665</Typography>
                                            </Box>
                                            <Box display='flex' alignItems='center' marginTop={2} marginLeft={0.1}>
                                                <FaPhoneAlt size={20} />
                                                <Typography variant='body1' marginLeft='1em'>062/562-652</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant='body1' fontWeight='bold'> Follow us on </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} textAlign='center'>
                                        <Stack direction='row' spacing={{ xs: 1, md: 5 }}>
                                            <Box>
                                                <MdFacebook size={30} />
                                                <Typography variant='body1' sx={{ fontSize: { xs: '14px', md: '16px' } }}>Facebook</Typography>
                                            </Box>
                                            <Box>
                                                <AiFillInstagram size={30} />
                                                <Typography variant='body1' sx={{ fontSize: { xs: '14px', md: '16px' } }}>Instagram</Typography>
                                            </Box>
                                            <Box display={{ xs: 'none', md: 'block' }}>
                                                <FaTwitter size={30} />
                                                <Typography variant='body1'> Twitter</Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    variant="outlined"
                                    sx={{ mt: { xs: '10rem', md: '9rem' } }}
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    variant="outlined"
                                    sx={{ mt: '2rem' }}
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    fullWidth
                                    label="Comment"
                                    variant="outlined"
                                    multiline={true}
                                    rows={7}
                                    sx={{ mt: '2rem' }}
                                    name='message'
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    error={formik.touched.message && Boolean(formik.errors.message)}
                                    helperText={formik.touched.message && formik.errors.message}
                                />
                                <Button type='submit' fullWidth variant="contained" sx={{ mt: '2rem', mb: '8rem', textTransform: 'none', color: '#fff', py: '0.5rem' }}>Send message</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default ContactUs;
