import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Form, Col, Row, Card } from 'react-bootstrap';
import NavBar from './NavBar'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
const FavoritePizza = () => {
    const { user, setUser } = useContext(UserContext) || {};
    const navigate = useNavigate();
    const idLocal = window.localStorage.getItem("userId");
    const shadow = { boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }
    const [method, setMethod] = useState("");
    const [size, setSize] = useState("");
    const [crust, setCrust] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [toppings, setToppings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [errors, setErrors] = useState({});
    // Add a state variable to store the selected pizza order
    const [orderId, setOrderId] = useState("");
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
    // display all favorite orders
    useEffect(() => {
        axios.get(`http://localhost:8000/api/allpizzas/${idLocal}`, { withCredentials: true })
            .then((res) => {
                const filtred = res.data;
                setOrders(filtred.filter((order) => order.isFavorite === true));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    // add toppings
    const addTopping = (e, topping) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            // Ajoute le topping s'il n'est pas déjà présent
            setToppings((prevToppings) => [...prevToppings, topping]);
        } else {
            // Retire le topping s'il est déjà présent
            setToppings((prevToppings) =>
                prevToppings.filter((selectedTopping) => selectedTopping !== topping)
            );
        }
    }
    //get Favorite 
    const getFavorite = (e,orderId) => {
        e.preventDefault();
        setOrderId(orderId);
        axios.get(`http://localhost:8000/api/onepizza/${orderId}`, { withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                        setMethod(res.data.method);
                        setCrust(res.data.crust);
                        setSize(res.data.size);
                        setQuantity(res.data.quantity);
                        setToppings(res.data.toppings);
                    })
                    .catch((err) => { console.log(err); })
            }
    // submithandler
    const submitHandler = (e) => {
        e.preventDefault();
            axios.patch(`http://localhost:8000/api/updatepizza/${orderId}`, {
                method: method,
                size: size,
                crust: crust,
                quantity: quantity,
                toppings: toppings,
                userOwner: idLocal,
                isPurchased :false
            }, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    setMethod("");
                    setSize("");
                    setCrust("");
                    setErrors({});
                    setQuantity(0);
                    setToppings([]);
                    axios.patch(`http://localhost:8000/api/updateuser/${idLocal}`, {numOrder: user.numOrder+1}, {withCredentials :true})
                        .then((res) => {
                            console.log(res.data);
                            setUser(res.data);
                            navigate('/pizza/allOrders/${idLocal}');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err.response.data);
                    if (!toppings || toppings.length === 0) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            toppings: "Toppings must choose at least one topping"
                        }));
                        return; 
                    }
                    const errorMessages = err.response?.data?.errors || {};
                    setErrors(errorMessages);
                });
    }

    return (
        <Container >
            <NavBar />
            <Row>
                <Col md={6}>
                    <form className=' text-primary  mx-auto mt-5 mb-3 rounded-3 p-4 gap-3' style={shadow} onSubmit={submitHandler}>
                        <Row>
                            <Col sm={12} md={12}>
                                <label htmlFor='method'>Method: </label>
                                <select name='method' className='form-select' onChange={(e) => { setMethod(e.target.value) }} value={method} aria-label="choose">
                                    <option value="choose">choose</option>
                                    <option value="CarryOut">Carry Out</option>
                                    <option value="Delivery">Delivery</option>
                                </select>
                                {
                                    errors.method ?
                                        <p className='text-danger'>{errors.method.message}</p>
                                        : null
                                } 
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={4}>
                                <label htmlFor='size'>Size: </label>
                                <select name='size' className='form-select' onChange={(e) => { setSize(e.target.value) }} value={size} aria-label="choose">
                                    <option value="choose">choose</option>
                                    <option value="Small">Small</option>
                                    <option value="Meduim">Meduim</option>
                                    <option value="Large">Large</option>

                                </select>
                                {
                                    errors.size ?
                                        <p className='text-danger'>{errors.size.message}</p>
                                        : null
                                } 
                            </Col>
                            <Col sm={12} md={4}>
                                <label htmlFor='crust'>Crust: </label>
                                <select name='crust' className='form-select' onChange={(e) => { setCrust(e.target.value) }} value={crust} aria-label="choose">
                                    <option value="choose">choose</option>
                                    <option value="ThinCrust">ThinCrust</option>
                                    <option value="Regular">Regular</option>
                                    <option value="ThickCrust">ThickCrust</option>
                                </select>
                                {
                                    errors.crust ?
                                        <p className='text-danger'>{errors.crust.message}</p>
                                        : null
                                } 
                            </Col>
                            <Col sm={12} md={4}>
                                <label htmlFor='quantity'>Qty: </label>
                                <input type=" number" name='quantity' className='form-select' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} />
                              
                            </Col>
                        </Row>
                        <Row>
                            <label htmlFor='toppings' className='mt-3 mb-3'>Toppings: </label>
                            {
                                    errors.toppings ?
                                        <p className='text-danger'>{errors.toppings}</p>
                                        : null
                                } 
                            <Col sm={12} md={6}>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Pepperoni")}
                                        onChange={(e) => addTopping(e, "Pepperoni")}
                                    />
                                    <label className="form-check-label" htmlFor="Pepperoni">
                                        Pepperoni
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Chiken")}
                                        onChange={(e) => addTopping(e, "Chiken")}
                                    />
                                    <label className="form-check-label" htmlFor="Chiken">
                                        Chiken
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Pineapple")}
                                        onChange={(e) => addTopping(e, "Pineapple")}
                                    />
                                    <label className="form-check-label" htmlFor="Pineapple">
                                        Pineapple
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Extracheese")}
                                        onChange={(e) => addTopping(e, "Extracheese")}
                                    />
                                    <label className="form-check-label" htmlFor="Extracheese">
                                        Extracheese
                                    </label>
                                </Row>
                            </Col>
                            <Col sm={12} md={6}>
                                <Row md={6} >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Olives")}
                                        onChange={(e) => addTopping(e, "Olives")}
                                    />
                                    <label className="form-check-label" htmlFor="Olives">
                                        Olives
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Sausage")}
                                        onChange={(e) => addTopping(e, "Sausage")}
                                    />
                                    <label className="form-check-label" htmlFor="Sausage">
                                        Sausage
                                    </label>
                                </Row>
                                <Row md={6} >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Mushrooms")}
                                        onChange={(e) => addTopping(e, "Mushrooms")}
                                    />
                                    <label className="form-check-label" htmlFor="Mushrooms">
                                        Mushrooms
                                    </label>
                                </Row>
                                <Row md={6} >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Onions")}
                                        onChange={(e) => addTopping(e, "Onions")}
                                    />
                                    <label className="form-check-label" htmlFor="Onions">
                                        Onions
                                    </label>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col><button className=' col-12 mx-auto btn btn-outline-primary mt-2'>Add To Order</button></Col>
                        </Row>
                    </form>

                </Col>
                <Col md={6}>
                    <h1>Favorites Orders</h1>
                    {
                        orders.map((ord) => (
                            <Row key={ord._id}>
                                <Col md={12} className='g-3 mb-3'>
                                    <Card onClick={(e) => {getFavorite(e,ord._id) }} bg="dark" text="white" border="primary">
                                        <Card.Body>
                                            <Card.Text> {ord.method}, {ord.quantity}, {ord.size} </Card.Text>
                                            <Card.Text>{ord.toppings}</Card.Text>
                                            <Card.Text> {ord.crust} </Card.Text>
                                            <Card.Text className="me-auto">PRICE: {ord.Pricetax}</Card.Text>
                                            <Form>
                                                <Form.Check
                                                    inline
                                                    label="Favorite"
                                                    type='checkbox'
                                                    checked={ord.isFavorite}
                                                    defaultChecked
                                                    // onChange={() => handleFavoriteChange(ord._id)}
                                                />
                                            </Form>                                                    <hr></hr>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>))
                    }


                </Col>
            </Row>


        </Container>
    )
}

export default FavoritePizza