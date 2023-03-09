import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './Router/HomePage';
import LoginPage from './Router/LoginPage';
import RegisterPage from './Router/RegisterPage';
import ErrorPage from './Router/ErrorPage';
import RouteProvider from './Context/RouteProvider';
import AuthProvider from './Context/AuthProvider';
import InfoModal from './Component/Modals/InfoModal';
import AddModal from './Component/Modals/AddModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteProvider>
          <Routes>
            <Route path="/signup" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<ErrorPage />}/>
          </Routes>
          <InfoModal />
          <AddModal />
        </RouteProvider>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
