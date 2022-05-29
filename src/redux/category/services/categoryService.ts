import apiService from '../../services/apiService';

const getCategories = async () => {
    const { data } = await apiService.get('/category');

    return data;
}

const categoryService = {
    getCategories,
}

export default categoryService;
