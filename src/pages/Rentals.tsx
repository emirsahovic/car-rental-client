import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getReservations, deleteReservation } from '../redux/reservation/actions/actionCreators';
import { RootState } from "../redux/store";

import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaginationRentals from '../components/PaginationRentals';

import Moment from 'react-moment';
import Sidebar from '../components/Sidebar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ed6c02',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Rentals = () => {
    const dispatch = useDispatch();
    const { reservations, isLoadingRes } = useSelector((state: RootState) => state.reservation);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rentalsPerPage] = useState<number>(10);

    const indexOfLastRental = currentPage * rentalsPerPage;
    const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
    const currentRentals = reservations.slice(indexOfFirstRental, indexOfLastRental);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getReservations() as any);
    }, [dispatch])

    if (isLoadingRes) {
        return <Spinner />
    }

    return (
        <>
            <Box display={{ xs: 'none', md: 'block' }} sx={{ mb: { xs: '3.5rem', md: '4rem' } }}>
                <Navbar />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </Box>
            <Container maxWidth='xl'>
                {reservations && reservations.length > 0 ?
                    <>
                        <TableContainer component={Paper} sx={{ mb: { xs: '4rem', md: `${reservations.length > 0 && reservations.length < 6 ? '18rem' : '4rem'}` } }}>
                            <Table sx={{ minWidth: 700, mt: { xs: '8rem', md: '0' } }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell sx={{ fontSize: '18px' }}>Car Model</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ fontSize: '18px' }}>Location</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ fontSize: '18px' }}>Pick-up date</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ fontSize: '18px' }}>Return date</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ pr: '2.6rem', fontSize: '18px' }}>Cancel</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservations && currentRentals.map((res) => (
                                        <StyledTableRow key={res._id}>
                                            <StyledTableCell sx={{ width: '28%', fontWeight: 500 }}>{res.carModel}</StyledTableCell>
                                            <StyledTableCell align="center">{res.location}</StyledTableCell>
                                            <StyledTableCell align="center"><Moment format="DD/MM/YYYY hh:mm">{res.pickUpDate.toString()}</Moment></StyledTableCell>
                                            <StyledTableCell align="center"><Moment format="DD/MM/YYYY hh:mm">{res.returnDate.toString()}</Moment></StyledTableCell>
                                            <StyledTableCell align="center">
                                                <AiOutlineCloseCircle color='#ff3333' className='btn-opacity' onClick={() => dispatch(deleteReservation(res._id) as any)} size={25} style={{ paddingRight: '1.8rem', cursor: 'pointer' }} />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <PaginationRentals
                            rentalsPerPage={rentalsPerPage}
                            totalRentals={reservations.length}
                            paginate={paginate}
                        />
                    </>
                    :
                    <>
                        <Typography textAlign='center' sx={{ fontSize: '21px', mt: '12rem' }}>
                            You currently have no created reservations for car rental. Take a look at our offer and find the vehicle that suits you best.
                        </Typography>
                        <Box textAlign='center' marginTop={4}>
                            <Link to='/vehicles/page/1'>
                                <Button variant='contained' sx={{ textTransform: 'none', p: '0.6rem 1.4rem', color: '#fff', fontWeight: 500 }}>View All Vehicles</Button>
                            </Link>
                        </Box>
                    </>
                }
            </Container>
            {reservations && reservations.length > 0 && <Footer />}
        </>

    )
}

export default Rentals;
