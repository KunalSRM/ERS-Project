import { useEffect, useState } from 'react';
import API from '../services/api';
import { io } from 'socket.io-client';
import { ClipLoader } from 'react-spinners';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { toast } from 'react-toastify';

const socket = io('http://localhost:5000');
const containerStyle = { width: '100%', height: '400px' };
const center = { lat: 20.5937, lng: 78.9629 }; // Default to India center

function EmergencyDashboard() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // 👉 Replace with your API key
  });

  const fetchEmergencies = async () => {
    try {
      const res = await API.get('/emergency/active', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmergencies(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching emergencies');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();

    socket.on('newEmergency', (data) => {
      setEmergencies((prev) => [data, ...prev]);
    });

    return () => socket.off('newEmergency');
  }, []);

  if (loading || !isLoaded) return <ClipLoader color="#28a745" size={50} cssOverride={{ display: 'block', margin: '100px auto' }} />;

  return (
    <div>
      <h2>Emergency Dashboard</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
        {emergencies.map((em, index) => (
          <Marker key={index} position={{ lat: em.location.latitude, lng: em.location.longitude }} />
        ))}
      </GoogleMap>
      <ul>
        {emergencies.map((em, index) => (
          <li key={index}>
            {em.type} - Lat: {em.location.latitude} - Long: {em.location.longitude} - {new Date(em.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmergencyDashboard;
