
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tracking = () => {
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [disasters, setDisasters] = useState([]);

    useEffect(() => {
        fetchDisasters();
    }, []);

    const fetchDisasters = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/user/disasters');
            setDisasters(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/user/disasters', {
                location,
                description,
            });
            setDisasters([res.data, ...disasters]);
            setLocation('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Disaster Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Report Disaster</button>
            </form>

            <h2>Recent Disasters</h2>
            <ul>
                {disasters.map((disaster) => (
                    <li key={disaster._id}>
                        <strong>{disaster.location}</strong>: {disaster.description} ({new Date(disaster.timestamp).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tracking;
