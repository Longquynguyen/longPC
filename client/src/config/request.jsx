import axios from 'axios';
import cookies from 'js-cookie';
const request = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const requestGetContacts = async () => {
    const res = await request.get('/api/get-contacts');
    return res.data;
};

export const requestGetProductSearch = async (params) => {
    const res = await request.get('/api/get-product-search', { params });
    return res.data;
};

export const requestCreateContact = async (data) => {
    const res = await request.post('/api/create-contact', data);
    return res.data;
};

export const requestDeleteAllCartBuildPC = async () => {
    const res = await request.post('/api/delete-all-cart-build-pc');
    return res.data;
};

export const requestGetAllProducts = async (params = {}) => {
    const res = await request.get('/api/get-all-products', { params });
    return res.data;
};

export const requestResetPassword = async (data) => {
    const res = await request.post('/api/reset-password', data);
    return res.data;
};

export const requestForgotPassword = async (data) => {
    const res = await request.post('/api/forgot-password', data);
    return res.data;
};

export const requestGetCategory = async () => {
    const res = await request.get('/api/get-all-category');
    return res.data.metadata;
};

export const requestGetCategoryByComponentTypes = async (params = {}) => {
    const res = await request.get('/api/get-category-by-component-types', { params });
    return res.data.metadata;
};

export const requestGetProductHotSale = async () => {
    const res = await request.get('/api/get-product-hot-sale');
    return res.data.metadata;
};

export const requestAdmin = async () => {
    const res = await request.get('/api/admin');
    return res.data;
};

export const requestCreateProductPreview = async (data) => {
    const res = await request.post('/api/create-product-preview', data);
    return res.data;
};

export const requestGetCartBuildPcUser = async () => {
    const res = await request.get('/api/get-cart-build-pc');
    return res.data.metadata;
};

export const requestLoginGoogle = async (credential) => {
    const res = await request.post('/api/login-google', { credential });
    return res.data;
};

export const requestDeleteCategory = async (id) => {
    const res = await request.delete(`/api/delete-category`, {
        params: { id },
    });
    return res.data;
};

export const requestChatbot = async (data) => {
    const res = await request.post('/api/chat', data);
    return res.data;
};

export const requestUpdateCategory = async (data) => {
    const res = await request.post(`/api/update-category`, data);
    return res.data;
};

export const requestGetUsers = async () => {
    const res = await request.get('/api/get-users');
    return res.data;
};

export const requestCreateCategory = async (data) => {
    const res = await request.post('/api/create-category', data);
    return res.data;
};

export const requestGetOrderAdmin = async () => {
    const res = await request.get('/api/get-order-admin');
    return res.data;
};

export const requestUpdateOrderStatus = async (data) => {
    const res = await request.post('/api/update-order-status', data);
    return res.data;
};

//// product

export const requestCreateProduct = async (data) => {
    const res = await request.post('/api/create-product', data);
    return res.data;
};

export const requestGetProducts = async () => {
    const res = await request.get('/api/get-products');
    return res.data;
};

export const requestUpdateProduct = async (data) => {
    const res = await request.post('/api/update-product', data);
    return res.data;
};

export const requestDeleteProduct = async (id) => {
    const res = await request.delete('/api/delete-product', {
        params: { id },
    });
    return res.data;
};

export const requestGetProductsByCategories = async () => {
    const res = await request.get('/api/get-products-by-categories');
    return res.data;
};

export const requestGetProductById = async (id) => {
    const res = await request.get('/api/get-product-by-id', {
        params: { id },
    });
    return res.data;
};

export const requestCreateUserWatchProduct = async (data) => {
    const res = await request.post('/api/create-product-watch', data);
    return res.data;
};

export const requestGetProductWatch = async () => {
    const res = await request.get('/api/get-product-watch');
    return res.data;
};

export const requestGetProductCategory = async (params) => {
    const res = await request.get('/api/get-product-by-id-category', {
        params,
    });

    return res.data;
};

///// product component

export const requestCreateProductComponent = async (data) => {
    const res = await request.post('/api/create-product-component', data);
    return res.data;
};

export const requestUploadImage = async (data) => {
    const res = await request.post('/api/upload', data);
    return res.data;
};

export const requestUploadImages = async (data) => {
    const res = await request.post('/api/uploads', data);
    return res.data;
};

//// user
export const requestLogin = async (data) => {
    const res = await request.post('/api/login', data);
    return res.data;
};

export const requestRegister = async (data) => {
    const res = await request.post('/api/register', data);
    return res.data;
};

export const requestAuth = async () => {
    const res = await request.get('/api/auth');
    return res.data;
};

const requestRefreshToken = async () => {
    const res = await request.get('/api/refresh-token');
    return res.data;
};

export const requestLogout = async () => {
    const res = await request.get('/api/logout');
    return res.data;
};

export const requestUpdateUser = async (data) => {
    const res = await request.post('/api/update-info-user', data);
    return res.data;
};

export const requestDashboard = async () => {
    const res = await request.get('/api/dashboard');
    return res.data;
};

//// cart

export const requestUpdateQuantityCart = async (data) => {
    const res = await request.post('/api/update-quantity', data);
    return res.data;
};

export const requestAddToCart = async (data) => {
    const res = await request.post('/api/add-to-cart', data);
    return res.data;
};

export const requestDeleteCart = async (data) => {
    const res = await request.post('/api/delete-cart', data);
    return res.data;
};

export const requestGetCart = async () => {
    const res = await request.get('/api/get-cart');
    return res.data;
};

export const requestUpdateInfoCart = async (data) => {
    const res = await request.post('/api/update-info-cart', data);
    return res.data;
};

//// payments
export const requestPayment = async (data) => {
    const res = await request.post('/api/payments', data);
    return res.data;
};

export const requestGetPayments = async () => {
    const res = await request.get('/api/get-payments');
    return res.data;
};

export const requestCancelOrder = async (data) => {
    const res = await request.post('/api/cancel-order', data);
    return res.data;
};

export const requestGetProductByIdPayment = async (idPayment) => {
    const res = await request.get('/api/get-payment', { params: { idPayment: idPayment } });
    return res.data;
};

///// build pc
export const requestFindProductComponent = async (componentType) => {
    const res = await request.get('/api/get-product-by-component-type', { params: { componentType } });
    return res.data;
};

export const requestAddToCartBuildPc = async (data) => {
    const res = await request.post('/api/build-pc-cart', data);
    return res.data;
};

export const requestDeleteCartBuildPc = async (data) => {
    const res = await request.post('/api/delete-cart-build-pc', data);
    return res.data;
};

export const requestUpdateQuantityCartBuildPc = async (data) => {
    const res = await request.post('/api/update-quantity-cart-build-pc', data);
    return res.data;
};

export const requestGetCartBuildPc = async () => {
    const res = await request.get('/api/get-cart-build-pc');
    return res.data;
};

export const requestGetOrderStats = async () => {
    const res = await request.get('/api/get-order-stats');
    return res.data;
};

export const requestAddToCartBuildPcToCart = async (data) => {
    const res = await request.post('/api/add-to-cart-build-pc', data);
    return res.data;
};

export const requestGetBlogs = async () => {
    const res = await request.get('/api/get-blogs');
    return res.data;
};

export const requestCreateBlog = async (data) => {
    const res = await request.post('/api/create-blog', data);
    return res.data;
};

export const requestDeleteBlog = async (id) => {
    const res = await request.delete('/api/delete-blog', {
        params: { id },
    });
    return res.data;
};

export const requestGetBlogById = async (id) => {
    const res = await request.get('/api/get-blog-by-id', {
        params: { id },
    });
    return res.data;
};

let isRefreshing = false;
let failedRequestsQueue = [];

request.interceptors.response.use(
    (response) => response, // Trả về nếu không có lỗi
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 (Unauthorized) và request chưa từng thử refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    // Gửi yêu cầu refresh token
                    const token = cookies.get('logged');
                    if (!token) {
                        return;
                    }
                    await requestRefreshToken();

                    // Xử lý lại tất cả các request bị lỗi 401 trước đó
                    failedRequestsQueue.forEach((req) => req.resolve());
                    failedRequestsQueue = [];
                } catch (refreshError) {
                    // Nếu refresh thất bại, đăng xuất
                    failedRequestsQueue.forEach((req) => req.reject(refreshError));
                    failedRequestsQueue = [];
                    localStorage.clear();
                    window.location.href = '/login'; // Chuyển về trang đăng nhập
                } finally {
                    isRefreshing = false;
                }
            }

            // Trả về một Promise để retry request sau khi token mới được cập nhật
            return new Promise((resolve, reject) => {
                failedRequestsQueue.push({
                    resolve: () => {
                        resolve(request(originalRequest));
                    },
                    reject: (err) => reject(err),
                });
            });
        }

        return Promise.reject(error);
    },
);
