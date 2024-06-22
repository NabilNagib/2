import React, { useEffect, useState } from 'react';

const HotelsList = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/hotels');
                const result = await response.json();
                setHotels(result);
            } catch (error) {
                console.error('Failed to fetch hotels: ', error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div>
            <h2>All Hotels</h2>
            <div className="hotels-list">
                {hotels.map(hotel => (
                    <div key={hotel.id} className="hotel-card">
                        <h3>{hotel.name}</h3>
                        <p><strong>Location:</strong> {hotel.location}</p>
                        <p><strong>Rating:</strong> {hotel.rating}</p>
                        <p><strong>Price:</strong> Kes. {hotel.daily_rate} per night</p>
                        <p><strong>Description:</strong> {hotel.additional_info}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelsList;
