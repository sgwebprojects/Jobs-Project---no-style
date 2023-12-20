import {deleteIcon, editIcon} from "../../assets";
import {JobApplyForm} from "../../pages/jobApplyForm";
import {useState} from "react";
import {JobApplyFormEdit} from "../JobApplyFormEdit";

const profileDetailsInit = {
    name: "Ilias Miah",
    phone: "+1 732 924 3241",
    email: "iliasdemo@gmail.com",
    address: "Brooklyn, New York",
    work: "UI UX Designer",
    experience: "Fiverr/Upwork ",
    education: "Master’s degree CUNY school of medicine",
    skills: ["QuickBooks", "Microsoft Excel"],
    educationTime: "April 2015 to April 2019"
}
export const MyResume = () => {

    const [profileDetails, setProfileDetails] = useState(profileDetailsInit);
    const [page, setPage] = useState(-1)

    return (
        <div className='my_resume'>
            {page < 0 ? (<div className='my_resume_box'>
                <div className='resume_prof_details'>
                    <div className='resume_prof_edit_head'>
                        <div className="my_resume_name">{profileDetails.name}</div>
                        <div className='my_resume_edit_imgs'>
                            <img src={editIcon} alt="" onClick={() => setPage(1)}/>
                        </div>
                    </div>
                    <div className="resume_desc_details">{profileDetails.phone}</div>
                    <div className="resume_desc_details">{profileDetails.email}</div>
                    <div className="resume_desc_details">{profileDetails.address}</div>
                </div>
                <div className='resume_prof_details'>
                    <div className='resume_prof_edit_head'>
                        <div className="my_resume_name">Work Experience</div>
                        <div className='my_resume_edit_imgs'>
                            <img src={editIcon} alt="" onClick={() => setPage(2)}/>
                            <img src={deleteIcon} onClick={()=>{setProfileDetails(prev=>({...prev,work:"",experience: ""}))}} alt=""/>
                        </div>
                    </div>
                    <div className="resume_desc_details">{profileDetails.work}</div>
                    <div className="resume_desc_details">{profileDetails.experience}</div>
                </div>
                <div className='resume_prof_details'>
                    <div className='resume_prof_edit_head'>
                        <div className="my_resume_name">Education</div>
                        <div className='my_resume_edit_imgs'>
                            <img src={editIcon} alt="" onClick={() => setPage(3)}/>
                            <img src={deleteIcon} onClick={()=>{setProfileDetails(prev=>({...prev,educationTime: "",education: ""}))}} alt=""/>
                        </div>
                    </div>
                    <div className="resume_desc_details">{profileDetails.education}</div>
                    <div className="resume_desc_details">{profileDetails.educationTime}</div>
                </div>
                <div className='resume_prof_details'>
                    <div className='resume_prof_edit_head'>
                        <div className="my_resume_name">Skills</div>
                        <div className='my_resume_edit_imgs'>
                            <img src={editIcon} alt="" onClick={() => setPage(4)}/>
                            <img src={deleteIcon} onClick={()=>{setProfileDetails(prev=>({...prev,skills: []}))}} alt=""/>
                        </div>
                    </div>
                    {profileDetails.skills.map((e, i) => (
                        <div key={i} className="resume_desc_details">{e}</div>
                    ))}
                </div>
            </div>) : (<JobApplyFormEdit setPage={setPage} page={page}/>)}
        </div>
    )
}