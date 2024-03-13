import NavBar from './NavBar';
import { Col, Row, Card, Form } from 'react-bootstrap';
import UpdateUser from './UpdateUser';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Account = () => {
    const { user, setUser } = useContext(UserContext) || {};
    const idLocal = window.localStorage.getItem("userId");
    // const numOrder = window.localStorage.getItem("numOrder");
    const shadow = { boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleString(undefined, options);
        return formattedDate;
    }
    
    //get logged user
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${idLocal}`, user, { withCredentials: true })
            .then((res) => {
                console.log("You are logged in");
            })
            .catch((err) => {
                console.log(err);
            })
    }, [idLocal])

    //display Orders
    useEffect(() => {
        axios.get(`http://localhost:8000/api/allpizzas/${idLocal}`, { withCredentials: true })
            .then((res) => {
                const filtred = res.data;
                setOrders(filtred.filter((order) => order.isPurchased === true));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    //handel change favorite
    const handleFavoriteChange = (orderId) => {
        const updatedOrders = orders.map((ord) => {
            if (ord._id === orderId) {
                // Toggle the isFavorite property
                ord.isFavorite = !ord.isFavorite;
                // Update the server with the new value
                axios.patch(`http://localhost:8000/api/updatepizza/${orderId}`, { isFavorite: ord.isFavorite }, { withCredentials: true })
                    .then((res) => {
                        console.log("Favorite updated successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            return ord;
        });
        setOrders(updatedOrders);
    };


    return (
        <container>
            <NavBar />
                <Row className='mx-auto'>
                    {/* update account user */}
                    <Col md={6}>
                        <UpdateUser />
                    </Col>
                    {/* last order purchased */}
                    <Col md={6} >
                        <h1>Last Orders</h1>
                        {
                            orders.map((ord) => (
                                <div>
                                    <Row>
                                        <Col md={12} className='mb-3'>
                                            <Card key={ord._id} text="primary"    style={shadow}  border="primary">
                                                <Card.Body>
                                                <Card.Text>{formatDate(ord.createdAt)}</Card.Text>
                                                    <Card.Text> {ord.method}, {ord.quantity},{ord.toppings} </Card.Text>
                                                    <Card.Text> {ord.size}</Card.Text>
                                                    <Card.Text>{ord.crust} </Card.Text>
                                                    <Card.Text className="me-auto">PRICE: {ord.Pricetax}</Card.Text>
                                                    <hr></hr>
                                                    <Form>
                                                        <Form.Check
                                                            inline
                                                            label="Favorite"
                                                            type='checkbox'
                                                            checked={ord.isFavorite}
                                                            onChange={() => handleFavoriteChange(ord._id)}
                                                        />
                                                    </Form>                                                    
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            )
                            )
                        }
                    </Col>
                </Row>
        </container>
    )
}

export default Account