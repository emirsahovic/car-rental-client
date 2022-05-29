import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Box className="bg-purple" sx={{ height: '100vh' }}>
            <Box className="stars">
                <Box className="central-body">
                    <img className="image-404" src={'/assets/404.png'} width="310px" alt='404' />
                    <Link to='/' className="btn-go-home">BACK TO HOME</Link>
                </Box>
                <Box className="objects">
                    <img className="object_rocket" src={'/assets/rocket.png'} width="80px" alt='Rocket' />
                    <Box className="earth-moon">
                        <img className="object_earth" src={'/assets/earth.png'} width="100px" alt='Earth' />
                        <img className="object_moon" src={'/assets/moon.png'} width="80px" alt='Moon' />
                    </Box>
                    <Box className="box_astronaut">
                        <img className="object_astronaut" src={'/assets/astronaut.png'} width="180px" alt='Astronaut' />
                    </Box>
                </Box>
                <Box className="glowing_stars">
                    <Box className="star"></Box>
                    <Box className="star"></Box>
                    <Box className="star"></Box>
                    <Box className="star"></Box>
                    <Box className="star"></Box>
                </Box>
            </Box>
        </Box>
    )
}

export default NotFound;
