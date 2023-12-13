import React from 'react'

export function Navbar() {
  return (
    <nav>
      <div>
        <div>
          <img src="logo.png" alt="Logo" width="30" height="30" />
        </div>

        <ul>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Submit Resume</a>
          </li>
          <li>
            <button type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Language
            </button>
            <div aria-labelledby="languageDropdown" >
              <a href="#">English</a>
              <a href="#">Hebrew</a>
            </div>
          </li>
          <li>
            <button>Sign In</button>
          </li>


        </ul>
      </div>
    </nav>
  )
}
