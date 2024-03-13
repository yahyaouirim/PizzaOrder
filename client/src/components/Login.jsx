import React, {useContext,useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { UserContext } from '../context/UserContext';


const Login = () => {
    // const [user, setUser] = useContext(UserContext);
    const { user, setUser } = useContext(UserContext) || {};
    // const numOrder = window.localStorage.getItem("numOrder");

    const idLocal = window.localStorage.getItem("userId");
    const [errors, setErrors] = useState([{}]);
    const navigate = useNavigate();
    // const [email, setEmail]=useState('');
    // const [password, setPassword]= useState('');
//    cookies
// const [cookies] = useCookies(['userToken']);
//     useEffect(() => {
//         if (cookies.userToken) {
//             navigate("/");
//         }
//     }, [cookies, navigate]);
const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
};
  //get logged user
//   useEffect(()=>{
//     axios.get(`http://localhost:8000/api/user/${idLocal}`,user, {withCredentials:true})
//     .then((res) =>{
//         // window.localStorage.getItem("userId");

//         // setUser(res.data);
//         console.log( "ID of logged ",res.data._id);

//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// },[])

    const loginHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', user,{withCredentials:true})

            .then((res) => {
                window.localStorage.setItem("userId",res.data._id);
                // window.localStorage.setItem("numOrder",res.data.numOrder);

                setUser(res.data);
                console.log("this is res,data",res.data);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
                console.log("*************************************");
                console.log(err.response.data);
                setErrors(err.response.data);
            })
    }
    return (
        <div>
            
            <form onSubmit={loginHandler}  style={{boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}  className='col-4 mx-auto mt-5 p-4 rounded-5 user-form text-primary'>
                {
                    errors.message ?
                        <p className='text-danger'>{errors.message}</p>
                        : null
                }
                <label htmlFor='email' className='form-label'>Email:</label>
                <input className='form-control' type="text" name='email' value={user.email} onChange={ handleChange} />

                <label htmlFor='password' className='form-label'>Password:</label>
                <input className='form-control' type="password" name='password' value={user.password} onChange={ handleChange} />

                <button className='btn btn-outline-primary col-12 mt-3 mb-3'>Login</button>
                <br />
                <Link className=' ' to={'/'}>Dont have an account? click here to sign up</Link>
            </form>
        </div>
)}

export default Login;