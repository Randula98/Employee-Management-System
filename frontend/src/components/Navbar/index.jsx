import { useState } from 'react';
import { Container, Navbar, Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import userService from '../../services/user.service';

export default function NavBar() {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6).max(20)
    });

    const registerSchema = Yup.object().shape({
        username: Yup.string().required().min(3).max(20),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6).max(20),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const login = (values) => {
        userService.login(values)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: "User Login Success!!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then(() => {
                            localStorage.setItem('token', response.data.token);
                            window.location.href = '/dashboard';
                        })
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong!!",
                    icon: "error",
                    footer: "Please try again",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    const register = (values) => {
        const data = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        console.log(data);
        userService.register(data)
            .then(response => {
                if (response.status === 201) {
                    Swal.fire({
                        title: "Success",
                        text: "User Created Successfully!!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then(() => {
                            localStorage.setItem('token', response.data.token);
                            window.location.href = '/dashboard';
                        });
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong!!",
                    icon: "error",
                    footer: "Please try again",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Employee Management System</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {
                            localStorage.getItem('token') ?
                                <Navbar.Text>
                                    <Button variant="outline-secondary" onClick={logout}>Logout</Button>{' '}
                                </Navbar.Text>
                                :
                                <Navbar.Text>
                                    <Button variant="outline-success" onClick={handleShowRegister}>Register</Button>{' '}

                                    <Button variant="outline-success" onClick={handleShowLogin}>Login</Button>{' '}
                                </Navbar.Text>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            login(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="Email" className="form-label">Email address</label>
                                    <Field type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} id="email" name="email" />
                                    {errors.email && touched.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} id="password" name="password" />
                                    {errors.password && touched.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showRegister}
                onHide={handleCloseRegister}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>User Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={registerSchema}
                        onSubmit={(values) => {
                            register(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <Field type="text" className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`} id="username" name="username" />
                                    {errors.username && touched.username ? (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Email" className="form-label">Email address</label>
                                    <Field type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} id="email" name="email" />
                                    {errors.email && touched.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} id="password" name="password" />
                                    {errors.password && touched.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <Field type="password" className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRegister}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
