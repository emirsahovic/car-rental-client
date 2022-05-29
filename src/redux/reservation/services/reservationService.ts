import apiService from '../../services/apiService';
import { FormReservationValues } from '../../../pages/Reservation';

const createReservation = async (reservationData: FormReservationValues) => {
    const { data } = await apiService.post('/reservation', reservationData);

    return data;
}

const getReservations = async () => {
    const { data } = await apiService.get('/reservation');

    return data;
}

const deleteReservation = async (resId: string) => {
    const { data } = await apiService.delete(`/reservation/${resId}`);

    return data;
}

const reservationService = {
    createReservation,
    getReservations,
    deleteReservation
}

export default reservationService;
