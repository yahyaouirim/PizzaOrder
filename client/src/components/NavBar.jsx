 
import React, { useContext , useEffect} from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
    const navigate = useNavigate();
    const { user,setUser } = useContext(UserContext) || {};
    const idLocal = window.localStorage.getItem('userId');
        //get logged user
        useEffect(() => {
            axios.get(`http://localhost:8000/api/user/${idLocal}`, user, { withCredentials: true })
                .then((res) => {
                    console.log("You are logged in");
                })
                .catch((err) => {
                    console.log(err);
                })
        }, [idLocal, setUser])
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then(() => {
                window.localStorage.removeItem('userId');
                navigate('/');
            })
            .catch((err) => {
                console.error('Error during logout:', err);
            });
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home"><h1>PIZZA Dragon</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end gap-5 text-white" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/home">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={`/pizza/allOrders/${idLocal}`}>Order({user.numOrder})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={`/user/account/${idLocal}`}>Account</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3" onClick={logout}>
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
