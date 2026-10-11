import React, { useEffect, useState } from 'react'
import { createAnswers, getAllErrorTypes, getAllTechnologies } from '../../utils/api';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

const Answers = () => {
    const [technologies, setTechnologies] = useState([]);
    const [errorTypes, setErrorTypes] = useState([]);
    const [errors, setErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const [data, setData] = useState({
        technology: '',
        errorType: '',
        description: '',
        solnSteps: '',
        links: '',
        video: '',
        books: ''
    });

    useEffect(() => {
        fetchTechnologies();
        fetchErrorTypes();
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
                    setTechnologies([]); // Set techExperts to empty array if response is not an array
                }
            } else {
                console.error('Failed to fetch techExperts');
            }
        } catch (error) {
            console.error('Error fetching techExperts:', error);
        }
    };

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
                    setErrorTypes([]); // Set techExperts to empty array if response is not an array
                }
            } else {
                console.error('Failed to fetch techExperts');
            }
        } catch (error) {
            console.error('Error fetching techExperts:', error);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const validateAnswer = () => {
        const errors = {};
        if (!data.technology) errors.technology = 'Technology is required';
        if (!data.errorType) errors.errorType = 'Error Type is required';
        if (!data.description) errors.description = 'Description is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        console.log("Entered")
        e.preventDefault();
        const errors = validateAnswer();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setErrors({});
        try {
            const response = await createAnswers(data);
            if (response.ok) {
                setShowSuccessAlert(true);
                setData({
                    technology: '',
                    errorType: '',
                    description: '',
                    solnSteps: '',
                    links: '',
                    video: '',
                    books: ''
                });
                console.log("Data reset:", data); // Logging the reset state
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

    return (
        <div>
            <Container className='container-1'>
                <Form onSubmit={handleSubmit}>
                    <div className='form-2'>
                        <Row>
                            <h1>Answers</h1>
                            {showSuccessAlert && (
                                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                                    Category added successfully!
                                </Alert>
                            )}
                        </Row>
                        <Row className='pt-3'>
                            <Col xs={2} className='pt-1'>
                                Technology
                            </Col>
                            <Col xs={4}>
                                <Form.Group controlId="technology" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center right-align-options"
                                        as="select"
                                        name="technology"
                                        value={data.technology}
                                        onChange={handleChange}
                                        isInvalid={!!errors.technology}
                                    >
                                        <option value="">Select Technology</option>
                                        {technologies.map((technology) => (
                                            <option key={technology._id} value={technology._id}>
                                                {technology.technology}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.technology}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col xs={2} className='pt-1'>
                                Error Type
                            </Col>
                            <Col xs={4}>
                                <Form.Group controlId="errorType" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center right-align-options"
                                        as="select"
                                        name="errorType"
                                        value={data.errorType}
                                        onChange={handleChange}
                                        isInvalid={!!errors.errorType}
                                    >
                                        <option value="">Select Error Type</option>
                                        {errorTypes.map((errorType) => (
                                            <option key={errorType._id} value={errorType._id}>
                                                {errorType.errorType}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.errorType}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className='pt-3'>
                                Description
                            </Col>
                            <Col xs={10}>
                                <Form.Group controlId="description" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        as="textarea"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                        placeholder="Description"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2} className='pt-3'>
                                Solution Steps
                            </Col>
                            <Col xs={10}>
                                <Form.Group controlId="solnSteps" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        as="textarea"
                                        name="solnSteps"
                                        value={data.solnSteps}
                                        onChange={handleChange}
                                        isInvalid={!!errors.solnSteps}
                                        placeholder="Solution Steps"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.solnSteps}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2} className='pt-3'>
                                Links
                            </Col>
                            <Col xs={10}>
                                <Form.Group controlId="links" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        type="text"
                                        name="links"
                                        value={data.links}
                                        onChange={handleChange}
                                        isInvalid={!!errors.links}
                                        placeholder="Links"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.links}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2} className='pt-3'>
                                Video Link
                            </Col>
                            <Col xs={10}>
                                <Form.Group controlId="video" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        type="text"
                                        name="video"
                                        value={data.video}
                                        onChange={handleChange}
                                        isInvalid={!!errors.video}
                                        placeholder="Video Link"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.video}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2} className='pt-3'>
                                Books
                            </Col>
                            <Col xs={10}>
                                <Form.Group controlId="books" className="pb-4">
                                    <Form.Control
                                        className="large-input text-center"
                                        as="textarea"
                                        name="books"
                                        value={data.books}
                                        onChange={handleChange}
                                        isInvalid={!!errors.books}
                                        placeholder="Books"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.books}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {showErrorAlert && (
                                    <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                                        Failed to add Answer. {errors.server}
                                    </Alert>
                                )}
                                <Button variant='primary' type='submit'> Add</Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Answers;