import React, { useState, useEffect } from 'react';

const AmendHotel = ({ hotelId }) => {
    const [hotelData, setHotelData] = useState({
        name: '',
        location: '',
        daily_rate: '',
        rating: '',
        additional_info: '',
        image: ''
    });

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await fetch(`/hotels/${hotelId}`); // Replace with actual endpoint
                const data = await response.json();
                setHotelData(data);
            } catch (error) {
                console.error('Error fetching hotel:', error);
            }
        };

        fetchHotel();
    }, [hotelId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotelData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/hotels/${hotelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hotelData)
            });
            const updatedHotel = await response.json();
            console.log('Hotel updated successfully:', updatedHotel);
            // Optionally redirect or show a success message
        } catch (error) {
            console.error('Error updating hotel:', error);
            // Handle error state or show error message
        }
    };

    return (
        <div>
            <h2>Amend Hotel</h2>
            <form>
                <label>Name:</label>
                <input type="text" name="name" value={hotelData.name} onChange={handleChange} required />
                <label>Location:</label>
                <input type="text" name="location" value={hotelData.location} onChange={handleChange} required />
                <label>Daily Rate:</label>
                <input type="number" name="daily_rate" value={hotelData.daily_rate} onChange={handleChange} required />
                <label>Rating:</label>
                <input type="number" name="rating" value={hotelData.rating} onChange={handleChange} required />
                <label>Additional Info:</label>
                <textarea name="additional_info" value={hotelData.additional_info} onChange={handleChange}></textarea>
                <label>Image:</label>
                <input type="text" name="image" value={hotelData.image} onChange={handleChange} />
                <button type="button" onClick={handleSave}>Save Changes</button>
            </form>
        </div>
    );
};

export default AmendHotel;
