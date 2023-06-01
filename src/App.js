import { Route, Routes } from 'react-router-dom';
import './App.css';
import { User } from './containers/User/User';
import { DashBoard } from './containers/DashBoard';
import { LayoutPrimary } from './components/Layout';
import { TestUseState } from './components/TestUseState';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LayoutPrimary titlePage="Dashboard"><DashBoard /></LayoutPrimary>}></Route>
      <Route path='/user' element={<LayoutPrimary titlePage="Account/Users"><User /></LayoutPrimary>}></Route>
      <Route path='/count' element={<TestUseState />}></Route>
    </Routes>
  );
}

export default App;
