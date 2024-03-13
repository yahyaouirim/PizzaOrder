import React, {useEffect, useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import {Col,Row} from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const UpdateUser = (props) => {
    const idLocal = window.localStorage.getItem("userId");
    const { user, setUser } = useContext(UserContext) || {};
    // const numOrder = window.localStorage.getItem("numOrder");
    const shadow = { boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }
    const navigate = useNavigate();
    const [errors, setErrors] = useState({}); // Change to an empty object

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${idLocal}`, { withCredentials: true })
            .then(res => {
                console.log("You are logged in");
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [idLocal, setUser])
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/updateUser/${idLocal}`,user, { withCredentials: true })

            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.response);
                // if(err.res.data) setErrors(err.res.data)
                const errorMessages = err.response?.data?.errors || {};
                setErrors(errorMessages);
                // else if(err.res.data.error) setErrors(err.res.data.error.errors)

            })
    }
    return (
        <div >
            <h1>Account Info</h1>
            <Row>
                <Col className='me-3'>
                    <form className=' text-primary  mx-auto mt-5 rounded-3 p-4 gap-3' style={shadow} onSubmit={submitHandler}>

                        <Row>
                            <Col sm={12}>
                                <label htmlFor='firstName'>First Name: </label>
                                <input type="text" className=' mx-auto form-control '  value={user.firstName} onChange={handleChange} name='firstName' />
                                {
                                    errors.firstName ?
                                        <p className='text-danger'>{errors.firstName.message}</p>
                                        : null
                                }
                            </Col>
                            <Col sm={12}>
                                <label htmlFor='lastName'>Last Name: </label>
                                <input type="text" className=' mx-auto form-control'  value={user.lastName} onChange={handleChange} name='lastName' />
                                {
                                    errors.lastName ?
                                        <p className='text-danger'>{errors.lastName.message}</p>
                                        : null
                                }
                            </Col>

                        </Row>
                        <Row>
                            <Col sm={12}>
                                <label htmlFor='email'>Email: </label>
                                <input type="text" className=' mx-auto form-control' value={user.email} onChange={handleChange}  name='email' />
                                {
                                    errors.email ?
                                        <p className='text-danger'>{errors.email.message}</p>
                                        : null
                                }
                            </Col>
                            <Col sm={12}>
                                <label htmlFor='address'>Address: </label>
                                <input type="text" className='form-control' value={user.address} onChange={handleChange}  name='address' />
                                {
                                    errors.address ?
                                        <p className='text-danger'>{errors.address.message}</p>
                                        : null
                                }

                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <label htmlFor='city'>City: </label>
                                <input type="text" className=' form-control' value={user.city} onChange={handleChange}  name='city' />
                                {
                                    errors.city ?
                                        <p className='text-danger'>{errors.city.message}</p>
                                        : null
                                }
                            </Col>
                            <Col sm={12}>
                                <label htmlFor='state'>State: </label>
                                <select name='state' className='form-select' value={user.state}  onChange={handleChange} aria-label="Default select example">
                                    <option value="one">State 1</option>
                                    <option value="two">State2</option>
                                    <option value="three">State3</option>
                                </select>

                                {
                                    errors.state ?
                                        <p className='text-danger'>{errors.state.message}</p>
                                        : null
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col><button className=' col-12 mx-auto btn btn-outline-primary mt-2'>Update</button></Col>
                        </Row>
                    </form>
                </Col>
            </Row>


        </div>
    )
}

export default UpdateUser;
