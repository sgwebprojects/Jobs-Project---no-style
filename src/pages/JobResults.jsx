import React, { useEffect, useRef, useState } from 'react'
import "../styles/jobResults.css"
import { applyIcon, searchIcon } from '../assets'
import NavBar from "../components/NavBar";
import { useParams } from 'react-router-dom';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { database } from '../firebaseConfig';

async function searchJobs(searchTerm) {

  try {
    const postingJobsSubcollection = await getDocs(collectionGroup(database, "postingJobs"));
    if (searchTerm === '*') {
      const fetchedPostingJobsData = postingJobsSubcollection.docs.map(
        (doc) => doc.data())
        .filter((job) => job.isJobActive);
      return fetchedPostingJobsData;
    }
    else {
      const filteredJobs = postingJobsSubcollection.docs.filter(doc => {
        const jobData = doc.data();
        const normalizedJobTitle = jobData?.jobTitle?.toLowerCase()||"";
        const normalizedJobDescription = jobData?.jobDescription?.toLowerCase()||"";
        const normalizedSearchTerm = searchTerm?.toLowerCase()||"";

        const jobTitleMatch = normalizedJobTitle.includes(normalizedSearchTerm);
        const jobDescriptionMatch = normalizedJobDescription.includes(normalizedSearchTerm);

        return (
          (jobTitleMatch || jobDescriptionMatch) &&
          jobData.isJobActive
        )

      });

      const fetchedPostingJobsData = filteredJobs.map(doc => doc.data());
      return fetchedPostingJobsData;
    }
  } catch (error) {
    console.error("Error retrieving jobs", error);
    return {}
  }
}

const Card = ({ job, i }) => (
  <div className='recent_job_card' key={i}>
    <div className='recent_job_box_1'>
      <h3>{job.title}</h3>
      {/* <div className='recent_job_menu'>
              <img src={optionsIcon} alt='' className='recent_job_menu_icon' />
          </div> */}
    </div>
    <div className='recent_job_company'>
      <h4>{job.companyName}</h4>
      <h6>{job.location}</h6>
    </div>
    <div className='recent_job_box_2'>
      <div className='recent_job_box_btn_1'>{job.jobType}</div>
      <div className='recent_job_box_btn_1'>{job.jobTime}</div>
    </div>
    <div className='recent_job_desc'>{job.description}</div>
    {/* <button className='recent_job_apply'>Apply</button> */}
  </div>
)
const jobObj = {
  title: "Accounts Payable Officer",
  companyName: "Esco inc .",
  location: "New York, NY",
  jobType: "Full Time",
  jobTime: "9am - 5pm EST",
  description: "This role is open to recent University graduates and applicants with less than 5 years of prior experience in a quantitative trading role, for commencement in Austinmer. Our graduate program offers a high l....."
}

export default function JobResults() {

  const [recentJobs, setJobs] = useState(new Array(6).fill(jobObj))
  const [timeZone, setTimeZone] = useState("ist");
  const params = useParams();
  const searchTerm = useRef();

  useEffect(() => { searchTerm.current.value = params.searchTerm || "" }, [])
  async function fetchJobs() {
    try {
      const fetchedJobs = await searchJobs(searchTerm.current.value || params.searchTerm || "");
      setJobs(fetchedJobs)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <NavBar />

      <div className='job_results'>
        <div className='searchbox'>
          <img src={searchIcon} />
          <input placeholder='Search' ref={searchTerm} onChange={fetchJobs}></input>
          <button className='signin' onClick={fetchJobs}>Search</button>
        </div>
        <div>
          <div className='letssupport'>Show me job times in</div>
          <div className='job_result_zone'>
            <div className='job_result_zone_est' style={{ borderBottomColor: timeZone == "ist" ? "#DADDE0" : "#2557A7" }} onClick={() => setTimeZone("est")}>Eastern Standard Time (EST)</div>
            <div className='job_result_zone_ist' style={{ borderBottomColor: timeZone == "est" ? "#DADDE0" : "#2557A7" }} onClick={() => setTimeZone("ist")}>Israel Standard Time (IST)</div>
          </div>
        </div>
        <div className='job_result_box'>
          <div className='recent_job_list'>
            {recentJobs.map((job, i) => (<Card job={job} i={i} key={i} />))}
          </div>
          <div className='job_result_cnt'>
            <h4>Part Time - Dedicated Account Rep</h4>
            <button className='job_result_btn'>Apply <img src={applyIcon} alt="" /></button>
            <h5>Job type</h5>
            <div className='job_result_tags'>
              <div>Full Time</div>
              <div>9am-5pm EST</div>
            </div>
            <h5>Job description</h5>
            <div dangerouslySetInnerHTML={{
              __html: `This role is open to recent University graduates and applicants with less than 5 years of prior experience in a quantitative trading role, for commencement in Austinmer, NSW, Australia.

Vacancies are open for September 2023 or March 2024 for domestic candidates (based in Australia) and September 2023 or March 2024 for international candidates (due to lengthy visa processing times).
Tibra will sponsor the relevant visa, provide flights and some relocation assistance for international candidates.

At Tibra our graduates get exposure to the development of real world trading systems and the associated quantitative finance methods in one of the most challenging environments: proprietary trading in Financial markets.

Our graduate program offers candidates a unique opportunity to experience first hand the development of cutting edge proprietary trading systems, while being trained by Tibra's best quants and developers. This program balances fundamental development and financial market theory with on-the-job training and mentoring. You will contribute to the evolution of the Tibra's trading strategies, while building the software development skills and market insights needed for your success as a career quant.

Experience required:
Degree in Mathematics, Computer Science, Engineering or related subject
Development experience – preferably C++ and/or Python
Experience in data analysis a bonus but not essential

Please include:
Resume (include past/expected University graduation dates)
University academic transcript including current WAM/GPA (can be noted on resume)
Residency status (can be noted on resume)


Job Type: Full-time

Hours of work (EST): 9:00AM-5:00PM

Hours of work (IST): 4:00PM-12:00AM 

Pay: $165,000.00 - $190,000.00 per year
`.replace(/\n/g, '<br/>')
            }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
