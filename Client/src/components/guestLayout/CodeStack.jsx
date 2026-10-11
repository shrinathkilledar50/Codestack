import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAnswers, getAllErrorTypes, getAllTechnologies } from '../../utils/api';
import { Button, Col, Container, Row, Form, Modal, Card } from 'react-bootstrap';
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai';
import { useUserData } from '../../utils/Cookies';
import { MdLogout } from 'react-icons/md';
import Cookies from 'js-cookie';

const CodeStack = () => {
    const [answers, setAnswers] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [errorTypes, setErrorTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTechnology, setSelectedTechnology] = useState('');
    const [selectedErrorType, setSelectedErrorType] = useState('');
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [likes, setLikes] = useState([]);
    const [unlikes, setUnlikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentInputsVisible, setCommentInputsVisible] = useState([]);

    const { user: userData, logout } = useUserData();
    const history = useNavigate();

    useEffect(() => {
        fetchData();
    }, [selectedTechnology, selectedErrorType]);

    const fetchData = async () => {
        try {
            const [answersResponse, technologiesResponse, errorTypesResponse] = await Promise.all([
                getAllAnswers(selectedTechnology, selectedErrorType),
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

                // Initialize likes, unlikes, comments, and commentInputsVisible arrays based on answers
                setLikes(new Array(answersData.length).fill(0));
                setUnlikes(new Array(answersData.length).fill(0));
                setComments(new Array(answersData.length).fill('')); // Initialize comments array with empty strings
                setCommentInputsVisible(new Array(answersData.length).fill(false));
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

    const filteredAnswers = answers.filter((answer) => {
        const technologyName = getTechnologyName(answer.technology).toLowerCase();
        const errorTypeName = getErrorTypeName(answer.errorType).toLowerCase();
        const description = answer.description.toLowerCase();

        // Check if searchQuery matches any field
        return (
            (technologyName.includes(searchQuery.toLowerCase()) ||
                errorTypeName.includes(searchQuery.toLowerCase()) ||
                description.includes(searchQuery.toLowerCase())) &&
            (selectedTechnology ? answer.technology === selectedTechnology : true) &&
            (selectedErrorType ? answer.errorType === selectedErrorType : true)
        );
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTechnologyChange = (e) => {
        setSelectedTechnology(e.target.value);
    };

    const handleErrorTypeChange = (e) => {
        setSelectedErrorType(e.target.value);
    };

    const handleVideoClick = (answer) => {
        setSelectedAnswer(answer);
        setShowVideoModal(true);
    };

    const handleVideoModalClose = () => {
        setShowVideoModal(false);
        setSelectedAnswer(null);
    };

    const getYouTubeEmbedURL = (url) => {
        if (url) {
            const videoId = url.split('v=')[1];
            console.log("Video Id: ", videoId)
            if (videoId) {
                const ampersandPosition = videoId.indexOf('&');
                if (ampersandPosition !== -1) {
                    return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
                }
                return `https://www.youtube.com/embed/${videoId}`;
            }

        }
    };

    const handleLike = (index) => {
        const updatedLikes = [...likes];
        updatedLikes[index]++;
        setLikes(updatedLikes);
    };

    const handleUnlike = (index) => {
        const updatedUnlikes = [...unlikes];
        updatedUnlikes[index]++;
        setUnlikes(updatedUnlikes);
    };

    const handleToggleCommentInput = (index) => {
        const updatedCommentInputsVisible = [...commentInputsVisible];
        updatedCommentInputsVisible[index] = !updatedCommentInputsVisible[index];
        setCommentInputsVisible(updatedCommentInputsVisible);
    };

    const handleAddComment = (index, comment) => {
        const updatedComments = [...comments];
        updatedComments[index] = [...updatedComments[index], comment];
        setComments(updatedComments);

        // Hide the comment input after adding comment
        handleToggleCommentInput(index);
    };

    const handleLogout = () => {
        // Clear cookies
        Cookies.remove('userData');
        // Clear session storage
        sessionStorage.clear();
        // Clear local storage if needed
        localStorage.clear();
        // Perform logout action (assuming useUserData provides a logout function)
        if (logout) {
            logout(); // Example function to clear user data and update state
        }
        // Reload the current component
        window.location.reload();
    };

    return (
        <div>
            <Container className='pt-4'>
                <Row>
                    <Col xs={2}>
                        Technology
                    </Col>
                    <Col xs={2}>
                        <Form.Group controlId="technology" className="pb-4">
                            <Form.Control
                                className="large-input text-center right-align-options"
                                as="select"
                                value={selectedTechnology}
                                onChange={handleTechnologyChange}
                            >
                                <option value="">Select Technology</option>
                                {technologies.map((technology) => (
                                    <option key={technology._id} value={technology._id}>
                                        {technology.technology}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={2} className='pt-1'>
                        Error Type
                    </Col>
                    <Col xs={3}>
                        <Form.Group controlId="errorType" className="pb-4">
                            <Form.Control
                                className="large-input text-center right-align-options"
                                as="select"
                                value={selectedErrorType}
                                onChange={handleErrorTypeChange}
                            >
                                <option value="">Select Error Type</option>
                                {errorTypes.map((errorType) => (
                                    <option key={errorType._id} value={errorType._id}>
                                        {errorType.errorType}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="search">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Container>
                <div>
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">Answers</h2>
                        </Col>
                        <Col xs={12} sm={4}>
                            {userData._id &&
                                <Button variant='secondary' onClick={handleLogout}>
                                    Logout <MdLogout />
                                </Button>
                            }
                        </Col>

                    </Row>

                    <Row>
                        {filteredAnswers.map((answer, index) => (
                            <Col key={index} xs={12} className="mb-4">
                                <Card style={{ width: '100%' }}>
                                    <Card.Body style={{ textAlign: 'left' }}>

                                        <Card.Title>
                                            <Row>
                                                <Col xs={3}>
                                                    Technology :
                                                </Col>
                                                <Col xs={9}>
                                                    {getTechnologyName(answer.technology)}
                                                </Col>
                                            </Row>
                                        </Card.Title>

                                        <Card.Subtitle className="mb-2 text-muted">
                                            <Row>
                                                <Col xs={3}>
                                                    Error Type :
                                                </Col>
                                                <Col xs={9}>
                                                    {getErrorTypeName(answer.errorType)}
                                                </Col>
                                            </Row>
                                        </Card.Subtitle>

                                        <Card.Text>
                                            <Row>
                                                <Col xs={3}>
                                                    Description :
                                                </Col>
                                                <Col xs={9}>
                                                    {answer.description}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={3}>
                                                    Solution Steps :
                                                </Col>
                                                <Col xs={9}>
                                                    {answer.solnSteps}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={3}>
                                                    Books :
                                                </Col>
                                                <Col xs={9}>
                                                    {answer.books}
                                                </Col>
                                            </Row>
                                        </Card.Text>

                                        <Row>
                                            <Col xs={2}>
                                                <Button variant="primary" onClick={() => handleVideoClick(answer)}>
                                                    Play Video
                                                </Button>
                                            </Col>
                                            <Col xs={1}>
                                                <a href={answer.links} target="_blank" rel="noopener noreferrer">
                                                    <Button variant="outline-primary">Link</Button>
                                                </a>
                                            </Col>
                                        </Row>

                                        {userData?._id &&
                                            <Row className="mt-3">
                                                <Col xs={2}>
                                                    <Button variant="link" onClick={() => handleLike(index)}>
                                                        <AiOutlineLike /> {likes[index]}
                                                    </Button>
                                                </Col>
                                                <Col xs={2}>
                                                    <Button variant="link" onClick={() => handleUnlike(index)}>
                                                        <AiOutlineDislike /> {unlikes[index]}
                                                    </Button>
                                                </Col>
                                                <Col xs={2}>
                                                    {commentInputsVisible[index] ? (
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Add a comment..."
                                                            value={comments[index]}
                                                            onChange={(e) => {
                                                                const updatedComments = [...comments];
                                                                updatedComments[index] = e.target.value;
                                                                setComments(updatedComments);
                                                            }}
                                                        />
                                                    ) : (
                                                        <Button variant="link" onClick={() => handleToggleCommentInput(index)}>
                                                            <AiOutlineComment /> {comments[index]?.length || 0}
                                                        </Button>
                                                    )}
                                                </Col>
                                            </Row>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

            <Modal show={showVideoModal} onHide={handleVideoModalClose} size="xl">
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
                                style={{ height: '500px', width: '100%' }}
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
}

export default CodeStack;
