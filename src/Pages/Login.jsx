import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import loginimg from '../assets/login.svg'
import styles from '../styles/login.module.css'
import { color } from 'chart.js/helpers';

const Login = () => {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <form action="">
                    <h1>Login</h1>
                    <div className={styles.inputBox}>
                        <FaUser className={styles.icon} />
                        <input type='text' className={styles.input_field} placeholder='Username' required />
                    </div>
                    <div className={styles.inputBox}>
                        <FaLock className={styles.icon} />
                        <input type='password' className={styles.input_field} placeholder='Password' required />
                    </div>

                    <div className={styles.rememberForgot}>
                        <label><input type="checkbox" className={styles.checkinput} />Remember me</label>
                        <a href='#'>Forgot password?</a>
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