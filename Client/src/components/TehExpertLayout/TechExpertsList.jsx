import React, { useEffect, useState } from 'react';
import { approveTechExpert, getTechExperts, rejectTechExpert } from '../../utils/api';
import { Col, Container, Row, Form, Button } from 'react-bootstrap'; // Correct import for Form

const TechExpertsList = () => {
    const [techExperts, setTechExperts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        fetchTechExperts();
    }, []);

    const fetchTechExperts = async () => {
        try {
            const response = await getTechExperts();
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    // const sortedErrorTypes = data.sort((a, b) => a.techExpert.localeCompare(b.techExpert));
                    setTechExperts(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setTechExperts([]); // Set techExperts to empty array if response is not an array
                }
            } else {
                console.error('Failed to fetch techExperts');
            }
        } catch (error) {
            console.error('Error fetching techExperts:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTechExperts = techExperts.filter((techExpert) =>
        techExpert.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApprove = async (techExpert) => {
        try {
            const response = await approveTechExpert(techExpert._id);
            if (response.ok) {
                alert("Tech Expert Approved");
                fetchTechExperts();
            } else {
                console.error('Failed to Approve Tech Expert');
            }
        } catch (error) {
            console.error('Error deleting techExpert:', error);
        }
    };

    const handleReject = async (techExpert) => {
        try {
            const response = await rejectTechExpert(techExpert._id);
            if (response.ok) {
                alert("Tech Expert Rejected");
                fetchTechExperts();
            } else {
                console.error('Failed to reject Tech Expert');
            }
        } catch (error) {
            console.error('Error deleting techExpert:', error);
        }
    };

    return (
        <div>
            <Container className='container-1'>
                <div className="list-container-1 scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">Tech Experts</h2>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="search">
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Name"
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
                            Name
                        </Col>
                        <Col xs={12} sm={3} className="text-center">
                            Email
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                            Qualification
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                            Experience
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                            Actions
                        </Col>
                    </Row>

                    {filteredTechExperts.map((techExpert, index) => (
                        <Row key={index} className="table-row" onMouseEnter={(e) => e.currentTarget.classList.add('hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}>
                            <Col xs={12} sm={1} className="text-center">
                                {index + 1}
                            </Col>
                            <Col xs={12} sm={2} className="text-center">
                                {techExpert.firstName}
                            </Col>
                            <Col xs={12} sm={3} className="text-center">
                                {techExpert.email}
                            </Col>
                            <Col xs={12} sm={2} className="text-center">
                                {techExpert.qualification}
                            </Col>
                            <Col xs={12} sm={2} className="text-center">
                                {techExpert.experiance}
                            </Col>
                            <Col xs={6} sm={2} className="text-center">
                                {
                                    techExpert.approved == false &&
                                    (<Button variant="success" type="button" className="mt-2 signup-button" onClick={() => handleApprove(techExpert)}>
                                        Approve
                                    </Button>)
                                }

                                {
                                    techExpert.approved == true &&
                                    (
                                        <Button variant="danger" type="button" className="mt-2 signup-button" onClick={() => handleReject(techExpert)}>
                                            Reject
                                        </Button>
                                    )
                                }
                            </Col>
                        </Row>
                    ))}
                </div>

            </Container>
        </div>
    );
};

export default TechExpertsList;
