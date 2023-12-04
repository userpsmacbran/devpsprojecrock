import { Routes, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import RegisterCompany from './views/RegisterCompany/RegisterCompany';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register-company' element={<RegisterCompany />} />
      </Routes>
    </>
  );
}

export default App;
