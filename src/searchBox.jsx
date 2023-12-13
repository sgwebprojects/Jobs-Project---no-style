import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function SearchBox() {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  const handleSearch = async () => {
    navigate(`/jobsList/${searchTerm}`);
  };

  return (
    <div>

      <div>

        <div>

          <div>
            <i></i>
            <input type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
          </div>

        </div>

      </div>
    </div>

  )
}