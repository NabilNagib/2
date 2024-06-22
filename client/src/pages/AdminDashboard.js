import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [totalHotels, setTotalHotels] = useState(0); // State to store total hotels count

    useEffect(() => {
        const fetchTotalHotels = async () => {
            try {
                const response = await fetch('/hotels'); // Fetch from your backend endpoint
                const data = await response.json();
                setTotalHotels(data.length); // Assuming data is an array of hotels
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchTotalHotels();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Guests</h2>
                <Link to="/guests">View All Guests</Link>
            </div>
            <div>
                <h2>Hotels</h2>
                <p>Total Hotels: {totalHotels}</p>
                <Link to="/hotels">View All Hotels</Link>
            </div>
            <div>
                <h2>Hotel Management</h2>
                <ul>
                    <li><Link to="/add-hotel">Add Hotel</Link></li>
                    <li><Link to="/amend-hotel">Amend Hotel</Link></li>
                    <li><Link to="/delete-hotel">Delete Hotel</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
