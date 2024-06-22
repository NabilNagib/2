import React, { useState } from 'react';

const AddHotel = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        daily_rate: '',
        rating: '',
        additional_info: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/hotels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log('Hotel added successfully:', data);
            // Optionally redirect or show a success message
        } catch (error) {
            console.error('Error adding hotel:', error);
            // Handle error state or show error message
        }
    };

    return (
        <div>
            <h2>Add Hotel</h2>
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
                <label>Image:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />
                <button type="submit">Add Hotel</button>
            </form>
        </div>
    );
};

export default AddHotel;
