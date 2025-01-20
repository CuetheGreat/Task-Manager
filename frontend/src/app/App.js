import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from "../pages/Login";
import RegistrationPage from '../pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
