import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import loginimg from '../assets/login.svg'
import styles from '../styles/login.module.css'
import { color } from 'chart.js/helpers';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError,setIsError] = useState({
        status: false,
        message: ''
    });
    const [isSuccess,setIsSuccess] = useState({
        status: false,
        message: ''
    });

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/auth/login', {
            username,
            password,
        }) .then(response =>{
            if(response.status === 200 || response.status === 201){
                setIsSuccess({
                    status: true,
                    message: response.data?.message
                })
                setTimeout(()=>{
                    setIsSuccess({status: false, message: ''});
                    navigate('/dashboard')
                },3000)
            }
        }).catch(error=>{
            setIsError({
                status: true,
                message: error.response?.data?.message
            })

            setTimeout(()=>{
                setIsError({status: false, message: ''});
            },3000)
        })
    };
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {isError.status && <h3 className='text-red-500 mt-3'>{isError.message}</h3>}
                    {isSuccess.status && <h3 className='text-green-500 mt-3'>{isSuccess.message}</h3>}
                    <div className={styles.inputBox}>
                        <FaUser className={styles.icon} />
                        <input type='text' value={username} className={styles.input_field} placeholder='Username' required
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <FaLock className={styles.icon} />
                        <input type='password' value={password} className={styles.input_field} placeholder='Password' required 
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className={styles.rememberForgot}>
                        <label><input type="checkbox" className={styles.checkinput} />Remember me</label>
                        <Link to="/forgotPassword">Forgot Password?</Link>
                    </div>

                    <button type='submit'>Login</button>

                    <div className={styles.registerLink}>
                        <p>Don't have an account ? {' '} <Link to="/signup">Register here</Link></p>
                    </div>
                </form>
            </div>
            <div className={styles.image}>
                <img src={loginimg} />
            </div>

        </div>
    )
}

export default Login;