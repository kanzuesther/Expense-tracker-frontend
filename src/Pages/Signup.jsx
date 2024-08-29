import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsCalendar, BsTelephoneFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { ImManWoman } from "react-icons/im";
import { CalendarContainer } from 'react-datepicker';
import loginimg from '../assets/login.svg'
import styles from '../styles/signup.module.css'
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className={styles.signup_main}>
            <div className={styles.container_signup}>
                <form action="">
                    <h1>Signup</h1>
                    <div className={styles.inputBox}>
                        <FaUser className={styles.icon} />
                        <input type='text' className={styles.input_field} placeholder='Username' required />
                    </div>
                    <div className={styles.inputBox}>
                        <MdEmail className={styles.icon} />
                        <input type='email' className={styles.input_field} placeholder='Email' required />
                    </div>
                    <div className={styles.inputBox}>
                        <BsCalendar className={styles.icon} />
                        <input type='date' className={styles.input_field} placeholder='Date of birth' required />
                    </div>
                    <div className={styles.inputBox}>
                        <ImManWoman className={styles.icon} />
                        <input type='text' className={styles.input_field} placeholder='Gender' required />
                    </div>
                    <div className={styles.inputBox}>
                        <FaLock className={styles.icon} />
                        <input type='password' className={styles.input_field} placeholder='Password' required />
                    </div>

                    <button type='submit'>Register</button>

                    <div className={styles.registerLink}>
                        <p>Already have an account ? {' '} <Link to='/login'>Login here</Link></p>
                    </div>
                </form>
            </div>
            <div className={styles.image}>
                <img src={loginimg} />
            </div>
        </div>
    )
}

export default Signup;