import React from 'react'
import { Route, Routes } from 'react-router-dom';
import "../styles/index.css";
import { PostJobForm } from './postJobForm';
import { JobApplyForm } from './jobApplyForm';
import LandingPage from '../landingPage';
import JobResults from './JobResults';
import JobsList from '../jobsList';
import DashBoard from './DashBoard';
export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/post' element={<PostJobForm />} />
            <Route path='/apply' element={<JobApplyForm />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/results' element={<JobResults />} />
            <Route path='jobsList/:searchTerm' element={<JobResults />} />
            <Route path='dashboard/:tab' element={<DashBoard />} />
        </Routes>
    )
}
