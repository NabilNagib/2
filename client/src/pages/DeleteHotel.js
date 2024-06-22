import React, { useState, useEffect } from 'react';

const DeleteHotel = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('/hotels'); // Fetch from your backend endpoint
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    const handleDelete = async (hotelId) => {
        try {
            const response = await fetch(`/hotels/${hotelId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Hotel deleted successfully');
                // Optionally update state or show a success message
            } else {
                console.error('Failed to delete hotel');
                // Handle delete failure state or show an error message
            }
        } catch (error) {
            console.error('Error deleting hotel:', error);
            // Handle error state or show error message
        }
    };

    return (
        <div>
            <h2>Delete Hotel</h2>
            <ul>
                {hotels.map(hotel => (
                    <li key={hotel.id}>
                        <p>{hotel.name}</p>
                        <button onClick={() => handleDelete(hotel.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteHotel;
