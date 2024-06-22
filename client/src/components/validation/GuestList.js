import React, { useEffect, useState } from 'react';

const GuestsList = () => {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/guests');
                const result = await response.json();
                setGuests(result);
            } catch (error) {
                alert('Failed to fetch guests: ' + error.message);
            }
        };

        fetchGuests();
    }, []);

    return (
        <div>
            <h2>Guest List</h2>
            <ul>
                {guests.map((guest) => (
                    <li key={guest.id}>{guest.firstName} {guest.secondName} ({guest.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default GuestsList;
