import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { RecoilRoot } from 'recoil'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Users from './users/pages/Users';
// import NewPlace from './places/pages/NewPlace';
import { Navigate } from 'react-router-dom';
import TailSpin from './shared/components/Loaders/TailSpin';
// import MainNavigation from './shared/components/Navigation/MainNavigation';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Authenticate from './users/pages/Authenticate';

const Users = lazy(()=> import('./users/pages/Users')  )
const NewPlace = lazy(()=> import ('./places/pages/NewPlace'))
const MainNavigation = lazy(()=> import('./shared/components/Navigation/MainNavigation'))
const UserPlaces = lazy(()=> import('./places/pages/UserPlaces') )
const UpdatePlace = lazy(()=> import('./places/pages/UpdatePlace') )
const Authenticate = lazy(()=> import('./users/pages/Authenticate')  )


const root = ReactDOM.createRoot(document.getElementById('root'));



const userData = JSON.parse(localStorage.getItem('userData'))



const router = createBrowserRouter([
  {
    path:'/',
    element:<MainNavigation/>,
    children:[
  {
    path:'/',
    element: <Users/>,
    errorElement: <Users/>
  },
  {
    path:'/places/new',
    element:<NewPlace/>,
  },
  {
    path:'/:userId/places',
    element: <UserPlaces/>
  },
  {
    path:'/places/:placeId',
    element:<UpdatePlace/>
  },
  { 
    path:'/auth',
    element: <Authenticate/>
  },
  {
    path:'*',
    element: <Navigate to='/' />
  }
  ]}
]);




root.render(
  
  <React.StrictMode>
    <RecoilRoot>
    <App userData={userData}  />
    <Suspense fallback={<TailSpin/>} >
    <RouterProvider router={router} >
      <Outlet/>
    </RouterProvider>
    </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
