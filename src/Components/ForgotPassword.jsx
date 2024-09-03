import React from 'react'
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/signup.module.css'
import "../App.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');


    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/auth/forgot-password', {
            email,
        }).then(response => {
            if (response.data.status) {
                alert("check your email for reset password link")
                navigate('/login')
            }
        }).catch(err => {
            console.log(error)
        })
    };

    return (
        <div className={styles.signup_main}>
            <div className={styles.container_signup}>
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>

                    <label htmlFor='email'>Email:</label>
                    <MdEmail className={styles.icon} />
                    <input type='email' autoComplete='off' className={styles.input_field} placeholder='Email' required
                        onChange={(e) => setEmail(e.target.value)} />

                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
