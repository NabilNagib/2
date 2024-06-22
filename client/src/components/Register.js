// Register.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
    const initialValues = {
        firstName: '',
        secondName: '',
        email: '',
        password: '',
        mobile: ''
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        secondName: Yup.string().required('Second Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number')
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:5000/register', values);
            console.log(response.data);
            alert('User registered successfully');
            resetForm();
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="register-form">
                    <h2>Register</h2>
                    <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="input-field"
                    />
                    <ErrorMessage name="firstName" component="div" className="error-message" />

                    <Field
                        type="text"
                        name="secondName"
                        placeholder="Second Name"
                        className="input-field"
                    />
                    <ErrorMessage name="secondName" component="div" className="error-message" />

                    <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input-field"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />

                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input-field"
                    />
                    <ErrorMessage name="password" component="div" className="error-message" />

                    <Field
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        className="input-field"
                    />
                    <ErrorMessage name="mobile" component="div" className="error-message" />

                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Register;
