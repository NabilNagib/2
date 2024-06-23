import React, { useState } from 'react';
import './HotelUpdateModal.css'; // Import modal styles if needed

const HotelUpdateModal = ({ isOpen, onClose, hotel, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: hotel.name,
        location: hotel.location,
        daily_rate: hotel.daily_rate,
        rating: hotel.rating,
        additional_info: hotel.additional_info,
        image: hotel.image,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://one-cb6z.onrender.com/hotels/${hotel.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const updatedHotel = await response.json();
                onUpdate(updatedHotel); // Update state in parent component
                onClose(); // Close the modal
            } else {
                console.error('Failed to update hotel.');
            }
        } catch (error) {
            console.error('Error updating hotel:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Hotel</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />

                    <label>Daily Rate:</label>
                    <input type="number" name="daily_rate" value={formData.daily_rate} onChange={handleChange} required />

                    <label>Rating:</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} required />

                    <label>Additional Info:</label>
                    <textarea name="additional_info" value={formData.additional_info} onChange={handleChange}></textarea>

                    <label>Image URL:</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} />

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default HotelUpdateModal;
