import { useState } from 'react';
import Login from './components/Login';
import EmergencyForm from './components/EmergencyForm';
import EmergencyDashboard from './components/EmergencyDashboard';
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <EmergencyForm />
          <EmergencyDashboard />
        </>
      ) : (
        <Login setToken={setToken} />
      )}
      <ToastContainer/>
    </div>
  );
}

export default App;


