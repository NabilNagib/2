// BookingDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings-details'); // Adjust URL as per your Flask backend route
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Booking Details</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date of Arrival</th>
            <th>Date of Departure</th>
            <th>Status</th>
            <th>Guest</th>
            <th>Hotel Name</th>
            <th>Guest Email</th>
            <th>Guest Mobile</th>
            <th>Total Amount</th>
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
              <td>{booking.guest_email}</td>
              <td>{booking.guest_mobile}</td>
              <td>${booking.total_amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDetails;
