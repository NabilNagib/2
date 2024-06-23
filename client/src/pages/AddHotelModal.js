import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddHotelModal.css';

const AddHotelModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        location: '',
        dailyRate: '',
        rating: '',
        additionalInfo: '',
        image: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        location: Yup.string().required('Location is required'),
        dailyRate: Yup.number().required('Daily Rate is required').positive('Daily Rate must be a positive number'),
        rating: Yup.number().required('Rating is required').min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
        additionalInfo: Yup.string(),
        image: Yup.string().url('Image URL must be a valid URL'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const hotelData = {
            name: values.name,
            location: values.location,
            daily_rate: values.dailyRate,
            rating: values.rating,
            additional_info: values.additionalInfo,
            image: values.image,
        };

        try {
            const response = await fetch('https://one-cb6z.onrender.com/hotels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hotelData),
            });

            if (response.ok) {
                alert('Hotel added successfully!');
                onClose(); 
                navigate('/dashboard'); 
            } else {
                const errorText = await response.text();
                console.error('Failed to add hotel:', errorText);
                alert('Failed to add hotel: ' + errorText);
            }
        } catch (error) {
            console.error('Failed to add hotel:', error);
            alert('Failed to add hotel: ' + error.message);
        }

        setSubmitting(false);
    };

    const handleCancel = () => {
        onClose(); 
        navigate('/dashboard'); 
    };

    return (
        <div className={`add-hotel-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Hotel</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <Field type="text" id="name" name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location:</label>
                                <Field type="text" id="location" name="location" className="form-control" />
                                <ErrorMessage name="location" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dailyRate">Daily Rate:</label>
                                <Field type="number" id="dailyRate" name="dailyRate" className="form-control" />
                                <ErrorMessage name="dailyRate" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">Rating:</label>
                                <Field type="number" id="rating" name="rating" className="form-control" />
                                <ErrorMessage name="rating" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="additionalInfo">Additional Info:</label>
                                <Field as="textarea" id="additionalInfo" name="additionalInfo" className="form-control" />
                                <ErrorMessage name="additionalInfo" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image URL:</label>
                                <Field type="text" id="image" name="image" className="form-control" />
                                <ErrorMessage name="image" component="div" className="error-message" />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="btn-submit" disabled={isSubmitting}>Add Hotel</button>
                                <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddHotelModal;
