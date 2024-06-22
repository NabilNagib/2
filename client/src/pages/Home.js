import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/hotels');
                const result = await response.json();
                setHotels(result);
            } catch (error) {
                alert('Failed to fetch hotels: ' + error.message);
            }
        };

        fetchHotels();
    }, []);

    const handleBookClick = () => {
        if (isLoggedIn) {
            navigate('/booking');
        } else {
            alert('Please login to book.');
            navigate('/login');
        }
    };

    return (
        <div>
            <h1>Welcome to the Hotel Management App</h1>
            <div className="hotels-grid">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="hotel-card">
                        <img src={hotel.image} alt={`${hotel.name}`} className="hotel-image" />
                        <div className="hotel-details">
                            <h2>{hotel.name}</h2>
                            <p><strong>Location:</strong> {hotel.location}</p>
                            <p><strong>Rating:</strong> {hotel.rating}</p>
                            <p><strong>Price:</strong> Kes. {hotel.daily_rate} per night</p>
                            <p><strong>Description:</strong> {hotel.additional_info}</p>
                            {isLoggedIn && (
                                <button onClick={handleBookClick} className="book-button">Book</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
