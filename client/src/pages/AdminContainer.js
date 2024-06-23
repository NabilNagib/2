import React, { useState, useEffect } from 'react';
import AddHotelModal from './AddHotelModal';
import GuestsList from './GuestsList';
import BookingDetails from './BookingDetails';
import './AdminContainer.css';

const AdminContainer = () => {
    const [showAddHotelModal, setShowAddHotelModal] = useState(false);
    const [showGuestsList, setShowGuestsList] = useState(false);
    const [showBookingDetails, setShowBookingDetails] = useState(false);
    const [guestsCount, setGuestsCount] = useState(0);
    const [hotelsCount, setHotelsCount] = useState(0);
    const [bookingsCount, setBookingsCount] = useState(0); 
    const [queryInput, setQueryInput] = useState('');
    const [queryResult, setQueryResult] = useState(null);

    useEffect(() => {
        const fetchGuestsCount = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/guests');
                if (response.ok) {
                    const data = await response.json();
                    setGuestsCount(data.length);
                } else {
                    console.error('Failed to fetch guests count');
                }
            } catch (error) {
                console.error('Error fetching guests count:', error);
            }
        };

        const fetchHotelsCount = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/hotels');
                if (response.ok) {
                    const data = await response.json();
                    setHotelsCount(data.length);
                } else {
                    console.error('Failed to fetch hotels count');
                }
            } catch (error) {
                console.error('Error fetching hotels count:', error);
            }
        };

        const fetchBookingsCount = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/bookings');
                if (response.ok) {
                    const data = await response.json();
                    setBookingsCount(data.length);
                } else {
                    console.error('Failed to fetch bookings count');
                }
            } catch (error) {
                console.error('Error fetching bookings count:', error);
            }
        };

        fetchGuestsCount();
        fetchHotelsCount();
        fetchBookingsCount();
    }, []);

    const handleQueryChange = (event) => {
        setQueryInput(event.target.value);
    };

    const handleQuerySubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://one-cb6z.onrender.com/guests/${queryInput}/booked_hotels_count`);
            if (response.ok) {
                const data = await response.json();
                setQueryResult(data);
            } else {
                console.error('Failed to fetch data');
                setQueryResult(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setQueryResult(null);
        }
    };

    const openAddHotelModal = () => {
        setShowAddHotelModal(true);
    };

    const closeAddHotelModal = () => {
        setShowAddHotelModal(false);
    };

    const toggleGuestsList = () => {
        setShowGuestsList(prevState => !prevState);
    };

    const toggleBookingDetails = () => {
        setShowBookingDetails(prevState => !prevState);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="admin-section">
                <div className="admin-card">
                    <button className="admin-link" onClick={openAddHotelModal}>Add New Hotel</button>
                </div>
                <AddHotelModal 
                    isOpen={showAddHotelModal} 
                    onClose={closeAddHotelModal} 
                />
                <div className="admin-card">
                    <p>Total Guests: {guestsCount}</p>
                </div>
                <div className="admin-card">
                    <p>Total Hotels: {hotelsCount}</p>
                </div>
                <div className="admin-card">
                    <button className="admin-link" onClick={toggleGuestsList}>Registered Users</button>
                </div>
                <div className="admin-card">
                    <button className="admin-link" onClick={toggleBookingDetails}>Booking Details</button>
                    {bookingsCount > 0 && (
                        <div className="badge">Bookings: {bookingsCount}</div> 
                    )}
                </div>
            </div>

            {showGuestsList && <GuestsList />}

            {showBookingDetails && <BookingDetails />}

            <div className="query-form">
                <form onSubmit={handleQuerySubmit}>
                    <label>
                        Query Guest by ID:
                        <input type="text" value={queryInput} onChange={handleQueryChange} />
                    </label>
                    <button type="submit">Query</button>
                </form>
            </div>

            {queryResult && (
                <div className="query-result-container">
                    <h2 className="query-result-title">Query Result</h2>
                    <div className="query-result-content">
                        <p className="query-result-item"><strong>Guest ID:</strong> {queryResult.guest_id}</p>
                        <p className="query-result-item"><strong>Guest Name:</strong> {queryResult.guest_name}</p>
                        <p className="query-result-item"><strong>Booked Hotels Count:</strong> {queryResult.booked_hotels_count}</p>
                        <p className="query-result-item"><strong>Booked Hotels:</strong></p>
                        <ul className="booked-hotels-list">
                            {queryResult.booked_hotels.map((hotel, index) => (
                                <li key={index} className="booked-hotel-item">{hotel}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContainer;
