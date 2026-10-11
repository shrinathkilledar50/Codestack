import React, { useEffect, useState } from 'react';
import { getAllAnswers, getAllErrorTypes, getAllTechnologies, updateAnswersById, deleteAnswersById } from '../../utils/api';
import { Button, Col, Container, Row, Form, Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

const ViewAnswers = () => {
    const [answers, setAnswers] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [errorTypes, setErrorTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showViewModal, setShowViewModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [errors, setErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [answersResponse, technologiesResponse, errorTypesResponse] = await Promise.all([
                getAllAnswers(),
                getAllTechnologies(),
                getAllErrorTypes()
            ]);

            if (answersResponse.ok && technologiesResponse.ok && errorTypesResponse.ok) {
                const answersData = await answersResponse.json();
                const technologiesData = await technologiesResponse.json();
                const errorTypesData = await errorTypesResponse.json();

                setAnswers(answersData);
                setTechnologies(technologiesData);
                setErrorTypes(errorTypesData);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getTechnologyName = (id) => {
        const tech = technologies.find(t => t._id === id);
        return tech ? tech.technology : 'Unknown';
    };

    const getErrorTypeName = (id) => {
        const errorType = errorTypes.find(e => e._id === id);
        return errorType ? errorType.errorType : 'Unknown';
    };

    const filteredAnswers = answers.filter((answer) =>
        getTechnologyName(answer.technology).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewClick = (answer) => {
        setSelectedAnswer(answer);
        setShowViewModal(true);
    };

    const handleVideoClick = (answer) => {
        setSelectedAnswer(answer);
        setShowVideoModal(true);
    };

    const handleViewModalClose = () => {
        setShowViewModal(false);
        setSelectedAnswer(null);
    };

    const handleVideoModalClose = () => {
        setShowVideoModal(false);
        setSelectedAnswer(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedAnswer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getYouTubeEmbedURL = (url) => {
        if (url) {
            const videoId = url.split('v=')[1];
            if (!videoId) {
                return null;
            }
            const ampersandPosition = videoId.indexOf('&');
            if (ampersandPosition !== -1) {
                return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
            }
            return `https://www.youtube.com/embed/${videoId}`;
        }
    };

    const handleEdit = async (answer) => {
        try {
            const response = await updateAnswersById(answer._id, answer);
            if (response.ok) {
                alert("Answer Modified Successfully");
                fetchData();
                handleViewModalClose();
            } else {
                const error = await response.json();
                console.error('Error:', error);
                setShowErrorAlert(true);
                setErrors({ server: error });
            }
        } catch (err) {
            console.error('Error in try block:', err);
            setShowErrorAlert(true);
            setErrors({ server: `An error occurred. Please try again. ${err.message}` });
        }
    };

    const handleDelete = async (answerId) => {
        try {
            const response = await deleteAnswersById(answerId);
            if (response.ok) {
                alert("Answer Deleted Successfully");
                fetchData();
            } else {
                const error = await response.json();
                console.error('Error:', error);
                setShowErrorAlert(true);
                setErrors({ server: error });
            }
        } catch (error) {
            console.error('Error deleting answer:', error);
            setShowErrorAlert(true);
            setErrors({ server: `An error occurred. Please try again. ${error.message}` });
        }
    };

    return (
        <div>
            <Container className='container-1'>
                <div className="list-container-1 scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">Answers</h2>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="search">
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
                        <Col xs={12} sm={2} className="text-center">
                            Technology
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                            Error Type
                        </Col>
                        <Col xs={12} sm={5} className="text-center">
                            Video
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                            Actions
                        </Col>
                    </Row>

                    {filteredAnswers.map((answer, index) => (
                        <Row key={index} className="table-row" onMouseEnter={(e) => e.currentTarget.classList.add('hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}>
                            <Col xs={12} sm={1} className="text-center">
                                {index + 1}
                            </Col>
                            <Col xs={12} sm={2} className="text-center">
                                {getTechnologyName(answer.technology)}
                            </Col>
                            <Col xs={12} sm={2} className="text-center">
                                {getErrorTypeName(answer.errorType)}
                            </Col>
                            <Col xs={12} sm={4} className="text-center">
                                <Button variant="link" onClick={() => handleVideoClick(answer)}>
                                    {answer.video}
                                </Button>
                            </Col>
                            <Col sm={2} className="text-center">
                                <Button variant="primary" onClick={() => handleViewClick(answer)}>
                                    View
                                </Button>
                            </Col>
                            <Col sm={1}>
                                <Button variant="danger" onClick={() => handleDelete(answer._id)} className="ml-2">
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </div>
            </Container>

            <Modal show={showViewModal} onHide={handleViewModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAnswer && (
                        <>
                            <Form.Group controlId="formTechnology">
                                <Form.Label>Technology</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={getTechnologyName(selectedAnswer.technology)}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formErrorType">
                                <Form.Label>Error Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={getErrorTypeName(selectedAnswer.errorType)}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={selectedAnswer.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="solnSteps">
                                <Form.Label>Solution Steps</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="solnSteps"
                                    value={selectedAnswer.solnSteps}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formVideo">
                                <Form.Label>Video</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="video"
                                    value={selectedAnswer.video}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formVideo">
                                <Form.Label>Links</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="links"
                                    value={selectedAnswer.links}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Books</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="books"
                                    value={selectedAnswer.books}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            Failed to add Answer. {errors.server}
                        </Alert>
                    )}
                    <Button variant="secondary" onClick={handleViewModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEdit(selectedAnswer)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showVideoModal} onHide={handleVideoModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Play Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAnswer && (
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe
                                className="embed-responsive-item"
                                src={getYouTubeEmbedURL(selectedAnswer.video)}
                                allowFullScreen
                                style={{ height: '380px', width: '100%' }}  // Set the height here
                            ></iframe>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleVideoModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ViewAnswers;
