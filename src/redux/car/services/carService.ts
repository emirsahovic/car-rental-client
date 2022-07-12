import { CarFormValues } from '../../../pages/AddVehicle';
import apiService from '../../services/apiService';

const getCars = async () => {
    const { data } = await apiService.get(`/car`);

    return data;
}

const sortCars = async (value: string) => {
    let res;
    if (value === 'mintomax') {
        res = await apiService.get('/car/sort?asc=true');
    } else if (value === 'maxtomin') {
        res = await apiService.get('/car/sort?desc=true');
    }
    return res?.data;
}

const getCarsByFilter = async (arg: any) => {
    const { data } = await apiService.post('/filter/search', arg);

    return data;
}

const getCarById = async (carId: string) => {
    const { data } = await apiService.get(`/car/find/${carId}`);

    return data;
}

const createCar = async (carData: CarFormValues) => {
    const { data } = await apiService.post('/car', carData);

    return data;
}

const carService = {
    getCars,
    getCarsByFilter,
    getCarById,
    createCar,
    sortCars
}

export default carService;
