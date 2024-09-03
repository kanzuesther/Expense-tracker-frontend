import React, {useState} from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsCalendar, BsTelephoneFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { ImManWoman } from "react-icons/im";
import { CalendarContainer } from 'react-datepicker';
import loginimg from '../assets/login.svg'
import styles from '../styles/signup.module.css'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
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
        axios.post('http://localhost:5000/auth/signup', {
            username,
            password,
            email,
            gender,
            dob,
        }) .then(response =>{
            if(response.status === 200 || response.status === 201){
                setIsSuccess({
                    status: true,
                    message: response.data?.message
                })
                setTimeout(()=>{
                    setIsSuccess({status: false, message: ''});
                    navigate('/login')
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
        <div className={styles.signup_main}>
            <div className={styles.container_signup}>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    {isError.status && <h3 className='text-red-500 mt-3'>{isError.message}</h3>}
                    {isSuccess.status && <h3 className='text-green-500 mt-3'>{isSuccess.message}</h3>}
                    <div className={styles.inputBox}>
                        <FaUser className={styles.icon} />
                        <input type='text' className={styles.input_field} placeholder='Username' required
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <MdEmail className={styles.icon} />
                        <input type='email' className={styles.input_field} placeholder='Email' required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <BsCalendar className={styles.icon} />
                        <input type='date' className={styles.input_field} placeholder='Date of birth' required
                            onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <ImManWoman className={styles.icon} />
                        <input type='text' className={styles.input_field} placeholder='Gender' required
                            onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <FaLock className={styles.icon} />
                        <input type='password' className={styles.input_field} placeholder='Password' required
                            onChange={(e) => setPassword(e.target.value)} />
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