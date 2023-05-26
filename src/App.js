import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    secondName: '',
    firstName: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const response = await axios.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/clients', formData);
      getClients();
      setFormData({
        clientId: '',
        secondName: '',
        firstName: '',
        address: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (clientId) => {
    try {
      await axios.delete(`/clients/${clientId}`);
      getClients();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Clients</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
          />
        </label>
        <label>
          Second Name:
          <input
            type="text"
            name="secondName"
            value={formData.secondName}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <h2>Client list</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.clientId}>
            <span>{client.secondName}, {client.firstName}</span>
            <button onClick={() => handleDelete(client.clientId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
