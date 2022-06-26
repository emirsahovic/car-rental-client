import { CarFormValues } from '../../../pages/AddVehicle';
import apiService from '../../services/apiService';

const getCars = async () => {
    const { data } = await apiService.get(`/car`);

    return data;
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
    createCar
}

export default carService;
