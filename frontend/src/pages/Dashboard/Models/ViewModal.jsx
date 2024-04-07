import { Formik, Form, Field } from 'formik';
import {
    Col,
    Row
} from 'react-bootstrap';
import PropTypes from 'prop-types';

ViewModal.propTypes = {
    employee: PropTypes.object.isRequired
};

export default function ViewModal({ employee }) {

    const initialValues = {
        name: employee.name,
        address: employee.address,
        age: employee.age,
        nic: employee.nic,
        city: employee.city,
        gender: employee.gender,
        lang: employee.lang
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label>Name</label>
                            <Field name="name" readOnly className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name}</div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <Field name="address" readOnly className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.address}</div>
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <Field name="age" readOnly className={`form-control ${errors.age && touched.age ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.age}</div>
                        </div>
                        <div className="form-group">
                            <label>NIC</label>
                            <Field name="nic" readOnly className={`form-control ${errors.nic && touched.nic ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nic}</div>
                        </div>
                        {/* City is a drop down */}
                        <div className="form-group">
                            <label>City</label>
                            <Field name="city" readOnly className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.city}</div>
                        </div>
                        <div className="form-group mt-2" readOnly>
                            <Row>
                                <Col sm={4}>
                                    <label>Gender</label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field disabled type="radio" name="gender" value="male" />
                                        {' '}Male
                                    </label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field disabled type="radio" name="gender" value="female" />
                                        {' '}Female
                                    </label>
                                </Col>
                                <div className="invalid-feedback">{errors.gender}</div>
                            </Row>
                        </div>

                        <div className="form-group mt-2" readOnly>
                            <Row>
                                <Col sm={4}>
                                    <label>Language Expert</label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field disabled type="checkbox" name="lang" value="C#" />
                                        {' '}C#
                                    </label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field disabled type="checkbox" name="lang" value="Java" />
                                        {' '}Java
                                    </label>
                                </Col>
                                <Col>
                                    <label>
                                        <Field disabled type="checkbox" name="lang" value="PHP" />
                                        {' '}PHP
                                    </label>
                                    <div className="invalid-feedback">{errors.lang}</div>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
