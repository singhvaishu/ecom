import { React, useEffect } from 'react';
import Product from './features/product/components/ProductList';
import { Counter } from './features/counter/Counter';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import './App.css';
import Home from "./pages/Home";
import ProductDetailPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Checkout from './pages/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/components/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import CheckOut from './pages/Checkout';
import { PageNotFound } from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrderPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
        ),
      </Protected>

    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (<Protected>
      <CartPage />
    </Protected>),
  },
  {
    path: "/checkOutPage",
    element: (<Protected><CheckOut /></Protected>),
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/orderSuccess/:id",
    element: (
      <OrderSuccessPage />

    )
  },
  {
    path: "/orders",
    element: (
      <UserOrdersPage />
    )
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  }, [dispatch, user])
  return (
    <div className="App">
      {/* <Home> </Home> */}
      {/* <LoginPage></LoginPage> */}
      {/* <SignupPage></SignupPage> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
