import { Container, Grid, Box, Typography } from '@mui/material';

import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Sidebar from '../components/Sidebar';

const AboutUs = () => {
    return (
        <>
            <Box display={{ xs: 'none', md: 'block' }} sx={{ mb: '3.5rem' }}>
                <Navbar />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </Box>
            <Container maxWidth='xl'>
                <Box sx={{ color: '#323642' }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Typography variant='h2' sx={{ mt: { xs: '8.5rem', md: '0' } }}>About us</Typography>
                                <Typography variant='body1' sx={{ mb: { xs: '2.5rem', md: '8rem' }, mt: '2rem', lineHeight: 1.8 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula gravida lectus, in aliquet lorem laoreet eu. Nulla ac tempor turpis, ut pulvinar dui. Maecenas vitae sem at urna volutpat molestie. Aliquam porta justo a erat ultricies efficitur. Nunc mattis volutpat luctus. Nullam maximus orci neque. Nullam convallis nisl nec maximus sagittis. Etiam consectetur consectetur mi at imperdiet. Vestibulum ac lobortis leo. <br /><br />
                                    Sed in enim vitae nisl elementum imperdiet. Praesent efficitur, elit sit amet imperdiet luctus, enim leo porttitor leo, ut mollis leo lectus sed ipsum. Nam nisi tortor, tristique eget quam at, suscipit posuere ante. Nunc a nulla eu ipsum porttitor dictum.
                                    <Typography component='span' sx={{ display: { xs: 'none', md: 'inline' } }}>
                                        {' '}Phasellus rhoncus efficitur eros, vel sodales leo tristique sed. Fusce euismod eros vitae eros porttitor, vitae cursus mauris facilisis. Duis arcu libero, commodo quis rutrum vel, cursus quis odio. Donec nec tincidunt augue. Phasellus tempus eros libero, et ullamcorper enim euismod id. Donec non semper eros. Suspendisse gravida velit ut finibus sagittis. Mauris urna dolor, viverra vitae semper in, laoreet in mauris. Integer pharetra interdum lorem vitae rhoncus. Integer ornare volutpat urna, eget facilisis nulla efficitur et. Vestibulum dolor nibh, sollicitudin nec ornare vitae, malesuada vel leo. <br /><br />
                                        Praesent tristique lacinia arcu pharetra ultrices. Duis sit amet tortor vitae mauris laoreet tristique non sed sapien. Cras sit amet arcu in nulla venenatis cursus. Praesent nisi ligula, imperdiet faucibus congue vel, congue at mauris. Etiam porttitor pulvinar aliquet. Praesent sollicitudin fermentum pharetra. Sed et sapien ut leo auctor fermentum at id orci. Nulla varius placerat augue, at congue metus pretium ac. Pellentesque ut enim ut turpis imperdiet convallis. Donec bibendum vestibulum turpis, eget mollis nulla tincidunt ut. Maecenas ultrices, felis a condimentum tristique, nisl nunc accumsan metus, a molestie odio sapien ut ex. Nam dignissim metus et volutpat placerat. Vestibulum sit amet ultrices purus.
                                    </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ ml: { xs: '0rem', md: '8.5rem' }, mb: { xs: '5rem', sm: '23rem', md: '0rem' } }}>
                                <Typography variant='h2' marginBottom={5} sx={{ mt: { sm: '8.5rem', md: '0' } }}>Our location</Typography>
                                <Box component='img' sx={{ width: '100%' }} src={'/assets/map.png'} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default AboutUs;
