import { useState } from 'react';
import API from '../services/api';
import {toast} from 'react-toastify';
import { ClipLoader } from 'react-spinners';
function EmergencyForm() {
  const [type, setType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/emergency/report', {
        type,
        location: { latitude, longitude }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Emergency reported successfully!');
    } catch (error) {
      toast.error('Error reporting emergency.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report Emergency</h2>
      <input type="text" placeholder="Type" onChange={(e) => setType(e.target.value)} required />
      <input type="number" placeholder="Latitude" onChange={(e) => setLatitude(e.target.value)} required />
      <input type="number" placeholder="Longitude" onChange={(e) => setLongitude(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? <ClipLoader color="#fff" size={20}/>:'Report'}</button>
    </form>
  );
}

export default EmergencyForm;
