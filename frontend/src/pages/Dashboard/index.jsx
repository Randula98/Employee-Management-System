import { useState, useEffect } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Modal,
    Row,
    Table
} from 'react-bootstrap';

import {
    AddModal,
    UpdateModal,
    ViewModal
} from './Models';

import Swal from 'sweetalert2';

import EmployeeService from '../../services/employee.service';

export default function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});

    //states for modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    //functions to handle modal states
    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);

    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = (employee) => {
        setEmployee(employee);
        setShowEditModal(true);
    }

    const handleViewModalClose = () => setShowViewModal(false);
    const handleViewModalShow = (employee) => {
        setEmployee(employee);
        setShowViewModal(true);
    }

    const getEmployees = () => {
        EmployeeService.getEmployees()
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const deleteEmployee = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                EmployeeService.deleteEmployee(id)
                    .then((res) => {
                        if (res.status === 204) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Employee Record has been deleted.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                getEmployees();
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    }

    return (
        <>
            <Container className='landingContainer'>
                <Row style={{ height: '8vh' }}>
                    <Col sm={10}>
                        <Alert variant="primary" >
                            Manage your employees from here
                        </Alert>
                    </Col>
                    <Col className="d-flex justify-content-end" style={{ height: '8vh' }} sm={2}>
                        <Button variant="primary" onClick={handleAddModalShow}>Add New Employees</Button>{' '}
                    </Col>
                </Row>

                <Row>
                    <Row >
                        <Col>
                            <h2 className="text-center">Employee List</h2>
                        </Col>
                    </Row>
                    <Row >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th style={{ width: '20rem' }}>Address</th>
                                        <th>Age</th>
                                        <th>ID Number</th>
                                        <th>City</th>
                                        <th style={{ width: '15rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employees.map((employee) => {
                                            return (
                                                <tr key={employee.id}>
                                                    <td>{employee.name}</td>
                                                    <td>{employee.address}</td>
                                                    <td>{employee.age}</td>
                                                    <td>{employee.nic}</td>
                                                    <td>{employee.city}</td>
                                                    <td>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() =>
                                                                handleViewModalShow(employee)
                                                            }>View</Button>{' '}
                                                        <Button
                                                            variant="success"
                                                            onClick={() =>
                                                                handleEditModalShow(employee)
                                                            }
                                                        >Edit</Button>{' '}
                                                        <Button
                                                            variant="danger"
                                                            onClick={() =>
                                                                deleteEmployee(employee._id)
                                                            }
                                                        >Delete</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Row>
                </Row>
            </Container>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddModal getEmployees={getEmployees} closeModal={handleAddModalClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateModal employee={employee} getEmployees={getEmployees} closeModal={handleEditModalClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* View Modal */}
            <Modal show={showViewModal} onHide={handleViewModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ViewModal employee={employee} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleViewModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
