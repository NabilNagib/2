import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling

const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:5000/login', values);
            if (response.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
        setSubmitting(false);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" className="input-field" name="email" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field type="password" className="input-field" name="password" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
