import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from "../pages/Login";
import RegistrationPage from '../pages/Registration';
import TaskDashBoard from '../pages/TaskDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/dashboard' element={<TaskDashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
