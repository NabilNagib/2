import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingDetails.css'; 

const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://one-cb6z.onrender.com/bookings-details'); 
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleDeleteBooking = async (id) => {
        try {
            const response = await axios.delete(`https://one-cb6z.onrender.com/bookings/${id}`);
            if (response.status === 204) {
                window.location.reload()
                setBookings(bookings.filter(booking => booking.id !== id));
                
            } else {
                console.error('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const handleEditBooking = (id) => {

        console.log(`Edit booking with ID: ${id}`);
    };

    return (
        <div className="booking-details-container">
            <h2>Booking Details</h2>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date of Arrival</th>
                        <th>Date of Departure</th>
                        <th>Status</th>
                        <th>Guest</th>
                        <th>Hotel Name</th>
                        <th>Total Amount</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{new Date(booking.date_of_arrival).toLocaleDateString()}</td>
                            <td>{new Date(booking.date_of_departure).toLocaleDateString()}</td>
                            <td>{booking.status}</td>
                            <td>{`${booking.guest.firstName} ${booking.guest.secondName}`}</td>
                            <td>{booking.hotel.name}</td>
                            <td>Kes. {booking.total_amount.toFixed(2)}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingDetails;
