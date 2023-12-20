import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/singin.css";
import {Form} from "react-bootstrap";
import React from "react";
import {faceBookIcon, facebookIcon, googleIcon} from "../assets";
import {Link} from "react-router-dom";

export const SignIn = () => {
    return (
        <div>
            <NavBar/>
            <div className='job_portal_signin'>
                <div className='signin_box'>
                    <div className='signin_box_head'>
                        <h2 className=''>Sign In as</h2>
                        <div className='signin_method'>
                            <div className='employee_radiio'>
                                <input type="radio" id='employee' defaultChecked={true} name='employ'/>
                                <label htmlFor="employee">Employee</label>
                            </div>
                            <div className='employee_radiio'>
                                <input type="radio" id='employer' name='employ'/>
                                <label htmlFor="employer">Employer</label>
                            </div>
                        </div>
                    </div>
                    <div className='sinin_form_field'>
                        <div className='job_apply_field'>
                            <label htmlFor='email' className='job_form_field'>Email or phone number</label>
                            <input type='text' className='job_form_input' placeholder='Email or phone number'
                                   onChange={(e) => {
                                   }} required/>
                        </div>
                        <div className='job_apply_field'>
                            <label htmlFor='email' className='job_form_field'>Password</label>
                            <input type='text' placeholder='Password' className='job_form_input' onChange={(e) => {
                            }} required/>
                        </div>
                        <Link to='/signup' className='forgot_password'>Forget Password?</Link>
                        <div className='signin'>Sign In</div>
                        <div className='d-flex flex-column align-items-center gap-2'>
                            <h2 className='signin_desc'>OR</h2>
                            <h2 className='signin_desc'>Sign In with </h2>
                        </div>
                        <div className='signin_icons'>
                            <img src={googleIcon} alt=""/>
                            <img src={faceBookIcon} alt=""/>
                        </div>
                        <div className='singup_link'>
                            Don’t have an account? <Link to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}