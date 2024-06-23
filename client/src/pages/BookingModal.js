import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, hotel, guestId, guestName }) => {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [status, setStatus] = useState('Available');
    const navigate = useNavigate();

    if (!hotel) {
        return null;
    }

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            date_of_arrival: arrivalDate,
            date_of_departure: departureDate,
            status: status,
            hotel_id: hotel.id,
            guest_id: guestId,
            total_amount: hotel.daily_rate * calculateDays(),
        };

        try {
            const response = await fetch('https://one-cb6z.onrender.com/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const text = await response.text();
            console.log('Server response text:', text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                console.error('Failed to parse JSON response:', parseError);
                alert('Failed to book reservation: The server response is not valid JSON. Response text: ' + text);
                return;
            }

            if (response.ok) {
                alert('Booking Successful!');
                onClose();
                navigate('/');
            } else {
                alert(data.error || 'Failed to book reservation');
            }
        } catch (error) {
            console.error('Failed to book reservation:', error);
            alert('Failed to book reservation: ' + error.message);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const calculateDays = () => {
        const start = new Date(arrivalDate);
        const end = new Date(departureDate);
        const difference = Math.abs(end - start);
        return Math.ceil(difference / (1000 * 3600 * 24));
    };

    const handleArrivalDateChange = (e) => {
        setArrivalDate(e.target.value);
    };

    const handleDepartureDateChange = (e) => {
        setDepartureDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className={`booking-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className="modal-title">Book {hotel.name}</h2>
                <form onSubmit={handleBookingSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Arrival Date:</label>
                        <input type="date" value={arrivalDate} onChange={handleArrivalDateChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Departure Date:</label>
                        <input type="date" value={departureDate} onChange={handleDepartureDateChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select value={status} onChange={handleStatusChange} className="form-control" required>
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                        </select>
                    </div>
                    <div className="booking-details">
                        <p><strong>Number of Days:</strong> {calculateDays()}</p>
                        <p><strong>Amount:</strong> Kes. {hotel.daily_rate * calculateDays()} total</p>
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="btn-book-now">Book Now</button>
                        <button type="button" onClick={handleCancel} className="btn-cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
