import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import './App.css';

import Layout from './layouts/layout/layout';
import Home from './pages/home/home';
import Profileedit from './pages/Profileedit/Profileedit';
import Login from './pages/Login/Login';
import Inputphone from './pages/Inputphone/Inputphone';
import OTP from './pages/OTP/OTP';
import Register from './pages/Register/Register';
import Create from './pages/Create/Create';
import List from './pages/list/list';
import History from './pages/history/history'
import Chat from './pages/Chat/Chat'
import Payment from './Payment/Payment';

import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className='container-app'>
      <HashRouter>
        <Routes>
          {/* Routes under the main layout */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/list' element={<List />} />
            <Route path='/history' element={<History />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/profile' element={<Profileedit />} />
            
          </Route>

          {/* Authentication-related routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/inputphone' element={<Inputphone />} />
          <Route path='/otp' element={<OTP />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<Create />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
