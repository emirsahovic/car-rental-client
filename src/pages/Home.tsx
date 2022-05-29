import { useEffect } from "react";
import { Link } from "react-router-dom";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { Container, Stack, Box, Typography, styled, Button } from '@mui/material';
import { GrLike } from 'react-icons/gr';
import { MdOutlinePets, MdOutlineLocalCarWash, MdLocationPin, MdDateRange, MdPriceCheck, MdVerifiedUser, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';
import { GiRedCarpet, GiApothecary } from 'react-icons/gi';
import { BiShapeTriangle } from 'react-icons/bi';
import { AiFillCar, AiTwotoneCar } from 'react-icons/ai';
import { FiPhoneIncoming } from 'react-icons/fi';
import { BsFillFilePersonFill } from 'react-icons/bs';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Car } from "../redux/car/reducers/carReducer";
import { getCars } from "../redux/car/actions/actionCreators";

import CarItem from "../components/CarItem";
import Sidebar from "../components/Sidebar";

function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <MdOutlineArrowForwardIos
                className='btn-opacity'
                style={{ color: '#ff6701', cursor: 'pointer' }}
                size={40}
            />
        </div>
    );
}

function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <MdOutlineArrowBackIos
                className='btn-opacity'
                style={{ color: '#ff6701', cursor: 'pointer' }}
                size={40}
            />
        </div>
    );
}

const StyledStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2.5rem',
    marginTop: '3rem',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        gap: '4rem',
        marginTop: '7rem'
    }
}))

const Home = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const dispatch = useDispatch();
    const { carsObj, isLoadingCar } = useSelector((state: RootState) => state.car);

    useEffect(() => {
        dispatch(getCars() as any);
    }, [dispatch])

    if (isLoadingCar) {
        return <Spinner />
    }

    return (
        <>
            <Box display={{ xs: 'none', md: 'block' }} sx={{ mb: '3rem' }}>
                <Navbar />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </Box>
            <Container maxWidth='xl'>
                <Stack direction='row' justifyContent='space-between' sx={{ mb: { xs: '4rem', md: '7rem' } }}>
                    <Box display='flex' flexDirection='column' marginTop={4}>
                        <Box display='flex' alignItems='center' sx={{ backgroundColor: '#fff', width: { xs: '80%', md: '70%' }, color: '#ff6701', borderRadius: '30px', py: '0.8rem', px: '1.5rem', display: { xs: 'flex', sm: 'none', md: 'flex' }, mt: { xs: '7rem', md: '0' } }}>
                            <GrLike size={25} style={{ marginRight: '1rem' }} />
                            <Typography variant='body1' sx={{ fontSize: { xs: '14px', md: '20px' } }}>100% Trusted Car Rental Platform</Typography>
                        </Box>
                        <Typography variant='h2' sx={{ fontWeight: '600', color: '#666', mt: { xs: '4rem', sm: '8.5rem', md: '3.5rem' }, letterSpacing: '1.7px', textAlign: { xs: 'center', md: 'left' }, fontSize: { xs: '48px', md: '56px' } }}>FAST AND EASY WAY <br /> TO RENT A CAR</Typography>
                        <Typography variant='body2' sx={{ width: { xs: '100%', md: '80%' }, color: '#666', fontSize: '17px', mt: '3.5rem' }}>Looking for unbeatable car rental deals? You came to the right place! We work with top branded rental cars to help you find the right car for your needs.</Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' }, width: '50rem' }} component='img' src={'/assets/jeep2.png'} />
                </Stack>

                <StyledStack justifyContent='center' alignItems='center' sx={{ color: '#b4b4ca' }}>
                    <Box display='flex' alignItems='center'>
                        <MdOutlinePets size={50} style={{ marginRight: '0.7rem' }} />
                        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>Nexter</Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <GiRedCarpet size={50} style={{ marginRight: '0.7rem' }} />
                        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>Carpen</Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <BiShapeTriangle size={50} style={{ marginRight: '0.7rem' }} />
                        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>Tricon</Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <MdOutlineLocalCarWash size={50} style={{ marginRight: '0.7rem' }} />
                        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>Washer</Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <GiApothecary size={50} style={{ marginRight: '0.7rem' }} />
                        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>Moonze</Typography>
                    </Box>
                </StyledStack>
                <Typography textAlign='center' variant='h4' sx={{ color: '#333', fontWeight: '600', mt: { xs: '5rem', md: '8rem' } }}>How It Works</Typography>
                <Typography textAlign='center' variant='body1' sx={{ mt: '1.3rem', color: '#666' }}>The process of renting a car has never been easier. Take your chance.</Typography>
                <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, mt: { xs: '2rem', md: '3.5rem' } }} spacing={5} alignItems='center' justifyContent='center'>
                    <Box display='flex' flexDirection='column' alignItems='center' marginTop='40px' sx={{ width: '100%' }}>
                        <MdLocationPin size={45} style={{ color: '#ff6701', backgroundColor: '#efedfd', borderRadius: '20px', padding: '20px 25px', display: 'block', margin: 'auto', marginBottom: '1rem' }} />
                        <Typography textAlign='center' variant='h5' sx={{ fontWeight: '500' }}>Choose Location</Typography>
                        <Typography textAlign='center' variant='body1' sx={{ mt: '1rem', color: '#666', width: '60%' }}>Over 50 locations are available in Bosnia and Herzegovina.</Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{ width: '100%' }}>
                        <MdDateRange size={45} style={{ color: '#ff6701', backgroundColor: '#efedfd', borderRadius: '20px', padding: '20px 25px', display: 'block', margin: 'auto', marginBottom: '1rem' }} />
                        <Typography textAlign='center' variant='h5' sx={{ fontWeight: '500' }}>Pick-up Date</Typography>
                        <Typography textAlign='center' variant='body1' sx={{ mt: '1rem', color: '#666', width: '60%' }}>Choose a date that suits you. There are no restrictions.</Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{ width: '100%' }}>
                        <AiFillCar size={45} style={{ color: '#ff6701', backgroundColor: '#efedfd', borderRadius: '20px', padding: '20px 25px', display: 'block', margin: 'auto', marginBottom: '1rem' }} />
                        <Typography textAlign='center' variant='h5' sx={{ fontWeight: '500' }}>Book Your Car</Typography>
                        <Typography textAlign='center' variant='body1' sx={{ mt: '1rem', color: '#666', width: '65%' }}>Book your chosen car by filling out a simple form. </Typography>
                    </Box>
                </Stack>
                <Box sx={{ mt: '5rem', mb: '3rem', mr: '1.5rem' }}>
                    <Typography textAlign='center' variant='h4' sx={{ color: '#333', fontWeight: '600', mt: { xs: '5rem', md: '10rem' }, mb: '4rem' }}>Most Popular Car Rental Deals</Typography>
                    <Box sx={{ maxWidth: '87.5rem', margin: 'auto' }}>
                        <Slider {...settings}>
                            {carsObj && carsObj.cars && carsObj.cars.slice(0, 6).map((car: Car) => (
                                <CarItem key={car._id} car={car} />
                            ))}
                        </Slider>
                    </Box>
                </Box>
                <Box textAlign='center'>
                    <Link to='/vehicles/page/1'>
                        <Button variant='contained' sx={{ textTransform: 'none', p: '0.6rem 1.4rem', color: '#fff', fontWeight: 500 }}>View All Vehicles</Button>
                    </Link>
                </Box>
            </Container >
            <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, mt: { xs: '2.8rem', md: '4rem' }, mb: { xs: '4rem', md: '16rem' } }}>
                <Box sx={{ display: { xs: 'none', md: 'block' }, height: '39rem', position: 'absolute', left: -400, mt: '2.5rem' }} component='img' src={'/assets/orange-car.png'} />
                <Box sx={{ ml: { xs: '0rem', md: '41rem' } }} textAlign={{ xs: 'center', md: 'left' }} marginBottom={{ xs: '4rem', md: '0' }}>
                    <Typography variant='h4' sx={{ color: '#333', fontWeight: '600', mt: { xs: '3rem', md: '5rem' } }}>Why Choose Us?</Typography>
                    <Typography variant='body1' sx={{ mt: '1rem', color: '#666' }}>The answer is simple - we are the best!</Typography>
                    <Box display='flex' alignItems='center' marginTop='2.5rem' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'start' } }} gap={2}>
                            <FiPhoneIncoming size={30} style={{ backgroundColor: '#efedfd', color: '#ff6701', padding: '3px 6px', borderRadius: '10px' }} />
                            <Box>
                                <Typography variant='h6'>Customer Support</Typography>
                                <Typography variant='body1' sx={{ mt: '0.3rem', color: '#666', fontSize: '14px' }}>Support for our customers is always available.</Typography>
                            </Box>
                        </Box>
                        <Box display='flex' gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, ml: { xs: '0rem', md: '3rem' }, alignItems: { xs: 'center', md: 'start' }, mt: { xs: '3.7rem', md: '0rem' } }}>
                            <MdLocationPin size={30} style={{ backgroundColor: '#efedfd', color: '#ff6701', padding: '3px 6px', borderRadius: '10px' }} />
                            <Box>
                                <Typography variant='h6'>Many Locations</Typography>
                                <Typography variant='body1' sx={{ mt: '0.3rem', color: '#666', fontSize: '14px' }}>You can rent our cars in different locations. </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display='flex' alignItems='center' marginTop='3.7rem' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box display='flex' gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'start' } }}>
                            <MdPriceCheck size={30} style={{ backgroundColor: '#efedfd', color: '#ff6701', padding: '3px 6px', borderRadius: '10px' }} />
                            <Box>
                                <Typography variant='h6'>Best Prices</Typography>
                                <Typography variant='body1' sx={{ mt: '0.3rem', color: '#666', fontSize: '14px' }}>We certainly offer the best price-quality ratio. </Typography>
                            </Box>
                        </Box>
                        <Box display='flex' gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, ml: { xs: '0rem', md: '3.75rem' }, alignItems: { xs: 'center', md: 'start' }, mt: { xs: '3.7rem', md: '0rem' } }}>
                            <BsFillFilePersonFill size={30} style={{ backgroundColor: '#efedfd', color: '#ff6701', padding: '3px 6px', borderRadius: '10px' }} />
                            <Box>
                                <Typography variant='h6'>Experienced Drivers</Typography>
                                <Typography variant='body1' sx={{ mt: '0.3rem', color: '#666', fontSize: '14px' }}>Our customers are mostly experienced drivers. </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display='flex' alignItems='center' marginTop='3.7rem' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box display='flex' gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'start' } }}>
                            <MdVerifiedUser size={30} style={{ backgroundColor: '#efedfd', color: '#ff6701', padding: '3px 6px', borderRadius: '10px' }} />
                            <Box>
                                <Typography variant='h6'>Verified Car Brands</Typography>
                                <Typography variant='body1' sx={{ mt: '0.3rem', color: '#666', fontSize: '14px' }}>We work only with the best and proven brands.</Typography>
                            </Box>
                        </Box>
                        <Box display='flex' gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, ml: { xs: '0rem', md: '3.3rem' }, alignItems: { xs: 'center', md: 'start' }, mt: { xs: '3.7rem', md: '0rem' } }}>
                            <AiTwotoneCar size={30} style={{ backgroundColor: '#efedfd', color: '#ff6701', padding: '3px 6px', borderRadius: '10px' }} />
                            <Box>
                                <Typography variant='h6'>Free Cancellation</Typography>
                                <Typography variant='body1' sx={{ mt: '0.3rem', color: '#666', fontSize: '14px' }}>You can cancel our services whenever you want.</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Stack>
            <Footer />
        </>
    )
}

export default Home
