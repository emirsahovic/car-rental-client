import { Container, Stack, Box, Typography } from '@mui/material';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { MdLocationOn } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { isSuccessLogin } = useSelector((state: RootState) => state.auth);
    const userLs = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!);

    return (
        <Box sx={{ backgroundColor: '#2e2a40', py: '2.7rem' }}>
            <Container maxWidth='xl'>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' spacing={{ xs: 5.5, md: 8 }}>
                    <Box display='flex' sx={{ flexDirection: 'column', width: { xs: '100%', md: '15%' }, ml: { xs: '0', md: '3.1rem' }, mr: { xs: '0', md: '4.5rem' } }}>
                        <Box component='img' sx={{ width: '5.8rem', height: '3.8rem', mx: { xs: 'auto', md: 'none' } }} src={'/assets/logo.png'} alt='Logo' />
                        <Typography textAlign={{ xs: 'center', md: 'left' }} variant='body1' sx={{ color: '#bbb', fontWeight: '300', mt: '0.5rem', lineHeight: 1.8 }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus quaerat nobis maiores.</Typography>
                        <Box display='flex' alignItems='center' marginTop={3} sx={{ mx: { xs: 'auto', md: '0' } }}>
                            <a href='https://facebook.com' rel='noreferrer' className='link-hover'>
                                <FaFacebook size={25} style={{ marginRight: '0.5rem' }} />
                            </a>
                            <a href='https://youtube.com' rel='noreferrer' className='link-hover'>
                                <FaYoutube size={25} style={{ marginRight: '0.5rem' }} />
                            </a>
                            <a href='https://instagram.com' rel='noreferrer' className='link-hover'>
                                <AiFillInstagram size={25} style={{ marginRight: '0.5rem' }} />
                            </a>
                            <a href='https://twitter.com' rel='noreferrer' className='link-hover'>
                                <AiFillTwitterCircle size={25} />
                            </a>
                        </Box>
                    </Box>
                    <Box display='flex' sx={{ flexDirection: 'column', width: { xs: '100%', md: '15%' }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#fff' }}>Our Services</Typography>
                        <Box display='flex' sx={{ flexDirection: 'column', mt: '2.6rem' }}>
                            <Link to='/' className='btn-opacity' style={{ color: '#bbb', marginBottom: '0.8rem' }}>Home</Link>
                            <Link to='/vehicles/page/1' className='btn-opacity' style={{ color: '#bbb', marginBottom: '0.8rem' }}>Vehicles</Link>
                            {((userLs || isSuccessLogin)) && userLs?.email !== 'admin' ?
                                <Link to='/rentals/page/1' style={{ color: '#bbb', marginBottom: '0.8rem' }} className='btn-opacity'>Rentals</Link>
                                : userLs ?
                                    <Link to='/users/page/1' style={{ color: '#bbb', marginBottom: '0.8rem' }} className='btn-opacity'>Users</Link>
                                    : null
                            }                            <Link to='/about' className='btn-opacity' style={{ color: '#bbb', marginBottom: '0.8rem' }}>About Us</Link>
                            <Link to='/contact' className='btn-opacity' style={{ color: '#bbb' }}>Contact Us</Link>
                        </Box>
                    </Box>
                    <Box display='flex' sx={{ flexDirection: 'column', width: { xs: '100%', md: '15%' }, ml: '2rem', textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#fff' }}>Locations</Typography>
                        <Box display='flex' sx={{ flexDirection: 'column', mt: '2.6rem' }}>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Zenica</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Sarajevo</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Tuzla</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Banja Luka</Typography>
                            <Typography sx={{ color: '#bbb', lineHeight: 1.1 }}>Mostar</Typography>
                        </Box>
                    </Box>
                    <Box display='flex' sx={{ flexDirection: 'column', width: { xs: '100%', md: '15%' }, ml: '2rem', textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#fff' }}>Vehicle Brands</Typography>
                        <Box display='flex' sx={{ flexDirection: 'column', mt: '2.6rem' }}>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>BMW</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Audi</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Mercedes-Benz</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Renault</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Peugeot</Typography>
                            <Typography sx={{ color: '#bbb', mb: '0.8rem', lineHeight: 1.1 }}>Škoda</Typography>
                            <Typography sx={{ color: '#bbb', lineHeight: 1.1 }}>Volkswagen</Typography>
                        </Box>
                    </Box>
                    <Box display='flex' sx={{ flexDirection: 'column', width: { xs: '100%', md: '15%' }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#fff' }}>Contact</Typography>
                        <Box display='flex' sx={{ flexDirection: 'column', mt: '2.6rem' }}>
                            <Box display='flex' alignItems='center' justifyContent={{ xs: 'center', md: 'start' }}>
                                <BsFillTelephoneFill size={15} style={{ border: '#bbb 1px solid', color: '#bbb', padding: '5px 6px', borderRadius: '20px' }} />
                                <Typography sx={{ color: '#bbb', ml: '0.8rem' }}>+123 456 789</Typography>
                            </Box>
                            <Box display='flex' alignItems='center' justifyContent={{ xs: 'center', md: 'start' }} marginTop={3}>
                                <GrMail size={15} style={{ border: '#bbb 1px solid', color: '#bbb', padding: '5px 6px', borderRadius: '20px' }} />
                                <Typography sx={{ color: '#bbb', ml: '0.8rem' }}>test@etest.com</Typography>
                            </Box>
                            <Box display='flex' alignItems='center' justifyContent={{ xs: 'center', md: 'start' }} marginTop={3}>
                                <MdLocationOn size={15} style={{ border: '#bbb 1px solid', color: '#bbb', padding: '5px 6px', borderRadius: '20px' }} />
                                <Typography sx={{ color: '#bbb', ml: '0.8rem' }}>Testna 31C</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
                <Typography textAlign='center' variant='body1' color='#fff' marginTop={7} sx={{ fontWeight: '500' }}>Copyright &copy; Car Rental 2022. All Rights Reserved.</Typography>
            </Container>
        </Box >
    )
}

export default Footer;
