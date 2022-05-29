import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container, Box } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { User } from '../redux/auth/reducers/authReducer';
import { getUsers, deleteUser } from '../redux/auth/actions/actionCreators';
import { RootState } from "../redux/store";

import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaginationUsers from '../components/PaginationUsers';
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

const Users = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const dispatch = useDispatch();
    const { users, isLoadingUsers } = useSelector((state: RootState) => state.auth);

    const userLs = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!);

    const usersArr = users.filter((user: User) => user.email !== 'admin');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage] = useState<number>(10);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersArr.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getUsers() as any);
    }, [dispatch])

    useEffect(() => {
        if (userLs?.email !== 'admin') {
            setIsAdmin(false);
        }
    }, [userLs])

    if (!isAdmin) {
        return <Navigate to='/' />
    }

    if (isLoadingUsers) {
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
            <Container maxWidth='xl'>
                {usersArr && usersArr.length > 0 &&
                    <>
                        <TableContainer component={Paper} sx={{ mb: { xs: '4rem', md: `${usersArr.length > 0 && usersArr.length < 6 ? '18rem' : '4rem'}` } }}>
                            <Table sx={{ minWidth: 700, mt: { xs: '8rem', md: '0' } }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell sx={{ fontSize: '18px' }}>Email</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ fontSize: '18px' }}>First Name</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ fontSize: '18px' }}>Last Name</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ fontSize: '18px' }}>Phone Number</StyledTableCell>
                                        <StyledTableCell align="right" sx={{ pr: '2rem', fontSize: '18px' }}>Delete</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersArr && currentUsers.map((user: User) => (
                                        <StyledTableRow key={user._id}>
                                            <StyledTableCell sx={{ width: '20%' }}>{user.email}</StyledTableCell>
                                            <StyledTableCell align="center">{user.firstName}</StyledTableCell>
                                            <StyledTableCell align="center">{user.lastName}</StyledTableCell>
                                            <StyledTableCell align="center">{user.phoneNumber}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <AiOutlineCloseCircle color='#ff3333' className='btn-opacity' onClick={() => dispatch(deleteUser(user._id) as any)} size={25} style={{ paddingRight: '1.8rem', cursor: 'pointer' }} />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <PaginationUsers
                            usersPerPage={usersPerPage}
                            totalUsers={usersArr.length}
                            paginate={paginate}
                        />
                    </>
                }
            </Container>
            {usersArr && usersArr.length > 0 && <Footer />}
        </>
    )
}

export default Users;
