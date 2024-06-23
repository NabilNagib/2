import React, { useEffect, useState } from 'react';
import './Footer.css'; // Import the corresponding CSS file

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            setIsVisible(isBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`footer ${isVisible ? 'visible' : ''}`}>
            <div className="footer-content">
                <p>&copy; 2024 EZ Booking. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
