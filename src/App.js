import { Route, Routes } from 'react-router-dom';
import './App.css';
import { User } from './containers/User/User';
import { DashBoard } from './containers/DashBoard';
import { LayoutPrimary } from './components/Layout';
import { NotFoundPage } from './containers/NotFoundPage/NotFoundPage';
import { Customer } from 'containers/Customers';
import { Product } from 'containers/Product';
import { Order } from 'containers/Order';
import { Coupon } from 'containers/Coupon';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LayoutPrimary titlePage="Dashboard"><DashBoard /></LayoutPrimary>}></Route>
      <Route path='/user' element={<LayoutPrimary titlePage="Account/Users"><User /></LayoutPrimary>}></Route>
      <Route path='/customers' element={<LayoutPrimary titlePage="Customers"><Customer /></LayoutPrimary>}></Route>
      <Route path='/products' element={<LayoutPrimary titlePage="Product"><Product /></LayoutPrimary>}></Route>
      <Route path='/orders' element={<LayoutPrimary titlePage="Orders"><Order /></LayoutPrimary>}></Route>
      <Route path='/coupons' element={<LayoutPrimary titlePage="Coupon"><Coupon /></LayoutPrimary>}></Route>
      <Route path='*' element={<NotFoundPage/>}></Route>
    </Routes>
  );
}

export default App;
