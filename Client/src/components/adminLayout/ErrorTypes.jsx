import React, { useState, useEffect, useRef } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { createErrorType, deleteErrorTypeById, getAllErrorTypes, updateErrorTypeById } from '../../utils/api';

const ErrorTypes = () => {
    const [errorTypes, setErrorTypes] = useState([]);
    const [errorTypeData, setErrorTypeData] = useState({
        errorType: '',
        description: ''
    });
    const [errorTypeErrors, setErrorTypeErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [errorTypeId, setErrorTypeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const formRef = useRef(null);

    useEffect(() => {
        fetchErrorTypes();
    }, []);

    const fetchErrorTypes = async () => {
        try {
            const response = await getAllErrorTypes();
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    const sortedErrorTypes = data.sort((a, b) => a.errorType.localeCompare(b.errorType));
                    setErrorTypes(sortedErrorTypes);
                } else {
                    console.error('Expected an array but got:', data);
                    setErrorTypes([]); // Set errorTypes to empty array if response is not an array
                }
            } else {
                console.error('Failed to fetch errorTypes');
            }
        } catch (error) {
            console.error('Error fetching errorTypes:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorTypeData({ ...errorTypeData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const validateErrorType = () => {
        const errors = {};
        if (!errorTypeData.errorType) errors.errorType = 'ErrorType is required';
        if (!errorTypeData.description) errors.description = 'ErrorType description is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        console.log("Entered")
        e.preventDefault();
        const errors = validateErrorType();

        if (Object.keys(errors).length > 0) {
            setErrorTypeErrors(errors);
            return;
        }

        setErrorTypeErrors({});
        try {
            let response;
            if (isEditMode) {
                response = await updateErrorTypeById(errorTypeId, errorTypeData);
            } else {
                response = await createErrorType(errorTypeData);
            }

            const responseData = await response.json();

            if (response.ok) {

                if (isEditMode) {
                    setShowUpdateAlert(true);
                    setShowSuccessAlert(false);
                } else {
                    setShowUpdateAlert(false);
                    setShowSuccessAlert(true);
                }

                setErrorTypeData({
                    errorType: '',
                    description: ''
                });
                setErrorTypeId(null);
                fetchErrorTypes(); // Fetch errorTypes again to update the list after adding/updating a errorType
                setIsEditMode(false);
            } else {
                console.error('Error:', responseData);
                setShowErrorAlert(true);
                setErrorTypeErrors({ server: responseData.message });
            }
        } catch (err) {
            console.error('Error in try block:', err);
            setShowErrorAlert(true);
            setErrorTypeErrors({ server: `An error occurred. Please try again. ${err.message}` });
        }
    };

    const handleEdit = (errorType) => {
        setErrorTypeData({
            errorType: errorType.errorType,
            description: errorType.description
        });
        setIsEditMode(true);
        setErrorTypeId(errorType._id);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    const handleDelete = async (errorType) => {
        try {
            const response = await deleteErrorTypeById(errorType._id);
            if (response.ok) {
                alert("ErrorType Deleted Successfully");
                fetchErrorTypes();
            } else {
                console.error('Failed to delete errorType');
            }
        } catch (error) {
            console.error('Error deleting errorType:', error);
        }
    };

    // Filtered errorTypes based on search query
    const filteredErrorTypes = errorTypes.filter((errorType) =>
        errorType.errorType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Container className="container-1" ref={formRef}>
                <div className="form form-2">
                    <h2 className="text-center mb-4">{isEditMode ? 'Edit Error Type' : 'Add Error Type'}</h2>
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            Error Type added successfully!
                        </Alert>
                    )}
                    {showUpdateAlert && (
                        <Alert variant="success" onClose={() => setShowUpdateAlert(false)} dismissible>
                            Error Type updated successfully!
                        </Alert>
                    )}
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            Failed to {isEditMode ? 'update' : 'add'} errorType. {errorTypeErrors.server}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="errorType" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        type="text"
                                        name="errorType"
                                        value={errorTypeData.errorType}
                                        onChange={handleChange}
                                        minLength="3"
                                        isInvalid={!!errorTypeErrors.errorType}
                                        placeholder="Error Type"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorTypeErrors.errorType}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="description" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        type="text"
                                        name="description"
                                        value={errorTypeData.description}
                                        onChange={handleChange}
                                        isInvalid={!!errorTypeErrors.description}
                                        placeholder="Description"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorTypeErrors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" className="mt-2 signup-button">
                            {isEditMode ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </div>
            </Container>

            <Container className="container-1">
                <div className="list-container scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">List of ErrorTypes</h2>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="search" >
                                <Form.Control
                                    type="text"
                                    placeholder="Search by ErrorType"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={1} className="text-center">
                            Sl. No.
                        </Col>
                        <Col xs={12} sm={4} className="text-center">
                            ErrorType Name
                        </Col>
                        <Col xs={12} sm={5} className="text-center">
                            Description
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                            Actions
                        </Col>
                    </Row>

                    {filteredErrorTypes.map((errorType, index) => (
                        <Row key={index} className="table-row" onMouseEnter={(e) => e.currentTarget.classList.add('hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}>
                            <Col xs={12} sm={1} className="text-center">
                                {index + 1}
                            </Col>
                            <Col xs={12} sm={4} className="text-center">
                                {errorType.errorType}
                            </Col>
                            <Col xs={12} sm={5} className="text-center">
                                {errorType.description}
                            </Col>
                            <Col xs={6} sm={1} className="text-center">
                                <Button variant="primary" type="button" className="mt-2 signup-button" onClick={() => handleEdit(errorType)}>
                                    <MdEdit />
                                </Button>
                            </Col>
                            <Col xs={6} sm={1} className="text-center">
                                <Button variant="primary" type="button" className="mt-2 signup-button" onClick={() => handleDelete(errorType)}>
                                    <MdDelete />
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default ErrorTypes;
