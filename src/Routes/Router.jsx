import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import Biodatas from "../Pages/Biodatas/Biodatas";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Register from "../Pages/Register/Register";
import BiodataDetails from "../Pages/BiodataDetails/BiodataDetails";
import CheckOut from "../Pages/CheckOut/CheckOut";
import EditBiodata from "../Pages/Dashboard/EditBiodata/EditBiodata";
import FavouriteBiodata from "../Pages/Dashboard/FavouriteBiodata/FavouriteBiodata";
import ViewBiodata from "../Pages/Dashboard/ViewBiodata/ViewBiodata";
import MyContactRequest from "../Pages/Dashboard/MyContactRequest/MyContactRequest";
import ApprovedPremium from "../Pages/Dashboard/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../Pages/Dashboard/ApprovedContactRequest/ApprovedContactRequest";
import GotMarried from "../Pages/Dashboard/GotMarried/GotMarried";
import AdminSuccessStory from "../Pages/Dashboard/AdminSuccessStory/AdminSuccessStory";
import PremiumProfileDetails from "../Components/PremiumProfileDetails/PremiumProfileDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            }, 
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/biodatas',
                element: <Biodatas></Biodatas>
            },
            {
                path: '/biodatas/:id',
                element: <PrivateRoute><BiodataDetails></BiodataDetails></PrivateRoute>,
                loader: ({params}) => fetch(`https://matrimony-server-chi.vercel.app/biodatas/${params.id}`)  
            },
            {
                path: '/premiumRequests/:id',
                element: <PrivateRoute><PremiumProfileDetails></PremiumProfileDetails></PrivateRoute>,
                loader: ({params}) => fetch(`https://matrimony-server-chi.vercel.app/premiumRequests/${params.id}`)  
            },
            {
                path: '/payment/:id',
                element: <Payment></Payment>,
                // loader: ({params}) => fetch(`https://matrimony-server-chi.vercel.app/biodatas/${params.id}`)  
                loader: ({params}) => fetch(`https://matrimony-server-chi.vercel.app/payment/${params.id}`)  
            },
            {
                path: '/checkOut/:id',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                // element: <CheckOut></CheckOut>,
                loader: ({params}) => fetch(`https://matrimony-server-chi.vercel.app/checkOut/${params.id}`)  
            },
            {
                path: '/aboutUs',
                element:  <AboutUs></AboutUs>
            },
            {
                path: '/contactUs',
                element:  <ContactUs></ContactUs>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>, 
        children: [
            // normal user routes
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            // {
            //     path: 'payment',
            //     element: <Payment></Payment>
            // },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'editBiodata',
                element: <EditBiodata></EditBiodata>
            },
            {
                path: 'favouriteBiodata',
                element: <FavouriteBiodata></FavouriteBiodata>
            },
            {
                path: 'viewBiodata',
                element: <ViewBiodata></ViewBiodata>
            },
            {
                path: 'myContactRequest',
                element: <MyContactRequest></MyContactRequest>
            },
            {
                path: 'gotMarried',
                element: <GotMarried></GotMarried>
            },
             

            // admin only routes
            {
                path: 'adminHome',
                // element: <AddItems></AddItems> 
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
                // element: <AdminHome></AdminHome>
            },
            // {
            //     path: 'addItems',
            //     element: <AdminRoute><AddItems></AddItems></AdminRoute>
            // },
            // {
            //     path: 'manageItems',
            //     element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            // },
            // {
            //     path: 'updateItem/:id',
            //     element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
            //     loader: ({params}) => fetch(`https://bistro-boss-server-black-chi.vercel.app/menu/${params.id}`)
            // },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
                // element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
                // element: <AllUsers></AllUsers>
            },
            {
                path: 'approvedPremium',
                element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>
            },
            {
                path: 'approvedContactRequest',
                element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>
            },
            {
                path: 'successStory',
                element: <AdminRoute><AdminSuccessStory></AdminSuccessStory></AdminRoute>
            }
        ]
    }
]);
