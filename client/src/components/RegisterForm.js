import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    secondName: Yup.string().required('Second name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile must be 10 digits').required('Mobile is required')
});

const RegisterForm = () => (
    <Formik
        initialValues={{ firstName: '', secondName: '', email: '', password: '', mobile: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await fetch('https://one-cb6z.onrender.com/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                });
                const result = await response.json();
                alert(result.message);
                resetForm();
            } catch (error) {
                alert('Registration failed: ' + error.message);
            }
            setSubmitting(false);
        }}
    >
        {({ isSubmitting }) => (
            <Form>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field type="text" name="firstName" />
                    <ErrorMessage name="firstName" component="div" />
                </div>
                <div>
                    <label htmlFor="secondName">Second Name</label>
                    <Field type="text" name="secondName" />
                    <ErrorMessage name="secondName" component="div" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <Field type="text" name="mobile" />
                    <ErrorMessage name="mobile" component="div" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    Register
                </button>
            </Form>
        )}
    </Formik>
);

export default RegisterForm;
