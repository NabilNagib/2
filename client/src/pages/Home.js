import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';
import HotelUpdateModal from './HotelUpdateModal';
import BookingModal from './BookingModal';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [bookingHotel, setBookingHotel] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { isLoggedIn, role, guestId, guestName } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/hotels');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setHotels(result);
            } catch (error) {
                console.error('Failed to fetch hotels:', error);
                alert('Failed to fetch hotels: ' + error.message);
            }
        };

        fetchHotels();
    }, []);

    const handleBookClick = (hotel) => {
        if (isLoggedIn) {
            setBookingHotel(hotel);
            setIsBookingModalOpen(true);
        } else {
            alert('Please login to book a reservation.');
            navigate('/login');
        }
    };

    const handleUpdateClick = (hotel) => {
        setSelectedHotel(hotel);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = async (hotelId) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                const response = await fetch(`https://one-cb6z.onrender.com/hotels/${hotelId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setHotels(hotels.filter(hotel => hotel.id !== hotelId));
            } catch (error) {
                console.error('Failed to delete hotel:', error);
                alert('Failed to delete hotel: ' + error.message);
            }
        }
    };

    const handleCloseUpdateModal = () => {
        setSelectedHotel(null);
        setIsUpdateModalOpen(false);
    };

    const handleCloseBookingModal = () => {
        setBookingHotel(null);
        setIsBookingModalOpen(false);
    };

    const handleUpdateHotel = (updatedHotel) => {
        const updatedHotels = hotels.map(hotel => {
            if (hotel.id === updatedHotel.id) {
                return updatedHotel;
            }
            return hotel;
        });
        setHotels(updatedHotels);
    };

    return (
        <div>
            <h3> Welcome to EZ Booking. Your Hotel Booking App </h3>
            {isLoggedIn && role === 'admin' && (
                <div className="admin-container">
                    <Link to="/dashboard" className="admin-container-link"><h3>Dashboard</h3></Link>
                </div>
            )}
            <div className="hotels-grid">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="hotel-card">
                        <img src={hotel.image} alt={`${hotel.name}`} className="hotel-image" />
                        <div className="hotel-details">
                            <h2>{hotel.name}</h2>
                            <p><strong>Location:</strong> {hotel.location}</p>
                            <p><strong>Rating:</strong> {hotel.rating}</p>
                            <p><strong>Price:</strong> Kes. {hotel.daily_rate} per night</p>
                            <p><strong>Description:</strong> {hotel.additional_info}</p>
                            {isLoggedIn && (
                                <div className="button-container">
                                    <button onClick={() => handleBookClick(hotel)} className="book-button">Book</button>
                                    {role === 'admin' && (
                                        <>
                                            <button onClick={() => handleUpdateClick(hotel)} className="update-button">Update</button>
                                            <button onClick={() => handleDeleteClick(hotel.id)} className="delete-button">Delete</button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {selectedHotel && (
                <HotelUpdateModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    hotel={selectedHotel}
                    onUpdate={handleUpdateHotel}
                />
            )}
            {bookingHotel && (
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={handleCloseBookingModal}
                    hotel={bookingHotel}
                    guestId={guestId}
                    guestName={guestName}
                />
            )}
        </div>
    );
};

export default Home;
