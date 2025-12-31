import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from './SharedComponents/Components/AuthLayout/AuthLayout';
import MasterLayout from './SharedComponents/Components/MasterLayout/MasterLayout';
import NotFound from './SharedComponents/Components/NotFound/NotFound';

import Welcome from './AuthModule/Components/Welcome/Welcome';
import Login from './AuthModule/Components/Login/Login';
import Register from './AuthModule/Components/Register/Register';
import VerifyAccount from './AuthModule/Components/VerifyAccount/VerifyAccount';

import DashBoard from './DashBoardModule/Components/DashBoard/DashBoard';
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword';
import ChangePassword from './AuthModule/Components/ChangePassword/ChangePassword';
import ResetPassord from './AuthModule/Components/ResetPassword/ResetPassord';

function App() {
  const routes = createBrowserRouter([
    // 1) Welcome لوحده (أول صفحة)
    {
      path: "/",
      element: <Welcome />,
      errorElement: <NotFound />,
    },

    
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },         
        { path: "login", element: <Login /> },       
        { path: "register", element: <Register /> }, 
        { path: "forget-password", element: <ForgetPassword /> }, 
        { path: "change-password", element: <ChangePassword /> },
        { path: "reset-password", element: <ResetPassord /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },

    
    {
      path: "/dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <DashBoard /> },     
      ],
    },

    
    { path: "/not-found", element: <NotFound /> },

    
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

