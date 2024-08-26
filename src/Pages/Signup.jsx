import React from 'react';
import '../styles/signup.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsCalendar, BsTelephoneFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { ImManWoman } from "react-icons/im";
import { CalendarContainer } from 'react-datepicker';
import { Link } from 'react-router-dom';

const Signup = () => {
    return(
      <div className='signup_main'>
        <div className='container_signup'>
            <form action="">
                <h1>Signup</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='email' placeholder='Email' required />
                    <MdEmail className='icon' />
                </div>
                <div className='input-box'>
                    <input type='dob' placeholder='Date of birth' required />
                    <BsCalendar className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Gender' required />
                    <ImManWoman className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required />
                    <FaLock className='icon' />
                </div>

                <button type='submit'>Register</button>

                <div className='register-link'>
                    <p>Already have an account?<Link to='/login'>Login here</Link></p>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Signup;