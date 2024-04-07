import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import {
    Col,
    Row
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import EmployeeService from '../../../services/employee.service';

UpdateModal.propTypes = {
    employee: PropTypes.object.isRequired,
    getEmployees: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default function UpdateModal({ employee, getEmployees, closeModal }) {

    const initialValues = {
        name: employee.name,
        address: employee.address,
        age: employee.age,
        nic: employee.nic,
        city: employee.city,
        gender: employee.gender,
        lang: employee.lang
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        address: Yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
        age: Yup.string().required('Age is required'),
        nic: Yup.string().required('NIC is required').matches(/^[0-9]{9}[vVxX]$/, 'Invalid NIC'),
        city: Yup.string().required('City is required').min(3, 'City must be at least 3 characters'),
        gender: Yup.string().required('Gender is required').oneOf(['male', 'female'], 'Gender must be either Male or Female'),
        lang: Yup.array().min(1, 'At least one language is required')
    });

    const handleSubmit = (values) => {
        EmployeeService.updateEmployee(employee._id, values)
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Employee Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        getEmployees();
                        closeModal();
                    })
                }
            })
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label>Name</label>
                            <Field name="name" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name}</div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <Field name="address" className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.address}</div>
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <Field name="age" className={`form-control ${errors.age && touched.age ? 'is-invalid' : ''}`} onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                            }} />
                            <div className="invalid-feedback">{errors.age}</div>
                        </div>
                        <div className="form-group">
                            <label>NIC</label>
                            <Field name="nic" className={`form-control ${errors.nic && touched.nic ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nic}</div>
                        </div>
                        {/* City is a drop down */}
                        <div className="form-group">
                            <label>City</label>
                            <Field as="select" name="city" className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}>
                                <option value="">Select City</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Galle">Galle</option>
                            </Field>
                            <div className="invalid-feedback">{errors.city}</div>
                        </div>
                        <div className="form-group mt-2">
                            <Row>
                                <Col sm={4}>
                                    <label>Gender</label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field type="radio" name="gender" value="male" />
                                        {' '}Male
                                    </label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field type="radio" name="gender" value="female" />
                                        {' '}Female
                                    </label>
                                </Col>
                                <div className="invalid-feedback">{errors.gender}</div>
                            </Row>
                        </div>

                        <div className="form-group mt-2">
                            <Row>
                                <Col sm={4}>
                                    <label>Language Expert</label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field type="checkbox" name="lang" value="C#" />
                                        {' '}C#
                                    </label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field type="checkbox" name="lang" value="Java" />
                                        {' '}Java
                                    </label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field type="checkbox" name="lang" value="PHP" />
                                        {' '}PHP
                                    </label>
                                    <div className="invalid-feedback">{errors.lang}</div>
                                </Col>
                            </Row>
                        </div>

                        <button type="submit" className="btn btn-primary mt-2">Submit</button>

                    </Form>
                )}
            </Formik>
        </>
    )
}
