import React, { useState, useEffect, useRef } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { createTechnology, deleteTechnologyById, getAllTechnologies, updateTechnologyById } from '../../utils/api';

const Technologies = () => {
    const [technologies, setTechnologies] = useState([]);
    const [technologyData, setTechnologyData] = useState({
        technology: '',
        description: ''
    });
    const [technologyErrors, setTechnologyErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [technologyId, setTechnologyId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const formRef = useRef(null);

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const fetchTechnologies = async () => {
        try {
            const response = await getAllTechnologies();
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    const sortedTechnologies = data.sort((a, b) => a.technology.localeCompare(b.technology));
                    setTechnologies(sortedTechnologies);
                } else {
                    console.error('Expected an array but got:', data);
                    setTechnologies([]); // Set technologies to empty array if response is not an array
                }
            } else {
                console.error('Failed to fetch technologies');
            }
        } catch (error) {
            console.error('Error fetching technologies:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTechnologyData({ ...technologyData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const validateTechnology = () => {
        const errors = {};
        if (!technologyData.technology) errors.technology = 'Technology is required';
        if (!technologyData.description) errors.description = 'Technology description is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        console.log("Entered")
        e.preventDefault();
        const errors = validateTechnology();

        if (Object.keys(errors).length > 0) {
            setTechnologyErrors(errors);
            return;
        }

        setTechnologyErrors({});
        try {
            let response;
            if (isEditMode) {
                response = await updateTechnologyById(technologyId, technologyData);
            } else {
                response = await createTechnology(technologyData);
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

                setTechnologyData({
                    technology: '',
                    description: ''
                });
                setTechnologyId(null);
                fetchTechnologies(); // Fetch technologies again to update the list after adding/updating a technology
                setIsEditMode(false);
            } else {
                console.error('Error:', responseData);
                setShowErrorAlert(true);
                setTechnologyErrors({ server: responseData.message });
            }
        } catch (err) {
            console.error('Error in try block:', err);
            setShowErrorAlert(true);
            setTechnologyErrors({ server: `An error occurred. Please try again. ${err.message}` });
        }
    };

    const handleEdit = (technology) => {
        setTechnologyData({
            technology: technology.technology,
            description: technology.description
        });
        setIsEditMode(true);
        setTechnologyId(technology._id);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    const handleDelete = async (technology) => {
        try {
            const response = await deleteTechnologyById(technology._id);
            if (response.ok) {
                alert("Technology Deleted Successfully");
                fetchTechnologies();
            } else {
                console.error('Failed to delete technology');
            }
        } catch (error) {
            console.error('Error deleting technology:', error);
        }
    };

    // Filtered technologies based on search query
    const filteredTechnologies = technologies.filter((technology) =>
        technology.technology.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Container className="container-1" ref={formRef}>
                <div className="form form-2">
                    <h2 className="text-center mb-4">{isEditMode ? 'Edit Technology' : 'Add Technology'}</h2>
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            Technology added successfully!
                        </Alert>
                    )}
                    {showUpdateAlert && (
                        <Alert variant="success" onClose={() => setShowUpdateAlert(false)} dismissible>
                            Technology updated successfully!
                        </Alert>
                    )}
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            Failed to {isEditMode ? 'update' : 'add'} technology. {technologyErrors.server}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="technology" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        type="text"
                                        name="technology"
                                        value={technologyData.technology}
                                        onChange={handleChange}
                                        isInvalid={!!technologyErrors.technology}
                                        placeholder="Technology"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {technologyErrors.technology}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="description" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        type="text"
                                        name="description"
                                        value={technologyData.description}
                                        onChange={handleChange}
                                        isInvalid={!!technologyErrors.description}
                                        placeholder="Description"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {technologyErrors.description}
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
                            <h2 className="mb-4">List of Technologies</h2>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="search" >
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Technology"
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
                            Technology Name
                        </Col>
                        <Col xs={12} sm={5} className="text-center">
                            Description
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                            Actions
                        </Col>
                    </Row>

                    {filteredTechnologies.map((technology, index) => (
                        <Row key={index} className="table-row" onMouseEnter={(e) => e.currentTarget.classList.add('hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}>
                            <Col xs={12} sm={1} className="text-center">
                                {index + 1}
                            </Col>
                            <Col xs={12} sm={4} className="text-center">
                                {technology.technology}
                            </Col>
                            <Col xs={12} sm={5} className="text-center">
                                {technology.description}
                            </Col>
                            <Col xs={6} sm={1} className="text-center">
                                <Button variant="primary" type="button" className="mt-2 signup-button" onClick={() => handleEdit(technology)}>
                                    <MdEdit />
                                </Button>
                            </Col>
                            <Col xs={6} sm={1} className="text-center">
                                <Button variant="primary" type="button" className="mt-2 signup-button" onClick={() => handleDelete(technology)}>
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

export default Technologies;
