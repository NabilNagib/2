import React, { useEffect, useState } from 'react';
import './GuestsList.css';

const GuestsList = () => {
    const [guests, setGuests] = useState([]);
    const [editGuestId, setEditGuestId] = useState(null);
    const [editGuestData, setEditGuestData] = useState({ firstName: '', secondName: '', email: '', mobile: '' });

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/guests'); 
                const data = await response.json();

                const filteredData = data.filter(guest => guest.id !== 1);
                setGuests(filteredData);
            } catch (error) {
                console.error('Error fetching guests:', error);
            }
        };

        fetchGuests();
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditGuestData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditClick = (guest) => {
        setEditGuestId(guest.id);
        setEditGuestData(guest);
    };

    const handleSaveClick = async (id) => {
        try {
            const response = await fetch(`https://one-cb6z.onrender.com/guests/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editGuestData),
            });
            if (response.ok) {
                setGuests(guests.map(guest => guest.id === id ? editGuestData : guest));
                setEditGuestId(null);
            } else {
                console.error('Failed to update guest');
            }
        } catch (error) {
            console.error('Error updating guest:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`https://one-cb6z.onrender.com/guests/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setGuests(guests.filter(guest => guest.id !== id));
            } else {
                console.error('Failed to delete guest');
            }
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
    };

    return (
        <div className="guests-list-container">
            <h2>All Guests</h2>
            <ul className="guests-list">
                {guests.map(guest => (
                    <li key={guest.id} className="guest-item">
                        {editGuestId === guest.id ? (
                            <div>
                                <p>
                                    <strong>Name:</strong> 
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={editGuestData.firstName} 
                                        onChange={handleEditChange}
                                    /> 
                                    <input 
                                        type="text" 
                                        name="secondName" 
                                        value={editGuestData.secondName} 
                                        onChange={handleEditChange}
                                    />
                                </p>
                                <p>
                                    <strong>Email:</strong> 
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={editGuestData.email} 
                                        onChange={handleEditChange}
                                    />
                                </p>
                                <p>
                                    <strong>Mobile:</strong> 
                                    <input 
                                        type="text" 
                                        name="mobile" 
                                        value={editGuestData.mobile} 
                                        onChange={handleEditChange}
                                    />
                                </p>
                                <button onClick={() => handleSaveClick(guest.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Name:</strong> {guest.firstName} {guest.secondName}</p>
                                <p><strong>Email:</strong> {guest.email}</p>
                                <p><strong>Mobile:</strong> {guest.mobile}</p>
                                <button onClick={() => handleDeleteClick(guest.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GuestsList;
