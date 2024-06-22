import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement your booking submission logic here, e.g., using fetch()
        try {
            const response = await fetch('https://one-cb6z.onrender.com/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date_of_arrival: arrivalDate, date_of_departure: departureDate }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Thank You');
                navigate('/');
            } else {
                alert(data.error || 'Failed to submit booking');
            }
        } catch (error) {
            alert('Failed to submit booking: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Arrival Date:</label>
                    <input
                        type="date"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Departure Date:</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Booking;
