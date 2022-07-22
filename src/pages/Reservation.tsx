import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import RentACarItem from "../components/RentACarItem";

import { Container, Typography, TextField, FormControl, Select, MenuItem, InputLabel, Box, Button, FormGroup } from "@mui/material";
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import moment from "moment";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { getCarById } from "../redux/car/actions/actionCreators";
import { createReservation } from "../redux/reservation/actions/actionCreators";
import { resetReservation } from "../redux/reservation/actions/actionCreators";
import Sidebar from "../components/Sidebar";

export interface FormReservationValues {
    name?: string,
    email?: string,
    carModel?: string,
    location: string,
    pickUpDate: Date | string,
    returnDate: Date | string,
    carId?: string
}

const Reservation = () => {
    const { carId } = useParams();
    const dispatch = useDispatch();
    const { car, isLoadingCar } = useSelector((state: RootState) => state.car);
    const { isSuccessRes, isLoadingRes } = useSelector((state: RootState) => state.reservation);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            location: '',
            pickUpDate: '',
            returnDate: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Enter a valid email address').required('Required'),
            location: Yup.string().required('Required'),
            pickUpDate: Yup.date()
                .min(new Date(), "Past date not allowed")
                .required("Required")
                .typeError("Invalid date"),
            returnDate: Yup.date()
                .min(new Date(), "Past date not allowed")
                .required("Required")
                .typeError("Invalid date")
        }),
        onSubmit: (values: FormReservationValues, actions) => {
            const price = moment(formik.values.returnDate).diff(formik.values.pickUpDate, 'days') * car.price;
            const carModel = car.brand + ' ' + car.model;
            const { location, pickUpDate, returnDate } = values;

            const emailValues = {
                carModel,
                name: values.name,
                email: values.email,
                location: values.location,
                pickUpDate: values.pickUpDate,
                returnDate: values.returnDate,
                totalPrice: price
            }

            const reservationData = {
                carModel,
                location,
                pickUpDate,
                returnDate,
                carId: car._id
            }

            dispatch(createReservation(reservationData) as any);

            actions.resetForm();
            emailjs.send(process.env.REACT_APP_EMAIL_SERVICEID as string, process.env.REACT_APP_EMAIL_TEMPLATEID as string, emailValues as unknown as Record<string, unknown>, process.env.REACT_APP_EMAIL_KEY as string)
                .then((result) => { console.log(result.text); },
                    (error) => { console.log(error.text); });
        }
    })

    useEffect(() => {
        dispatch(getCarById(carId as string) as any);

        dispatch(resetReservation() as any);
    }, [dispatch, carId])

    if (isLoadingCar) {
        return <Spinner />
    }

    return (
        <>
            <Box display={{ xs: 'none', md: 'block' }} sx={{ mb: '4rem' }}>
                <Navbar />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </Box>
            <Container maxWidth='xl' sx={{ mb: '7rem' }}>
                <Box display='flex' sx={{ flexDirection: { xs: 'column', sm: 'row' } }} justifyContent='space-between'>
                    <Box flexBasis='50%'>
                        <form onSubmit={formik.handleSubmit}>
                            <Typography sx={{ fontSize: { xs: '34px', md: '44px' }, fontWeight: 600, color: '#666', mt: { xs: '8.5rem', md: '0' } }}>Car Rental Details</Typography>
                            {isSuccessRes && !isLoadingRes &&
                                <Typography id='hideMe' align='center' sx={{ color: '#fff', backgroundColor: '#666', mt: '1.5rem', py: '0.6rem', fontWeight: '600', borderRadius: '4px', fontSize: { xs: '14.5px', sm: '16px' } }}>
                                    Reservation successfully created. Check your email for more details.
                                </Typography>
                            }
                            <TextField
                                fullWidth
                                name='carModel'
                                sx={{ mt: '4rem', mb: '2.1rem' }}
                                defaultValue={car.brand + ' ' + car.model}
                                disabled
                                label='Car model'
                            />
                            <TextField
                                fullWidth
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{ mb: '2.1rem' }}
                                label='Full Name'
                            />
                            <TextField
                                fullWidth
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{ mb: '2.1rem' }}
                                label='Email Address'
                            />
                            <FormControl fullWidth>
                                <InputLabel id="location-label">Location</InputLabel>
                                <Select
                                    defaultValue=''
                                    name='location'
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    labelId="location-label"
                                    label="Location"
                                    sx={{ mb: '2.1rem' }}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                >
                                    <MenuItem value={"Zenica"}>Zenica</MenuItem>
                                    <MenuItem value={"Sarajevo"}>Sarajevo</MenuItem>
                                    <MenuItem value={"Tuzla"}>Tuzla</MenuItem>
                                    <MenuItem value={"Banja Luka"}>Banja Luka</MenuItem>
                                    <MenuItem value={"Mostar"}>Mostar</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                name='pickUpDate'
                                value={formik.values.pickUpDate}
                                onChange={formik.handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: '2.1rem' }}
                                type='datetime-local'
                                error={formik.touched.pickUpDate && Boolean(formik.errors.pickUpDate)}
                                helperText={formik.touched.pickUpDate && formik.errors.pickUpDate}
                                label='Pick-up date'
                            />
                            <TextField
                                fullWidth
                                name='returnDate'
                                value={formik.values.returnDate}
                                onChange={formik.handleChange}
                                InputLabelProps={{ shrink: true }}
                                type='datetime-local'
                                error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
                                helperText={formik.touched.returnDate && formik.errors.returnDate}
                                label='Return date'
                            />
                            <Typography variant='body1' sx={{ mt: '2.5rem', mb: '1.5rem', fontWeight: '600', fontSize: '22px', color: '#444' }}>
                                Total Price:
                            </Typography>
                            <FormGroup row>
                                <TextField
                                    variant='outlined'
                                    name="price"
                                    inputProps={{ style: { fontSize: 22 } }}
                                    disabled
                                    size="small"
                                    value={isNaN(moment(formik.values.returnDate).diff(formik.values.pickUpDate, 'days') * car.price) ? 0 : moment(formik.values.returnDate).diff(formik.values.pickUpDate, 'days') * car.price}
                                />
                                <Box sx={{ border: '1px solid #999', position: 'relative', width: '3.5rem', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
                                    <Typography variant='body2' sx={{ position: 'absolute', top: 14, left: 16, fontWeight: 'bold' }}>KM</Typography>
                                </Box>
                            </FormGroup>
                            <Button type='submit' variant='contained' sx={{ color: '#fff', fontWeight: 600, px: '4rem', py: '0.7rem', fontSize: '16px', display: 'block', m: { xs: '3rem 0', md: '4.5rem 0' } }}>
                                Submit
                            </Button>
                        </form>
                    </Box>
                    <Box>
                        <RentACarItem car={car} />
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default Reservation;
