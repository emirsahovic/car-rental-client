import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { Container, Stack, Box, Typography, Button } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { getCarById } from "../redux/car/actions/actionCreators";
import Sidebar from "../components/Sidebar";

const SingleCar = () => {
    const [activePhoto, setActivePhoto] = useState(0);
    const { carId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { car, isLoadingCar } = useSelector((state: RootState) => state.car);

    const userLs = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!);

    useEffect(() => {
        dispatch(getCarById(carId as string) as any);
    }, [dispatch, carId])

    if (isLoadingCar) {
        return <Spinner />
    }

    return (
        <>
            <Box display={{ xs: 'none', md: 'block' }} sx={{ mb: '4.5rem' }}>
                <Navbar />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </Box>
            <Container maxWidth='xl' sx={{ mb: { xs: '7rem', md: '9rem' } }}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between'>
                    <Box display='flex' flexDirection='column' flexBasis='100%'>
                        <Typography variant='h3' sx={{ fontSize: { xs: '34px', md: '48px' }, mt: { xs: '7rem', md: '0' }, fontWeight: 700 }}>{car.brand} {car.model}</Typography>
                        <Typography variant='body1' sx={{ textTransform: 'uppercase', fontSize: '20px', fontWeight: 500, mt: '0.8rem' }}>You're not like everyone else.</Typography>
                        <Typography variant='body1' sx={{ fontSize: '17px', mt: '0.5rem', width: { xs: '100%', md: '22rem' }, fontWeight: 200 }}>A masterful combination of power, comfort, style and your satisfaction. Don't miss this chance!</Typography>
                        <Typography variant='h4' sx={{ mt: '3.5rem', fontSize: '40px', fontWeight: 700, color: '#ff6701' }}>{car.price}KM<Typography component='span' sx={{ fontSize: '26px', color: '#000' }}>/d</Typography></Typography>
                    </Box>
                    <Box component='img' sx={{ width: { xs: '18rem', md: '40rem' }, display: 'block', margin: 'auto', height: '24.5rem', borderRadius: '10px', mt: { xs: '3.5rem', md: '0' } }} src={car.imageUrl[activePhoto]} flexBasis='100%' />
                    <Box display='flex' flexDirection='column'>
                        {car.imageUrl.map((image, i) => (
                            <Box key={i}
                                component='img'
                                sx={{ width: '20rem', height: '12rem', display: 'block', margin: 'auto', marginLeft: { xs: 'auto', md: '7rem' }, marginBottom: '0.7rem', mt: { xs: '1.5rem', md: '0' } }}
                                onClick={() => setActivePhoto(i)}
                                src={image}
                                className='btn-opacity'
                            />
                        ))}
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' marginTop={{ xs: '2.5rem', md: '8rem' }} sx={{ mx: { xs: '0', md: '8rem' } }}>
                    <Box display='flex' flexDirection={{ xs: 'row', md: 'column' }} alignItems='center' sx={{ mb: { xs: '0.3rem', md: '0' } }}>
                        <Typography textAlign={{ xs: 'left', md: 'center' }} sx={{ color: '#888', fontSize: '16px' }}>Color</Typography>
                        <Typography sx={{ fontWeight: 400, fontSize: '18px', mt: { xs: '0', md: '0.1rem' }, ml: { xs: '0.7rem', md: '0' } }}>{car.color}</Typography>
                    </Box>
                    <Box display='flex' flexDirection={{ xs: 'row', md: 'column' }} alignItems='center' sx={{ mb: { xs: '0.3rem', md: '0' } }}>
                        <Typography sx={{ color: '#888', fontSize: '16px' }}>Manufacturing Year</Typography>
                        <Typography textAlign='center' sx={{ fontWeight: 400, fontSize: '18px', mt: { xs: '0', md: '0.1rem' }, ml: { xs: '0.7rem', md: '0' } }}>{car.manufacturingYear}</Typography>
                    </Box>
                    <Box display='flex' flexDirection={{ xs: 'row', md: 'column' }} alignItems='center' sx={{ mb: { xs: '0.3rem', md: '0' } }}>
                        <Typography sx={{ color: '#888', fontSize: '16px' }}>Transmission</Typography>
                        <Typography textAlign='center' sx={{ fontWeight: 400, fontSize: '18px', mt: { xs: '0', md: '0.1rem' }, ml: { xs: '0.7rem', md: '0' } }}>{car.transmission}</Typography>
                    </Box>
                    <Box display='flex' flexDirection={{ xs: 'row', md: 'column' }} alignItems='center' sx={{ mb: { xs: '0.3rem', md: '0' } }}>
                        <Typography sx={{ color: '#888', fontSize: '16px' }}>Fuel Type</Typography>
                        <Typography textAlign='center' sx={{ fontWeight: 400, fontSize: '18px', mt: { xs: '0', md: '0.1rem' }, ml: { xs: '0.7rem', md: '0' } }}>{car.fuelType}</Typography>
                    </Box>
                    <Box display='flex' flexDirection={{ xs: 'row', md: 'column' }} alignItems='center' sx={{ mb: { xs: '0.3rem', md: '0' } }}>
                        <Typography sx={{ color: '#888', fontSize: '16px' }}>Number Of Seats</Typography>
                        <Typography textAlign='center' sx={{ fontWeight: 400, fontSize: '18px', mt: { xs: '0', md: '0.1rem' }, ml: { xs: '0.7rem', md: '0' } }}>{car.numberOfSeats}</Typography>
                    </Box >
                </Stack >
                <Box sx={{ mt: '6rem' }} textAlign='center'>
                    <Button
                        onClick={() => navigate(`/rent/${car._id}`)}
                        disabled={userLs ? false : true}
                        color='warning'
                        variant='contained'
                        sx={{ p: '0.6rem 3.5rem', textTransform: 'none', color: '#fff', fontWeight: 500, borderRadius: '5px', fontSize: '17px' }}>
                        Rent now
                    </Button>
                    {!userLs && <Typography sx={{ fontSize: '14px', color: '#ff4d4d', mt: '0.5rem' }}>* You must be logged in to rent a car.</Typography>
                    }
                </Box>
            </Container >
            <Footer />
        </>
    )
}

export default SingleCar;
