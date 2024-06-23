import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        secondName: Yup.string()
            .required('Second Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        mobile: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Mobile number must be at least 10 digits')
            .max(15, 'Mobile number must not exceed 15 digits')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('Submitting form with values:', values);
        try {
            const response = await fetch('https://one-cb6z.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const responseText = await response.text();
            console.log('Response Text:', responseText);

            const data = JSON.parse(responseText);

            if (response.ok) {
                alert(data.message || 'User registered successfully');
                resetForm();
                navigate('/login');
            } else {
                alert(data.error || 'Failed to register');
            }
        } catch (error) {
            alert('Failed to register: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <h3>Sign Up</h3>
            <Formik
                initialValues={{
                    firstName: '',
                    secondName: '',
                    email: '',
                    password: '',
                    mobile: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="register-form"> 
                        <div className="form-group"> 
                            <label htmlFor="firstName">First Name:</label>
                            <Field type="text" id="firstName" name="firstName" className="form-control" />
                            <ErrorMessage name="firstName" component="div" className="error-message" />
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="secondName">Second Name:</label>
                            <Field type="text" id="secondName" name="secondName" className="form-control" />
                            <ErrorMessage name="secondName" component="div" className="error-message" />
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="password">Password:</label>
                            <Field type="password" id="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="mobile">Mobile:</label>
                            <Field type="text" id="mobile" name="mobile" className="form-control" />
                            <ErrorMessage name="mobile" component="div" className="error-message" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="btn-register">Register</button> 
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
