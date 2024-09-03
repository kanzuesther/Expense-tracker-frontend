import React from 'react'
import { MdEmail } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/signup.module.css'
import "../App.css";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const {token} =useParams()


    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/auth/reset-password'+token, {
            password,
        }).then(response => {
            if (response.data.status) {
                navigate('/login')
            }
            console.log(response.data)
        }).catch(err => {
            console.log(error)
        })
    };

    return (
        <div className={styles.signup_main}>
            <div className={styles.container_signup}>
                <form onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>

                    <label htmlFor='password'> New Password:</label>
                    <FaLock className={styles.icon} />
                    <input type='password' className={styles.input_field} placeholder='Password' required
                        onChange={(e) => setPassword(e.target.value)} />

            <button type='submit'>Send</button>
        </form>
            </div >
        </div >
    )
}

export default ResetPassword
