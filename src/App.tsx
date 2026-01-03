import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from './SharedComponents/Components/AuthLayout/AuthLayout';
import MasterLayout from './SharedComponents/Components/MasterLayout/MasterLayout';
import NotFound from './SharedComponents/Components/NotFound/NotFound';

import Welcome from './Modules/AuthModule/Components/Welcome/Welcome';
import Login from './Modules/AuthModule/Components/Login/Login';

import VerifyAccount from './Modules/AuthModule/Components/VerifyAccount/VerifyAccount';

import DashBoard from './Modules/DashBoardModule/Components/DashBoard/DashBoard';
import ForgetPassword from './Modules/AuthModule/Components/ForgetPassword/ForgetPassword';
import ChangePassword from './Modules/AuthModule/Components/ChangePassword/ChangePassword';
import ResetPassord from './Modules/AuthModule/Components/ResetPassword/ResetPassord';
import CreateNewAccount from './Modules/AuthModule/Components/CreateNewAccount/CreateNewAccount';
import ProtectedRoute from './Context/ProtectedRoute';

function App() {
  const routes = createBrowserRouter([
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
        { path: "createaccount", element: <CreateNewAccount /> },      
        { path: "forget-password", element: <ForgetPassword /> }, 
        { path: "change-password", element: <ChangePassword /> },
        { path: "reset-password", element: <ResetPassord /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },

    
    {
      path: "/dashboard",
     element: (
    <ProtectedRoute>
      <MasterLayout />
    </ProtectedRoute>
  ),
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

