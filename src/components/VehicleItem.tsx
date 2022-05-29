import { Box, Stack, Typography, Grid } from "@mui/material";

import { BsFillPeopleFill } from 'react-icons/bs';
import { GiTrefoilLily } from 'react-icons/gi';

import { Link } from 'react-router-dom';

import { IProps } from './CarItem';

const VehicleItem = ({ car }: IProps) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={4} sx={{ transition: 'all 0.4s', "&:hover": { transform: 'scale(1.05)' } }}>
            <Box sx={{ "&:hover": { backgroundColor: 'rgb(250, 250, 250)' }, backgroundColor: '#fff', py: '1.5rem', px: '1rem', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px' }}>
                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>{car.brand} {car.model}</Typography>
                <Typography sx={{ color: '#666', letterSpacing: '1px', mt: '0.2rem', mb: '1.5rem' }}>{car.category.category}</Typography>
                <Link to={`/vehicle/${car._id}`}>
                    <Box component='img' src={car.imageUrl[0]} sx={{ width: '100%', height: '12.3rem', borderRadius: '5px' }} />
                </Link>
                <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mt: '2rem' }}>
                    <Stack direction='row' spacing={1}>
                        <BsFillPeopleFill size={20} color='#ff6701' />
                        <Typography sx={{ color: '#444' }}>{car.numberOfSeats}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} marginRight={4}>
                        <GiTrefoilLily size={20} color='#ff6701' />
                        <Typography sx={{ color: '#444' }}>{car.transmission}</Typography>
                    </Stack>
                    <Typography sx={{ fontWeight: 500, fontSize: '20px' }}>{car.price}KM<Typography component='span'>/d</Typography></Typography>
                </Box>
            </Box>
        </Grid >
    )
}

export default VehicleItem;
