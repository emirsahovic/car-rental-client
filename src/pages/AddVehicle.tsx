import { Container, Typography, Box, TextField, FormControlLabel, Button, Select, MenuItem, FormControl, FormGroup, InputLabel, Stack } from '@mui/material';
import * as Yup from 'yup';

import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { getCategories } from '../redux/category/actions/actionCreators';
import { createCar, reset } from '../redux/car/actions/actionCreators';
import { Category } from '../redux/category/reducers/categoryReducer';
import Sidebar from '../components/Sidebar';

export interface CarFormValues {
    brand: string,
    model: string,
    category: string,
    color: string,
    manufacturingYear: string | number,
    fuelType: string,
    price: string | number,
    services: string[],
    numberOfSeats: string | number,
    transmission: string,
    imageUrl: string[]
}

const AddVehicle = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const [image1, setImage1] = useState<string>('');
    const [image2, setImage2] = useState<string>('');
    const [image3, setImage3] = useState<string>('');

    const userLs = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoadingCar, isSuccessCar } = useSelector((state: RootState) => state.car);
    const { isLoadingCat, categories } = useSelector((state: RootState) => state.category);

    const formik = useFormik({
        initialValues: {
            brand: '',
            model: '',
            category: '',
            color: '',
            manufacturingYear: '',
            fuelType: '',
            price: '',
            services: [],
            numberOfSeats: '',
            transmission: '',
            imageUrl: [],
        },
        validationSchema: Yup.object({
            brand: Yup.string().required('Required'),
            model: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
            color: Yup.string().required('Required'),
            manufacturingYear: Yup.string().matches(/^[0-9]+$/, "Only numbers are allowed").required('Required'),
            fuelType: Yup.string().required('Required'),
            price: Yup.number()
                .typeError('You must specify a number')
                .min(1, 'Minimum price is 1')
                .required('Required'),
            numberOfSeats: Yup.number()
                .typeError('You must specify a number')
                .min(1, 'Minimum value is 1')
                .max(10, 'Maximum value is 10').required('Required'),
            transmission: Yup.string().required('Required'),
        }),
        onSubmit: (values: CarFormValues, { resetForm }) => {
            if (image1 !== '') values.imageUrl.push(image1);
            if (image2 !== '') values.imageUrl.push(image2);
            if (image3 !== '') values.imageUrl.push(image3);
            const { brand, model, category, color, manufacturingYear, fuelType, price, services, numberOfSeats, transmission, imageUrl } = values;
            const carData = {
                brand,
                model,
                category,
                color,
                manufacturingYear: parseInt(manufacturingYear.toString(), 10),
                fuelType,
                price: parseInt(price.toString(), 10),
                services,
                numberOfSeats: parseInt(numberOfSeats.toString(), 10),
                transmission,
                imageUrl
            }

            dispatch(createCar(carData) as any);
            resetForm();
        }
    })

    useEffect(() => {
        dispatch(getCategories() as any);

        dispatch(reset() as any);
    }, [dispatch])

    useEffect(() => {
        if (userLs?.email !== 'admin') {
            setIsAdmin(false);
        }
    }, [userLs])

    if (!isAdmin) {
        return <Navigate to='/' />
    }

    if (isLoadingCar || isLoadingCat) {
        return <Spinner />
    }

    if (isSuccessCar) {
        navigate('/');
    }

    return (
        <>
            <Box display={{ xs: 'none', md: 'block' }} sx={{ mb: '4.5rem' }}>
                <Navbar />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </Box>
            <Container maxWidth='xl'>
                <Stack direction='row' justifyContent='space-between'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box display='flex' flexDirection='column' sx={{ mt: { xs: '8.5rem', md: '0' } }}>
                            <Typography sx={{ fontSize: { xs: '35px', sm: '42px', md: '46px' }, mb: '2rem' }}>
                                Car Registration
                            </Typography>
                            <TextField
                                sx={{ mt: '1.5rem', mb: '0.8rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                type='text'
                                name='brand'
                                value={formik.values.brand}
                                onChange={formik.handleChange}
                                label='Brand'
                                error={formik.touched.brand && Boolean(formik.errors.brand)}
                                helperText={formik.touched.brand && formik.errors.brand}
                            />
                            <TextField sx={{ mt: '1.2rem', mb: '2rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                type='text'
                                name='model'
                                value={formik.values.model}
                                onChange={formik.handleChange}
                                label='Model'
                                error={formik.touched.model && Boolean(formik.errors.model)}
                                helperText={formik.touched.model && formik.errors.model}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    label="Category"
                                    sx={{ mb: '0.8rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                >
                                    {categories && categories.map((c: Category) => (
                                        <MenuItem key={c._id} value={c._id}>{c.category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField sx={{ mt: '1.2rem', mb: '0.8rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                type='text'
                                name='color'
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                label='Color'
                                error={formik.touched.color && Boolean(formik.errors.color)}
                                helperText={formik.touched.color && formik.errors.color}
                            />
                            <TextField sx={{ mt: '1.2rem', mb: '2rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                type='text'
                                name='manufacturingYear'
                                value={formik.values.manufacturingYear}
                                onChange={formik.handleChange}
                                label='Manufacturing Year'
                                error={formik.touched.manufacturingYear && Boolean(formik.errors.manufacturingYear)}
                                helperText={formik.touched.manufacturingYear && formik.errors.manufacturingYear}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="fuel-label">Fuel Type</InputLabel>
                                <Select
                                    labelId="fuel-label"
                                    name="fuelType"
                                    value={formik.values.fuelType}
                                    onChange={formik.handleChange}
                                    label="Fuel Type"
                                    sx={{ mb: '0.8rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                    error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}
                                >
                                    <MenuItem value={"Diesel"}>Diesel</MenuItem>
                                    <MenuItem value={"Petrol"}>Petrol</MenuItem>
                                </Select>
                            </FormControl>
                            <FormGroup row>
                                <TextField sx={{ mt: '1.2rem', mb: '0.8rem', width: { xs: '100%', sm: '80%', md: '68.8%' } }}
                                    type='text'
                                    name='price'
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    label='Price per day'
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                                <Box sx={{ position: 'relative', width: '3rem', height: '3.4rem', border: '1px solid #999', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', mt: '1.2rem', display: { xs: 'none', md: 'block' } }}>
                                    <Typography sx={{ position: 'absolute', top: 15, left: 12, fontWeight: '600' }}>
                                        KM
                                    </Typography>
                                </Box>
                            </FormGroup>
                            <TextField sx={{ mt: '1.2rem', mb: '2rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                type='text'
                                name='numberOfSeats'
                                value={formik.values.numberOfSeats}
                                onChange={formik.handleChange}
                                label='Number Of Seats'
                                error={formik.touched.numberOfSeats && Boolean(formik.errors.numberOfSeats)}
                                helperText={formik.touched.numberOfSeats && formik.errors.numberOfSeats}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="room-label">Transmission</InputLabel>
                                <Select
                                    labelId="room-label"
                                    name="transmission"
                                    value={formik.values.transmission}
                                    onChange={formik.handleChange}
                                    label="Transmission"
                                    sx={{ mb: '0.8rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                    error={formik.touched.transmission && Boolean(formik.errors.transmission)}
                                >
                                    <MenuItem value={"Automatic"}>Automatic</MenuItem>
                                    <MenuItem value={"Manual"}>Manual</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography sx={{ fontSize: { xs: '20px', sm: '24px' }, fontWeight: 'bold', mt: '2.5rem' }}>
                            Services and accessories
                        </Typography>
                        <Box display='flex' flexDirection={{ xs: 'column', sm: 'row' }} flexWrap={{ xs: 'nowrap', sm: 'wrap' }} alignItems='center' marginTop='1.5rem'>
                            <Box marginRight={10}>
                                <FormControlLabel sx={{ ml: { xs: '-3px', md: '-3px' } }}
                                    control={
                                        <input
                                            id='cb'
                                            className='largerCheckbox'
                                            style={{ margin: '0 1rem 0 1rem' }}
                                            name="services"
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                            value="Safety Monitor"
                                        />}
                                    label='Safety Monitor'
                                />
                                <FormControlLabel
                                    control={
                                        <input
                                            id='cb'
                                            className='largerCheckbox margin-input-service1'
                                            name="services"
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                            value="Radar Detector"
                                        />}
                                    label='Radar Detector'
                                />
                                <FormControlLabel
                                    control={
                                        <input
                                            id='cb'
                                            className='largerCheckbox margin-input-service2'
                                            name="services"
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                            value="Moonroof Visor"
                                        />}
                                    label='Moonroof Visor'
                                />
                            </Box>
                            <Box marginTop={{ xs: 0, sm: 1 }} marginRight={{ xs: 9, sm: 0 }}>
                                <FormControlLabel
                                    control={
                                        <input
                                            id='cb'
                                            className='largerCheckbox'
                                            style={{ margin: '0 1rem 0 1.5rem' }}
                                            name="services"
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                            value="Air Purifier"
                                        />}
                                    label='Air Purifier'
                                />
                                <FormControlLabel
                                    sx={{ ml: { xs: '-2.95rem', sm: '-0.7rem' } }}
                                    control={
                                        <input
                                            id='cb'
                                            className='largerCheckbox margin'
                                            style={{ margin: '0 1rem 0 3.78rem' }}
                                            name="services"
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                            value="Threshold Protection"
                                        />}
                                    label='Threshold Protection'
                                />
                                <FormControlLabel
                                    sx={{ ml: { xs: '-0.25rem', sm: '-0.68rem' } }}
                                    control={
                                        <input
                                            id='cb'
                                            className='largerCheckbox margin'
                                            style={{ margin: '0 1rem 0 1.05rem' }}
                                            name="services"
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                            value="Cargo Net"
                                        />}
                                    label='Cargo Net'
                                />
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <TextField sx={{ mt: '4rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                name='image1'
                                value={image1}
                                onChange={e => setImage1(e.target.value)}
                                label='Image 1 Url'
                                required
                            />
                            <TextField sx={{ mt: '1.5rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                name='image2'
                                value={image2}
                                onChange={e => setImage2(e.target.value)}
                                label='Image 2 Url'
                                required
                            />
                            <TextField sx={{ mt: '1.5rem', width: { xs: '100%', sm: '80%', md: '75%' } }}
                                name='image3'
                                value={image3}
                                onChange={e => setImage3(e.target.value)}
                                label='Image 3 Url'
                                required
                            />
                        </Box>
                        <Box textAlign={{ xs: 'center', md: 'left' }} marginBottom={{ xs: '5rem', md: '8rem' }} marginTop={{ xs: '4rem', md: '6rem' }}>
                            <Button type='submit' variant='contained' sx={{ color: '#fff', textTransform: 'none', p: '0.5rem 1.5rem', fontWeight: '600', fontSize: '18px' }}>Add Vehicle</Button>
                        </Box>
                    </form>
                    <Box component='img' sx={{ mt: '10rem', width: '38rem', height: '25.5rem', display: { xs: 'none', md: 'block' } }} src={'/assets/add-vehicle.png'}></Box>
                </Stack>
            </Container>
            <Footer />
        </>
    )
}

export default AddVehicle;
