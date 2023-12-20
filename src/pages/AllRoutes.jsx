import React from 'react'
import { Route, Routes } from 'react-router-dom';
import "../styles/index.css";
import { PostJobForm } from './postJobForm';
import { JobApplyForm } from './jobApplyForm';
import LandingPage from '../landingPage';
import JobResults from './JobResults';
import JobsList from '../jobsList';
import DashBoard from './DashBoard';
import UserDashBoard from "./UserDashBoard";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/post' element={<PostJobForm />} />
            <Route path='/signin' element={<SignIn   />} />
            <Route path='/signup' element={<SignUp   />} />
            <Route path='/apply' element={<JobApplyForm />} />
            <Route path='/apply/edit' element={<JobApplyForm />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/results' element={<JobResults />} />
            <Route path='jobsList/:searchTerm' element={<JobResults />} />
            <Route path='dashboard/' element={<DashBoard />} />
            <Route path='dashboard/user' element={<UserDashBoard />} />
            <Route path='dashboard/user/:tab' element={<UserDashBoard />} />
            <Route path='dashboard/:tab' element={<DashBoard />} />
        </Routes>
    )
}
