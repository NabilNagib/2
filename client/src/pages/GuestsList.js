import React, { useEffect, useState } from 'react';

const GuestsList = () => {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('/guests'); // Fetch from your backend endpoint
                const data = await response.json();
                setGuests(data);
            } catch (error) {
                console.error('Error fetching guests:', error);
            }
        };

        fetchGuests();
    }, []);

    return (
        <div>
            <h2>All Guests</h2>
            <ul>
                {guests.map(guest => (
                    <li key={guest.id}>
                        <p><strong>Name:</strong> {guest.firstName} {guest.secondName}</p>
                        <p><strong>Email:</strong> {guest.email}</p>
                        <p><strong>Mobile:</strong> {guest.mobile}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GuestsList;
