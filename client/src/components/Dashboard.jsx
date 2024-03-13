import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect} from 'react'
import NavBar from './NavBar';
import {Card,Col,Row,Button} from 'react-bootstrap';
import img1 from '../assets/images/pizza1.jpg';
import img2 from '../assets/images/pizza2.jpg';
import img3 from '../assets/images/pizza3.jpg';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Dashboard = (props) => {
    const { user, setUser } = useContext(UserContext) || {};
    const idLocal = window.localStorage.getItem("userId");
    // const numOrder = window.localStorage.getItem("numOrder");
        //get logged user
        // useEffect(() => {
        //     axios.get(`http://localhost:8000/api/user/${idLocal}`, user, { withCredentials: true })
        //         .then((res) => {
        //             console.log("You are logged in");
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })
        // }, [idLocal, setUser])

    const navigate= useNavigate();
    return (
        <div className='container mt-5 mb-3'>
            <NavBar />
            <div className='d-flex w-100 justify-content-between mt-5'>
                <Row xs={1} md={3} className="g-4">
                        <Col >
                            <Card bg="dark" text="white" border="primary">

                                <Card.Img variant="top" src={img1} style={{height:"300px"}} className='w-100 p-2'/>
                                <Card.Body>
                                    <Card.Title>New Pizza</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                    <Button onClick={()=> navigate("/user/craftPizza")} variant="outline-primary">NEW ORDER</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="dark" text="white" border="primary">
                                <Card.Img variant="top" style={{height:"300px"}} src={img2} className='w-100 p-2'/>
                                <Card.Body>
                                    <Card.Title>Favorite Pizza</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                    <Button onClick={() => navigate(`/pizza/favorite/${idLocal}`)} variant="outline-primary">RE-ORDER-MY-FAV</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="dark" text="white" border="primary">
                                <Card.Img variant="top" style={{height:"300px"}} src={img3} className='w-100 p-2'/>
                                <Card.Body>
                                    <Card.Title>Random Pizza</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                    <Button onClick={() =>navigate(`/pizza/random/${idLocal}`)} variant="outline-primary">SURPRISE ME</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                    
                </Row>


            </div>
        </div>
    );
};

export default Dashboard;
