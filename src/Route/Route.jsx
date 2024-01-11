import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";
import Category from "../page/Category";
import Login from "../page/login";
import Register from "../page/Register";
import Product from "../page/Product";
import PrivateRoute from './../Private/PrivateRoute';
import Cart from "../page/Cart";

const router = createBrowserRouter([
   {
      path:'/',
      element:<MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
         {
            index: true,
            element:<Home></Home>
         },
         {
            path:'product/:id',
            element:<PrivateRoute><Product></Product></PrivateRoute>
         },
         {
            path:"category",
            element:<Category></Category>
         },
         {
            path:"cart",
            element:<Cart></Cart>
         }
      ]
   },
   {
      path:'/login',
      element:<Login></Login>
   },
   {
      path:'/register',
      element:<Register></Register>
   },
]);

export default router;