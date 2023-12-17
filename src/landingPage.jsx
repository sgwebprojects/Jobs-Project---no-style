import React from 'react'
import { Container } from 'react-bootstrap';
import { SearchBox } from './searchBox'
import { Navbar } from './navbar'
import { RecentlyPostedJobs } from './recentlyPostedJobs';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';

function LandingPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/jobsList/*');
  };
  return <Home/>
  return (
    <>
      <Navbar />
      <Container>
        <div>
          <h1>Let’s support each other.</h1>
          <p>Be a part of the collaboration between<br />Ahcheinu Bnei Yisrael In Ertez Yisrael and the diaspora</p>
        </div>
        <br />
        <SearchBox></SearchBox>

      </Container>

      <Container>
        <h4>Recently Posted Jobs</h4>
        <RecentlyPostedJobs />
      </Container>

      <Container>
        <div>
          <div>
            {/* no image  src={}*/}
            <img  alt="Image description"></img>
          </div>

          <div>
            <h2>Looking for Work? Acheinu Bnei Yisrael in Chutz La’aretz are looking to hire.</h2>
            <button onClick={handleClick}>View available oppurtunities</button>
          </div>
        </div>
      </Container>
      <br />
      <Container>
        <h2>Employer? <br />How can we help with your hiring needs</h2>
        <button>View available oppurtunities</button>

      </Container>
      <br />
      <footer>

        <div>
          <div>
            <div>
              <div><h5><span> <i aria-hidden="true"></i></span><b>  Stride</b></h5></div>
              <div><ul ><li>Platform</li><li>Help Center</li><li>Security</li></ul></div>
              <div><ul ><li>Customers</li><li>Use Cases</li><li>Customers Services</li></ul></div>
              <div><ul ><li>Company</li><li>About</li><li>Careers- <span>We're-hiring</span></li></ul></div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div><small>&#9400; Stride Softwere</small></div><div></div><div></div>
              <div> <small> hello@getstride.com <span><img src="https://i.imgur.com/TtB6MDc.png" width="25" /></span> <span><img src="https://i.imgur.com/N90KDYM.png" width="25" /></span></small>  </div>
            </div>
          </div>
        </div>
      </footer >


    </>
  )
}

export default LandingPage
