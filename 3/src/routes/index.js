import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess"
export const routes = [
    {
        path: '/',
        element: HomePage,  
        isShowHeader: true,
    
    },
    {
        path: '/order',
        element: OrderPage,
        isShowHeader: true,
    
    },
    {
        path: '/payment',
        element: PaymentPage,
        isShowHeader: true,

    },
    {
        path: '/orderSuccess',
        element: OrderSuccess,
        isShowHeader: true,

    },
    {
        path: '/favorite',
        element: FavoritePage,
        isShowHeader: true,

    },
    {
        path: '/products',
        element: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/search',
        element: SearchPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        element: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        element: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        element: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        element: ProfilePage,
        isShowHeader: true
    },

    {
        path: '/system/admin',
        element: AdminPage,
        isShowHeader: false,
        isPrivate: true

    },
    {
        path: '*',
        element: NotFoundPage
    },
];
