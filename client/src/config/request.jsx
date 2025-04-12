import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000',
});

export default request;

export const requestGetCategory = async () => {
    const res = await request.get('/api/get-all-category');
    return res.data.metadata;
};

export const requestDeleteCategory = async (id) => {
    const res = await request.delete(`/api/delete-category`, {
        params: { id },
    });
    return res.data;
};

export const requestUpdateCategory = async (data) => {
    const res = await request.post(`/api/update-category`, data);
    return res.data;
};

export const requestCreateCategory = async (data) => {
    const res = await request.post('/api/create-category', data);
    return res.data;
};

export const requestUploadImage = async (data) => {
    const res = await request.post('/api/upload', data);
    return res.data;
};
