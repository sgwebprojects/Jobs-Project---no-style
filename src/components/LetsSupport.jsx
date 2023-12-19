import React, { useRef } from 'react'
import '../styles/letssupport.css'
import { searchIcon } from '../assets'
import { useNavigate } from 'react-router-dom';

const LetsSupport = () => {

  const navigate = useNavigate()
  const searchTerm = useRef();

  const handleSearch = async () => {
    navigate(`/jobsList/${searchTerm.current.value}`);
  };

  return (
    <div className='supportbox'>
      <div className='letssupport'>Let’s support each other.</div>
      <div className='beaprt'>Be a part of the collaboration betweenAhcheinu Bnei Yisrael In Ertez Yisrael and the diaspora</div>
      <div className='searchbox'>
        <img src={searchIcon} />
        <input placeholder='Search' onKeyDown={({ key }) => key == "Enter" && handleSearch()} ref={searchTerm}></input>
        <button className='signin' onClick={handleSearch}>Search</button>
      </div>
    </div >
  )
}

export default LetsSupport