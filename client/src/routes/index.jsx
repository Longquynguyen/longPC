import App from '../App';
import Admin from '../Pages/Admin/Index';
export const publicRoutes = [
    { path: '/', component: <App /> },
    { path: '/admin', component: <Admin /> },
];
