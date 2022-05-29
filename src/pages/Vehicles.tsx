import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import VehicleItem from "../components/VehicleItem";
import PaginationVehicles from "../components/PaginationVehicles";
import Sidebar from "../components/Sidebar";

import { Box, Container, Grid, Stack, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { FiSearch } from 'react-icons/fi';
import { MdMinimize } from 'react-icons/md';

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { getCategories } from "../redux/category/actions/actionCreators";
import { getCars } from "../redux/car/actions/actionCreators";
import { getCarsByFilter } from "../redux/car/actions/actionCreators";
import { Category } from "../redux/category/reducers/categoryReducer";
import { Car } from "../redux/car/reducers/carReducer";

const Vehicles = () => {
    const dispatch = useDispatch();

    const { categories, isLoadingCat } = useSelector((state: RootState) => state.category);
    const { carsObj, isLoadingCar } = useSelector((state: RootState) => state.car);

    const [categoryIds, setCategoryIds] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [fuels, setFuels] = useState<string[]>([]);
    const [text, setText] = useState<string>('');
    const [displayColor, toggleColor] = useState<boolean>(true);
    const [displayCategory, toggleCategory] = useState<boolean>(true);
    const [displayFuel, toggleFuel] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [carsPerPage] = useState<number>(6);

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = carsObj.cars.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getCategories() as any);
    }, [dispatch])

    useEffect(() => {
        dispatch(getCars() as any);
    }, [dispatch])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        resetState();
        setText(e.target.value);

        dispatch(getCarsByFilter({ type: 'text', query: e.target.value }) as any);
    }

    const resetState = (): void => {
        setText('');
        setCategoryIds([]);
        setColors([]);
        setFuels([]);
    }

    const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentCategoryChecked = e.target.value;
        const allCategoriesChecked = [...categoryIds];
        const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

        let updatedCategoryIds;
        if (indexFound === -1) {
            updatedCategoryIds = [...categoryIds, currentCategoryChecked];
            setCategoryIds(updatedCategoryIds);
        } else {
            updatedCategoryIds = [...categoryIds];
            updatedCategoryIds.splice(indexFound, 1);
            setCategoryIds(updatedCategoryIds);
        }

        dispatch(getCarsByFilter({ type: 'category', query: updatedCategoryIds }) as any);
        setColors([]);
        setFuels([]);
    }

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentColorChecked = e.target.value;
        const allColorsChecked = [...colors];
        const indexFound = allColorsChecked.indexOf(currentColorChecked);

        let updatedColors;
        if (indexFound === -1) {
            updatedColors = [...colors, currentColorChecked];
            setColors(updatedColors);
        } else {
            updatedColors = [...colors];
            updatedColors.splice(indexFound, 1);
            setColors(updatedColors);
        }

        dispatch(getCarsByFilter({ type: 'color', query: updatedColors }) as any);
        setCategoryIds([]);
        setFuels([]);
    }

    const handleFuel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentFuelChecked = e.target.value;
        const allFuelsChecked = [...fuels];
        const indexFound = allFuelsChecked.indexOf(currentFuelChecked);

        let updatedFuels;
        if (indexFound === -1) {
            updatedFuels = [...fuels, currentFuelChecked];
            setFuels(updatedFuels);
        } else {
            updatedFuels = [...fuels];
            updatedFuels.splice(indexFound, 1);
            setFuels(updatedFuels);
        }

        dispatch(getCarsByFilter({ type: 'fuelType', query: updatedFuels }) as any);
        setCategoryIds([]);
        setColors([]);
    }

    if (isLoadingCat || isLoadingCar) {
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
            <Container maxWidth='xl' sx={{ mb: '7rem' }}>
                <Stack direction={{ xs: 'column', md: 'row', }} justifyContent='space-between' spacing={{ md: 3 }} marginBottom={10}>
                    <Box marginTop={4}>
                        <Box textAlign='center'>
                            <TextField
                                name='text'
                                size='small'
                                value={text}
                                label='Search...'
                                onChange={handleSearch}
                                variant="outlined"
                                sx={{ width: { xs: '100%', sm: '50%', md: '100%' }, mt: { xs: '6.5rem', md: '0' } }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton>
                                                <FiSearch style={{ cursor: 'default' }} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box sx={{ backgroundColor: 'rgb(250, 250, 250)', mt: '2.4rem', display: 'block', mx: 'auto', width: { xs: '70%', sm: '45%', md: '20rem' }, height: (displayCategory && displayColor && displayFuel) ? '47rem' : (!displayCategory && !displayColor && !displayFuel) ? '15rem' : (displayFuel && !displayCategory && !displayColor) ? '20rem' : (displayFuel && displayColor && !displayCategory) ? '32.5rem' : (displayCategory && displayColor && !displayFuel) ? '41.5rem' : (displayCategory && displayFuel && !displayColor) ? '34.5rem' : '28.5rem', p: '0rem 1.7rem', borderRadius: '7px', border: '1px solid #B7B5B566', boxShadow: '0px 6px 18px -15px #111', }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '20px', my: '2rem' }}>Filter By</Typography>
                            <Box sx={{ mt: '1.5rem', mb: displayCategory ? '1rem' : '0rem' }} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography sx={{ fontWeight: 500, fontSize: '17px', color: '#444' }}>Car Type</Typography>
                                <MdMinimize className='btn-opacity' onClick={() => toggleCategory(!displayCategory)} size={25} style={{ paddingBottom: '17px' }} />
                            </Box>
                            {displayCategory &&
                                <>
                                    {categories && categories.map((c: Category) => (
                                        <Box key={c._id} marginTop={1.5} className='checkboxPadding'>
                                            <input
                                                className="largerCheckbox"
                                                value={c._id}
                                                onChange={handleCategory}
                                                checked={categoryIds.includes(c._id)}
                                                type='checkbox'
                                                id='check'
                                                name='category' />
                                            <label htmlFor="check" style={{ color: '#333' }}>{c.category}</label>
                                        </Box>
                                    ))}
                                </>
                            }
                            <Box sx={{ mt: displayCategory ? '1.5rem' : '0rem', mb: ((displayFuel && displayCategory) || (displayColor && displayFuel && !displayCategory) || (displayColor && displayCategory) || (displayColor && !displayCategory && !displayFuel)) ? '1rem' : '0rem' }} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography sx={{ fontWeight: 500, fontSize: '17px', color: '#444' }}>Color</Typography>
                                <MdMinimize className='btn-opacity' onClick={() => toggleColor(!displayColor)} size={25} style={{ paddingBottom: '17px' }} />
                            </Box>
                            {displayColor &&
                                <>
                                    <Box className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="Black"
                                            onChange={handleColor}
                                            checked={colors.includes("Black")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>Black</label>
                                    </Box>
                                    <Box marginTop={1.5} className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="White"
                                            onChange={handleColor}
                                            checked={colors.includes("White")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>White</label>
                                    </Box>
                                    <Box marginTop={1.5} className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="Gray"
                                            onChange={handleColor}
                                            checked={colors.includes("Gray")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>Gray</label>
                                    </Box>
                                    <Box marginTop={1.5} className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="Blue"
                                            onChange={handleColor}
                                            checked={colors.includes("Blue")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>Blue</label>
                                    </Box>
                                    <Box marginTop={1.5} className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="Red"
                                            onChange={handleColor}
                                            checked={colors.includes("Red")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>Red</label>
                                    </Box>
                                    <Box marginTop={1.5} className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="Yellow"
                                            onChange={handleColor}
                                            checked={colors.includes("Yellow")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>Yellow</label>
                                    </Box>
                                </>
                            }
                            <Box sx={{ mt: (displayColor && displayFuel) ? '1.5rem' : (displayColor && !displayFuel) ? '0.9rem' : '0rem', mb: '1rem' }} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography sx={{ fontWeight: 500, fontSize: '17px', color: '#444' }}>Fuel Type</Typography>
                                <MdMinimize className='btn-opacity' onClick={() => toggleFuel(!displayFuel)} size={25} style={{ paddingBottom: '17px' }} />
                            </Box>
                            {displayFuel &&
                                <>
                                    <Box className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="Petrol"
                                            onChange={handleFuel}
                                            checked={fuels.includes("Petrol")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>Petrol</label>
                                    </Box>
                                    <Box marginTop={1.5} className='checkboxPadding'>
                                        <input
                                            className="largerCheckbox"
                                            value="Diesel"
                                            onChange={handleFuel}
                                            checked={fuels.includes("Diesel")}
                                            type='checkbox'
                                            id='check'
                                            name='color' />
                                        <label htmlFor="check" style={{ color: '#333' }}>Diesel</label>
                                    </Box>
                                </>
                            }
                        </Box>
                    </Box>
                    <Grid container rowSpacing={4} columnSpacing={{ xs: 0, sm: 0.7, md: 3.5 }}>
                        {carsObj && carsObj.cars && currentCars.length < 1 ? carsObj.cars.map((car: Car) => (
                            <VehicleItem key={car._id} car={car} />
                        )) :
                            currentCars.map((car: Car) => (
                                <VehicleItem key={car._id} car={car} />
                            ))}
                    </Grid>
                </Stack>
                <PaginationVehicles
                    carsPerPage={carsPerPage}
                    totalCars={carsObj.cars.length}
                    paginate={paginate}
                />
            </Container>
            <Footer />
        </>
    )
}

export default Vehicles;
