import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async'
import { StoreProvider } from './Store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import SignInScreen from './pages/SignInScreen';
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import SignUpScreen from './pages/SignUp';
import PaymentMethodScreen from './pages/PaymentMethodScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import OrderHistoryScreen from './pages/OrderHistoryScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomeScreen/>},
      { path:'/product/:slug', element: <ProductScreen/>},
      { path:'/cart', element: <CartScreen />},
      { path:'/signin',element: <SignInScreen/>},
      { path:'/shipping',element: <ShippingAddressScreen/>},
      { path:'/signup',element: <SignUpScreen/>},
      { path:'/payment',element: <PaymentMethodScreen/>},
      { path:'/placeorder',element: <PlaceOrderScreen/>},
      { path:'/order/:id',element: <OrderScreen/>},
      { path:'/orderhistory',element: <OrderHistoryScreen/>},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router}/>
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
