import React, { useState, useEffect, useId } from 'react'
import { Card, button, Container, Form } from 'react-bootstrap';
import { collection, setDoc, doc, serverTimestamp, getDoc, updateDoc, addDoc, arrayUnion, getDocs } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { addMore, backArrowIcon, crossIcon, deleteIcon, dragIcon, orLineIcon, uploadIcon } from "../assets"
import "../styles/jobApplyForm.css"

export function JobApplyForm() {

    // card 1
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [resumeOption, setResumeOption] = useState('')
    // card 4
    const [educationLevel, setEducationLevel] = useState('')
    const [studyField, setStudyField] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [schoolFromMonth, setSchoolFromMonth] = useState()
    const [schoolToMonth, setSchoolToMonth] = useState()
    const [schoolFromYear, setSchoolFromYear] = useState()
    const [schoolToYear, setSchoolToYear] = useState()
    //card 5
    const [jobTitle, setJobTitle] = useState()
    const [company, setCompany] = useState()
    const [jobFromMonth, setJobFromMonth] = useState()
    const [jobToMonth, setJobToMonth] = useState()
    const [jobFromYear, setJobFromYear] = useState()
    const [hobToYear, setJobToYear] = useState()
    const [jobDescription, setJobDescription] = useState()
    //card 6
    const [skills, setSkills] = useState([])
    const [skill, setSkill] = useState('')

    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState(1);
    function handleContinueBtn(cardNumber) {

        if (resumeOption === 1)
            setCardNumber(3);
        else if (resumeOption === 2)
            setCardNumber(4)
        else if (resumeOption === 3)
            submitApply();
    }

    function addSkill() {
        skills.push(skill)

    }

    function submitApply() {
        skills?.map(s => (
            submitSkills(s)
        ))
    }
    async function submitSkills(s) {
        const persons = collection(database, "persons");
        const userId = "sarah5401021@gmail.com";
        const userRef = doc(persons, userId);
        const subcollectionRef = collection(userRef, "skills");
        try {
            await setDoc(doc(subcollectionRef, s[0]), {
                createdAt: serverTimestamp(),
                skillName: { s }
            });
            console.log("Document added to subcollection successfully!");
            navigate(-1)

        } catch (error) {
            console.error("Error adding document:", error);
        }
    }

    const updatePostJobs = async (postJobId) => {
        try {
            const persons = collection(database, "persons");
            const userId = "sarah5401021@gmail.com";
            const userRef = doc(persons, "123@gmail.com");
            const subcollectionRef = collection(userRef, "postingJobs");

            const postedJob = doc(subcollectionRef, postJobId);

            await setDoc(postedJob, {
                identitiesUserApplyes: arrayUnion("userId@gmail.com")
            }, { merge: true });

            console.log("Updated identitiesUserApplyes array with the user ID");
        } catch (error) {
            console.error("Error fetching or updating documents:", error.message);
        }
    };



    const handleSubmit = async (postJobId = "11_43_29_2023_12_19") => {
        try {
            const persons = collection(database, "persons");
            const userId = "sarah5401021@gmail.com";
            const userRef = doc(persons, userId);
            const subcollectionRef = collection(userRef, "applyJobs");

            const applyDetails = {
                name: `${firstName} ${lastName}`,
                postJobId,
                phone, city, skills: skill
            };

            await addDoc(subcollectionRef, applyDetails);
            await updatePostJobs(postJobId);
            console.log("Application submitted successfully!");
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };


    const SaveAndExit = ({ page }) => {
        return (<div className='job_save_exit'>
            <div className='job_save_exit_head'>
                {page != 1 && <img onClick={() => { setCardNumber(page - 1) }} className='' src={backArrowIcon} alt="" />}
                <div className='job_save_exit_text'>Save and exit</div>
            </div>
            <div className='job_save_exit_progress'>
                <div style={{ width: `${((page / 5) * 100)}%` }} className='job_save_exit_complete'></div>
                <div style={{ width: `${(((5 - page) / 5) * 100)}%` }} className='job_save_exit_left'></div>
            </div>
        </div>)
    }

    return (
        <Container className='job_apply_form'>
            {cardNumber === 1 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <SaveAndExit page={cardNumber} />
                        <Form className='job_form_apply_fields' onSubmit={(e) => { e.preventDefault(); setCardNumber(2) }}>
                            <h4 className=''>Add your contact information</h4>
                            <div className='job_apply_field'>
                                <Form.Label className='job_form_field'>First name</Form.Label>
                                <Form.Control type='text' className='job_form_input' onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className='job_apply_field'>
                                <Form.Label className='job_form_field'>Last name</Form.Label>
                                <Form.Control className='job_form_input' type='text' onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className='job_apply_field'>
                                <Form.Label htmlFor="email" className='job_form_field'>Email</Form.Label>
                                <Form.Control type="email" className='job_form_input' id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='job_apply_field'>
                                <Form.Label className='job_form_field'>City (optional)</Form.Label>
                                <Form.Control className='job_form_input' type='text' onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className='job_apply_field'>
                                <Form.Label htmlFor="phone" className='job_form_field'>Phone number</Form.Label>
                                <div className='job_form_phone_input'>
                                    <Form.Select size="lg" className='job_form_phone_code'>
                                        <option>+1</option>
                                    </Form.Select>
                                    <Form.Control className='job_form_input' type="text" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <button className='job_form_submit' type='submit'  >Continue</button>
                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 2 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <SaveAndExit page={cardNumber} />
                        <Form className='job_form_apply_fields' onSubmit={(e) => { e.preventDefault(); setCardNumber(3) }}>
                            <h4>Add a resume for the employer</h4>

                            <Container className='job_apply_upload_box'>
                                <img src={uploadIcon} className='uplaod_icon' alt="" />
                                <div>
                                    <h4 className='job_form_head_field'>Upload a resume</h4>
                                    <p className='job_form_upload_desc'>Accepted file types: PDF, DOCX</p>
                                </div>
                            </Container>
                            <img src={orLineIcon} alt="" />
                            <Container className='job_apply_upload_box' onClick={(e) => setResumeOption(2)}>
                                <img src={uploadIcon} className='uplaod_icon' alt="" />
                                <div>
                                    <p className='job_form_upload_desc_rec'>Recommended</p>
                                    <h4 className='job_form_head_field'>Build a Logoipsum Resume</h4>
                                    <p className='job_form_upload_desc'>We’ll guide you through it, there are only a few steps</p>
                                </div>
                            </Container>
                            <img src={orLineIcon} alt="" />
                            <Container className='job_apply_upload_box' onClick={(e) => setResumeOption(3)}>
                                <img src={uploadIcon} className='uplaod_icon' alt="" />
                                <div>
                                    <h4 className='job_form_head_field'>Continue without a resume</h4>
                                    <p className='job_form_upload_desc'>We highly recommend that you provide a resume!</p>
                                </div>
                            </Container>
                            <br />
                            <button className='job_form_submit' type="submit" >Continue</button>

                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 3 &&

                <Card>
                    <Card.Body className='job_apply_form_body' >
                        {/* <SaveAndExit page={cardNumber} /> */}
                        <Form className='job_form_apply_fields' onSubmit={(e) => e.preventDefault()}>
                            <div className='job_form_resume_head'>
                                <h5>Upload a resume</h5>
                                <img src={crossIcon} alt="" />
                            </div>
                            <label htmlFor='resume_file'>
                                <h6 className='job_form_resume_accept'>Acceptable files: docx,pdf</h6>
                                <Container className='job_form_resume_box'>
                                    <img src={dragIcon} alt="" />
                                    <h6>Drag and drop here, or</h6>
                                    <h6>Select a file</h6>
                                </Container>
                                <input type="file" placeholder='' id='resume_file' />
                            </label>
                            <div className='job_form_resume_upload_btns'>
                                <button className='job_form_resume_canel_btn'>Cancel</button>
                                <button className='job_form_resume_upload_btn' onClick={() => setCardNumber(4)}>Upload</button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 4 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <SaveAndExit page={cardNumber} />
                        <Form className='job_form_apply_fields' onSubmit={(e) => { e.preventDefault(); setCardNumber(5) }}>
                            <div>
                                <p className='job_form_upload_desc'>Build your resume (1 of 4)</p>
                                <p className='job_form_field'>Do you want to add any education details?</p>
                            </div>
                            <div>
                                <Form.Label className='job_form_field'>Level of education *</Form.Label>
                                <Form.Control className='job_form_input' type='text' required onChange={(e) => setEducationLevel(e.target.value)} />
                            </div>
                            <div>
                                <Form.Label className='job_form_field'>Field of study</Form.Label>
                                <Form.Control className='job_form_input' type='text' required onChange={(e) => setStudyField(e.target.value)} />
                            </div>
                            <div>
                                <Form.Label className='job_form_field'>Name of school</Form.Label>
                                <Form.Control className='job_form_input' type='text' required onChange={(e) => setSchoolName(e.target.value)} />
                            </div>

                            <Form.Text>Time period</Form.Text>
                            <Form.Group className='job_edu_form_date'>
                                <Form.Label>From</Form.Label>
                                <div>
                                    <Form.Select>
                                        <option value="" key="">Month</option>
                                    </Form.Select>
                                    <Form.Select>
                                        <option value="" key="">Year</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <Form.Group className='job_edu_form_date'>
                                <Form.Label>To</Form.Label>
                                <div>
                                    <Form.Select>
                                        <option value="" key="">Month</option>
                                    </Form.Select>
                                    <Form.Select>
                                        <option value="" key="">Year</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <div className='job_form_add'>
                                <img src={addMore} alt="" />
                                Add more
                            </div>
                            <button className='job_form_submit skill_btn'>Save and continue</button>

                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 5 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <SaveAndExit page={cardNumber} />
                        <Form className='job_form_apply_fields' onSubmit={(e) => { e.preventDefault(); setCardNumber(6) }}>
                            <Form.Text>Do you want to add work history?</Form.Text>
                            <Form.Group>
                                <Form.Label className='job_form_field'>Job title *</Form.Label>
                                <Form.Control className='job_form_input' type='text' required onChange={(e) => setJobTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='job_form_field'>Company</Form.Label>
                                <Form.Control className='job_form_input' type='text' required onChange={(e) => setCompany(e.target.value)} />
                            </Form.Group>
                            <Form.Text className='job_form_field'>Time period</Form.Text>
                            <Form.Group className='job_edu_form_date'>
                                <Form.Label>To</Form.Label>
                                <div>
                                    <Form.Select>
                                        <option value="" key="">Month</option>
                                    </Form.Select>
                                    <Form.Select>
                                        <option value="" key="">Year</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <Form.Group className='job_edu_form_date'>
                                <Form.Label>To</Form.Label>
                                <div>
                                    <Form.Select>
                                        <option value="" key="">Month</option>
                                    </Form.Select>
                                    <Form.Select>
                                        <option value="" key="">Year</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <div className='job_form_desc_box'>
                                <Form.Label>Description</Form.Label>
                                <Form.Text>Describe your position and any significant accomplishments</Form.Text>
                            </div>
                            <textarea
                                id="exampleFormControlTextarea1"
                                rows="5"
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <div className='job_form_add'>
                                <img src={addMore} alt="" />
                                Add more
                            </div>
                            <div className='job_form_desc_btn_box'>
                                <button className='job_form_submit' >Save and continue</button>
                                <span>skip</span>
                            </div>

                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 6 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <SaveAndExit page={cardNumber} />
                        <Form className='job_form_apply_fields' onSubmit={(e) => { e.preventDefault(); setCardNumber(7) }}>
                            <div>
                                <p className='job_form_upload_desc'>Build your resume (3 of 4)</p>
                                <label htmlFor="phone">Do you want to share some of your skills?</label>
                            </div>
                            <div className='job_form_field_box'>
                                <input className='job_form_input' type="text" placeholder='Add a skill' onChange={(e) => setSkill(e.target.value)} />
                                <img src={addMore} alt="" className='add_skill_img' />
                            </div>
                            {skills?.map(skill => (
                                <h4 key={skill}>{skill}</h4>
                            ))}

                            <button className='job_form_submit skill_btn'>Submit</button>
                        </Form>
                    </Card.Body>
                </Card>
            }

            {cardNumber === 7 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <SaveAndExit page={cardNumber} />
                        <Form className='job_form_apply_fields' onSubmit={(e) => { e.preventDefault(); submitApply() }}>
                            <div>
                                <p className='job_form_upload_desc'>Build your resume (3 of 4)</p>
                                <label htmlFor="phone">Do you want to share some of your skills?</label>
                            </div>
                            <div className='job_form_field_dlt_box'>
                                <input className='job_form_input' type="text" value="Programming" onChange={(e) => setSkill(e.target.value)} />
                                <img src={deleteIcon} alt="" />
                            </div>
                            <div className='job_form_field_box'>
                                <input className='job_form_input' type="text" placeholder='Add a skill' onChange={(e) => setSkill(e.target.value)} />
                                <img src={addMore} alt="" className='add_skill_img' />
                            </div>

                            {skills?.map(skill => (
                                <h4 key={skill}>{skill}</h4>
                            ))}

                            <button onClick={() => handleSubmit()} type='submit' className='job_form_submit skill_btn'>Submit</button>
                        </Form>
                    </Card.Body>
                </Card>
            }
        </Container>
    )
}
