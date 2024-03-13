import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Col, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
const DisplayAllOrders = () => {
    const [orders, setOrders] =useState([]);
    const { user, setUser } = useContext(UserContext) || {};
    const idLocal = window.localStorage.getItem("userId");
    // const numOrder = window.localStorage.getItem("numOrder");
    const navigate = useNavigate();
    const shadow = { boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" };    
    //display Orders
    useEffect(() => {
        axios.get(`http://localhost:8000/api/allpizzas/${idLocal}`,{ withCredentials: true })
            .then((res) => {
                const filtred= res.data;
                setOrders(filtred.filter((order) => order.isPurchased === false));
            })
            .catch((err) => {
                console.log(err);
            })
    },[])
// purchase
const purchase = (e, idp) => {
    e.preventDefault();
    axios.patch(`http://localhost:8000/api/updatepizza/${idp}`, { isPurchased: true }, { withCredentials: true })
      .then(() => {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== idp));
        axios.patch(`http://localhost:8000/api/updateUser/${idLocal}`, { numOrder: user.numOrder - 1 }, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const deleteOrder = (e, deleteId) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/deletepizza/${deleteId}`, { withCredentials: true })
      .then(res => {
        console.log("OK this Order has been Deleted ☠️", res.data)
        setOrders(prevOrders => prevOrders.filter(order => order._id === deleteId));
        axios.patch(`http://localhost:8000/api/updateUser/${idLocal}`, { numOrder: user.numOrder - 1 }, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          navigate('/home');
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
        navigate('/home');
      });
  }
  
  // ...
  
  return (
    <div>
        <NavBar />
        {
                orders.map((ord) =>(
                <div key={ord._id}>
                     <Row  xs={1} md={3}>
                        <Col  className='mx-auto p-2 mb-2'>
                            <Card  bg="dark" text="white" border="primary" style={shadow}>
                                <Card.Body>
                                    <Card.Title>Your Order</Card.Title>
                                    <Card.Text>  Method: {ord.method}</Card.Text>
                                    <Card.Text>Quantity:{ord.quantity}</Card.Text>
                                    <Card.Text>Size: {ord.size}</Card.Text>
                                    <Card.Text>Crust: {ord.crust} </Card.Text>
                                    <Card.Text>Toppings: {ord.toppings}</Card.Text>
                                    <Card.Text className="float-end">PRICE: {ord.totalPrice}</Card.Text>
                                    <hr></hr>
                                    <Card.Text >Tax : 19%</Card.Text>
                                    <hr></hr>
                                    <Card.Text className="float-end">TOTAL: {ord.Pricetax}</Card.Text>
                                </Card.Body>
                                <Card.Footer >
                                    <Button onClick={(e) =>{deleteOrder(e,ord._id)}} variant="outline-danger">START-OVER</Button>
                                    <Button onClick={(e)=>{ purchase(e,ord._id)}} variant="outline-primary">PURCHASE</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </div>        

            )

            )
        }
        
    </div>
  )
}

export default DisplayAllOrders;




//     // Delete Order
//     const deleteOrder = (e, deleteId) => {
//         e.preventDefault();
//         axios.delete(`http://localhost:8000/api/deletepizza/${deleteId}`)
//             .then(res => {
//                 console.log("OK this Order has been Deleted ☠️", res.data);
//                 setOrders(prevOrders => prevOrders.filter(order => order._id !== deleteId));
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };


