import { IProps } from './CarItem';

import { Box, Typography, Stack } from "@mui/material";

import { BsFillPeopleFill } from 'react-icons/bs';
import { SiCoronaengine } from 'react-icons/si';
import { MdDateRange } from 'react-icons/md';
import { GiTrefoilShuriken } from 'react-icons/gi';

const RentACarItem = ({ car }: IProps) => {
    return (
        <>
            <Typography sx={{ fontSize: '26px', color: '#666', fontWeight: 600, mb: '1.2rem', mt: { sm: '9rem', md: '0' }, textAlign: { xs: 'center', sm: 'left' } }}>Car Details</Typography>
            <Box display='flex' flexDirection='column' sx={{ pb: '4.2rem', mb: '3rem', m: 'auto', width: { xs: '17.5rem', md: '22.5rem' }, maxHeight: { xs: '25rem', md: '25.5rem' }, backgroundColor: '#fff', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <Box component='img' src={car.imageUrl[0]} sx={{ borderRadius: '10px' }} />
                <Typography variant='h6' sx={{ fontWeight: '600', fontSize: '24px', color: '#666', pl: '1rem', pt: '0.7rem' }}>{car.brand} {car.model}</Typography>
                <Box sx={{ pl: '1rem', pr: '3rem', pt: '1rem' }}>
                    <Box display='flex' justifyContent='space-between' flexDirection={{ xs: 'column', md: 'row' }}>
                        <Stack direction='row' spacing={1}>
                            <BsFillPeopleFill size={20} color='#666' />
                            <Typography sx={{ fontSize: '14px', color: '#777' }}>{car.numberOfSeats} People</Typography>
                        </Stack>
                        <Stack direction='row' spacing={1} marginTop={{ xs: '0.6rem', md: '0' }}>
                            <SiCoronaengine size={20} color='#666' />
                            <Typography sx={{ fontSize: '14px', color: '#777' }}>{car.transmission}</Typography>
                        </Stack>
                    </Box>
                    <Box display='flex' justifyContent='space-between' marginTop={1.8} flexDirection={{ xs: 'column', md: 'row' }}>
                        <Stack direction='row' spacing={1} marginTop={{ xs: '0.6rem', md: '0' }}>
                            <MdDateRange size={20} color='#666' />
                            <Typography sx={{ fontSize: '14px', color: '#777' }}>{car.manufacturingYear}</Typography>
                        </Stack>
                        <Stack direction='row' spacing={1} marginRight={`${car.transmission === 'Manual' ? '0.6rem' : '1.7rem'}`} marginTop={{ xs: '0.6rem', md: '0' }}>
                            <GiTrefoilShuriken size={20} color='#666' />
                            <Typography sx={{ fontSize: '14px', color: '#777' }}>{car.fuelType}</Typography>
                        </Stack>
                    </Box>
                </Box>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ pl: '1rem', pr: '1.2rem', pt: '1.7rem' }}>
                    <Typography sx={{ fontSize: '28px', color: '#444', fontWeight: '500' }}>{car.price}KM<Typography sx={{ fontSize: '20px', color: '#555' }} component='span'>/d</Typography></Typography>
                </Stack>
            </Box>
        </>
    )
}

export default RentACarItem;
