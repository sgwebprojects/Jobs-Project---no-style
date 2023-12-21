import React from 'react'
import { Card, button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { addMore, leftArrow, rightArrow } from '../assets';
import "../styles/jobPost.css";
import AddIcon from '../assets/AddIcon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export function PostJobForm() {

    const [location, setLocation] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [selectedFullPart, setSelectedFullPart] = useState('full-time');
    const [selectedTime, setSelectedTime] = useState();
    const [startTime, setStartTime] = useState("08:00 AM");
    const [endTime, setEndTime] = useState("04:00 PM");
    const [description, setDescription] = useState('');
    const handleSetDescription = (description) => {
        const newDescription = description.split('\n').join('<br/>');
        setDescription(newDescription);
    }
    const [selectedShowPay, setSelectedShowPay] = useState('Range');
    const [minPay, setMinPay] = useState('');
    const [maxPay, setMaxPay] = useState('');
    const [selectedRatePer, setSelectedRatePer] = useState('');

    const [cardNumber, setCardNumber] = useState(1);
    const navigate = useNavigate();

    const [startHour, setStartHour] = useState('');
    const [finishHour, setFinishHour] = useState('');
    const [startMinutes, setStartMinutes] = useState('');
    const [finishMinutes, setFinishMinutes] = useState('');


    const [JobFormDetails, setFormDetails] = useState({
        isEST: "Eastern Time (EST)",
        isFullTimeJob: "full-time",
        jobDescription: "",
        startedTimeFrom: "",
        endedTimeIn: "",
        jobPaymentPer: "",
        jobTitle: "",
        jobLocation: { location: "" }
    })

    const handleUserInput = ({ name, value }) => {
        console.log(name,value)
        setFormDetails(prev => ({ ...prev, [name]: value }));
    }

    // const [startTimePeriod, setStartTimePeriod] = useState('');
    // const [finishTimePeriod, setFinishTimePeriod] = useState('');

    function handleContinueBtn(cardNumber) { setCardNumber(cardNumber + 1) }

    function handleBackBtn(cardNumber) {
        if (cardNumber === 1) {
            navigate(-1)
        }
        setCardNumber(cardNumber - 1)
    }

    const getCurrentDateTimeString = () => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        return `${hours}_${minutes}_${seconds}_${year}_${month}_${day}`;
    }


    const addJobPost = async (e) => {
        const persons = collection(database, "persons");
        const userId = "sarah5401021@gmail.com";
        const isEst = () => {
            const selectedTime = "Eastern Time (EST)";
            return selectedTime === "Eastern Time (EST)";
        };
        const userRef = doc(persons, userId);
        const subcollectionRef = collection(userRef, "postingJobs");
        try {
            // await setDoc(doc(subcollectionRef, getCurrentDateTimeString()), {
            //     identityUserPublishId: userId,
            //     isEST: isEst(),
            //     isFullTimeJob: selectedFullPart,
            //     jobDescription: description,
            //     jobLocation: { location },
            //     startedTimeFrom: `${startHour} : ${startMinutes}`, endedTimeIn: `${finishHour} : ${finishMinutes}`,
            //     // jobPayment : {minPay} - {maxPay}, 
            //     jobPaymentPer: selectedRatePer,
            //     jobTitle: jobTitle,
            //     updatedAt: serverTimestamp(),
            //     isJobActive: true,
            //     createdAt: serverTimestamp()
            // });
            await setDoc(doc(subcollectionRef, getCurrentDateTimeString()), {
                identityUserPublishId: userId,
                // jobPayment : {minPay} - {maxPay}, 
                updatedAt: serverTimestamp(),
                isJobActive: true,
                createdAt: serverTimestamp(),
                ...JobFormDetails
            });
            console.log("Document added to subcollection successfully!");
            // navigate(-1)

        } catch (error) {
            console.error("Error adding document:", error);
        }
    }

    // addJobPost()
    console.log(JobFormDetails)


    return (
        <Container className='job_apply_form'>
            {cardNumber === 1 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <Form onSubmit={(e) => { e.preventDefault(); handleContinueBtn(cardNumber) }} className='job_form_apply_fields' >
                            <Form.Group id='jobTitle' className='job_apply_field'>
                                <Form.Label className='job_form_field'>Job title *</Form.Label>
                                <Form.Control className='job_form_input' type='text' name='jobTitle' required onChange={(e) => handleUserInput(e.target)} />
                            </Form.Group>
                            <Form.Group id='location' className='job_apply_field'>
                                <Form.Label className='job_form_field'>Where is your company located *</Form.Label>
                                <Form.Control className='job_form_input' type='text' name='jobLocation' required onChange={(e) => handleUserInput(e.target)} />
                            </Form.Group>
                            <div className='job_apply_end_btns'>
                                <button className='job_form_back_btn' onClick={() => handleBackBtn(1)}>
                                    <img src={leftArrow} alt="" />
                                    Back</button>
                                <button className='job_form_submit skill_btn' >
                                    continue  <img src={rightArrow} alt="" />
                                </button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 2 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <Form onSubmit={(e) => { e.preventDefault(); handleContinueBtn(cardNumber) }} className='job_form_apply_fields'>
                            <Form.Group className='job_apply_field' id='jobType'>
                                <Form.Label className='job_form_field'>Job type *</Form.Label>
                                <div className='job_apply_type_btns'>
                                    <button
                                        className={`job_post_time_btn ${JobFormDetails.isFullTimeJob === 'full-time' ? 'job_active' : ''}`}
                                        type='button'
                                        onClick={() => setFormDetails(prev => ({ ...prev, isFullTimeJob: 'full-time' }))} >
                                        <AddIcon color={JobFormDetails.isFullTimeJob === 'full-time' && "white"} />
                                        Full-time
                                    </button>
                                    <button
                                        type='button'
                                        className={`job_post_time_btn    ${JobFormDetails.isFullTimeJob === 'part-time' ? 'job_active' : ''}`}
                                        onClick={() => setFormDetails(prev => ({ ...prev, isFullTimeJob: 'full-time' }))}
                                    >
                                        <AddIcon color={JobFormDetails.isFullTimeJob !== 'full-time' && "white"} />
                                        Part-time
                                    </button>
                                </div>
                            </Form.Group>

                            <Form.Select
                                required
                                value={selectedTime}
                                className='job_apply_select'
                                defaultValue={true}
                                name='isEst'
                                onChange={(e) => setFormDetails(prev=>({...prev,isEST: JSON.parse(e.target.value)}))}
                            >
                                <option value={true}>Eastern Time (EST)</option>
                                <option value={false}>Israel Time (IST)</option>
                            </Form.Select>
                            <Form.Group>
                                <p className='job_form_field'>Work hours</p>
                                <Form.Group className='job_edu_form_date'>
                                    <div className='job_date_from_to'>
                                        <Form.Label>From</Form.Label>
                                        <Form.Select defaultValue={"8: 00 AM"} value={JobFormDetails.startedTimeFrom} className='job_form_select' name='startedTimeFrom' onChange={(e) => handleUserInput(e.target)}>
                                            {new Array(12).fill(1).map((e, i) => <option key={i}>{`${i + 1}: 00 AM`}</option>)}
                                            {new Array(12).fill(1).map((e, i) => <option key={i}>{`${i + 1}: 00 PM`}</option>)}
                                        </Form.Select>
                                        <Form.Label>Until</Form.Label>
                                        <Form.Select defaultValue={"6: 00 PM"} value={JobFormDetails.endedTimeIn} name='endedTimeIn'>
                                            {new Array(12).fill(1).map((e, i) => <option key={i}>{`${i + 1}: 00 AM`}</option>)}
                                            {new Array(12).fill(1).map((e, i) => <option key={i}>{`${i + 1}: 00 PM`}</option>)}
                                        </Form.Select>
                                    </div>
                                </Form.Group>
                            </Form.Group>


                            <div className='job_apply_end_btns'>
                                <button className='job_form_back_btn' onClick={() => handleBackBtn(2)}>
                                    <img src={leftArrow} alt="" />
                                    Back</button>
                                <button className='job_form_submit skill_btn' >
                                    continue  <img src={rightArrow} alt="" />
                                </button>
                            </div>
                        </Form>

                    </Card.Body>
                </Card>
            }
            {cardNumber === 3 &&
                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <Form onSubmit={(e) => { e.preventDefault(); handleContinueBtn(cardNumber) }} className='job_form_apply_fields'>
                            <Form.Group>
                                <Form.Label className='job_form_field'>Job description *</Form.Label>
                                <ReactQuill theme="snow" onChange={(e) => { setFormDetails(prev => ({ ...prev, jobDescription: e })) }} defaultValue={`Overview

Responsibilities to include coding and submitting claims, posting EOBs, denials, Medicaid billing, sending patient bills, follow-up on claim status, submit claims electronically, obtain and track drug authorizations, insurance eligibility. Candidate should be familiar with Ophthalmology ICD10 and CPT codes and strong knowledge of modifiers and payor rules. ASC facility billing also a plus but not required

Job Type: Full-time

Pay: $24.00 - $28.00 per hour

Benefits:
401(k)
Dental insurance
Health insurance
Life insurance
Paid time off
Vision insurance

Schedule:
Monday to Friday

Ability to commute/relocate:
New York, NY 10011: Reliably commute or planning to relocate before starting work (Required)

Experience:
ICD-10: 2 years (Preferred)

Work Location: Hybrid remote in New York, NY 10011
`.split("\n").join("<br/>")} />
                            </Form.Group>
                            <div className='job_apply_end_btns'>
                                <button className='job_form_back_btn' onClick={() => handleBackBtn(3)}>
                                    <img src={leftArrow} alt="" />
                                    Back</button>
                                <button className='job_form_submit skill_btn' >
                                    continue  <img src={rightArrow} alt="" />
                                </button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 4 &&

                <Card>
                    <Card.Body className='job_apply_form_body job_filter_body'>
                        <Form onSubmit={(e) => { e.preventDefault(); handleContinueBtn(cardNumber) }} className='job_form_apply_fields'>
                            <div className='job_form_filter'>

                                <Form.Group>
                                    <Form.Label className='job_form_field'>Show pay by</Form.Label>
                                    <Form.Select
                                        required className='job_filter_select'
                                        value={JobFormDetails.isEST}
                                        defaultValue={"Eastern Time (EST)"}
                                        name=''
                                    >
                                        <option value={"Range"}>Range</option>
                                        <option value={"Starting amount"}>Starting amount</option>
                                        <option value={"Starting amount"}>Starting amount</option>
                                        <option value={"Maximum amount"}>Maximum amount</option>
                                        <option value={"Exact amount"}>Exact amount</option>

                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className='job_form_filter'>
                                    <div>
                                        <Form.Label className='job_form_field'>Minimum</Form.Label>
                                        <Form.Control value={"$67,1511.11"} className='job_form_input' type='text' required onChange={(e) => setMinPay(e.target.value)} />
                                    </div>
                                    <div>
                                        <Form.Label className='job_form_field'>Maximum</Form.Label>
                                        <Form.Control value={"$80,870.15"} className='job_form_input' type='text' required onChange={(e) => setMaxPay(e.target.value)} />
                                    </div>

                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='job_form_field'>Rate</Form.Label>
                                    <Form.Select
                                        required className='job_filter_select'
                                        value={JobFormDetails.jobPaymentPer}
                                        defaultValue={"per year"}
                                        name='jobPaymentPer'
                                        onChange={(e) => handleUserInput(e.target)}
                                    >
                                        <option value={"per year"}>per year</option>
                                        <option value={"per hour"}>per hour</option>
                                        <option value={"per day"}>per day</option>
                                        <option value={"per week"}>per week</option>
                                        <option value={"per year"}>per year</option>

                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className='job_apply_end_btns'>
                                <button className='job_form_back_btn' onClick={() => handleBackBtn(3)}>
                                    <img src={leftArrow} alt="" />
                                    Back</button>
                                <button className='job_form_submit skill_btn' >
                                    continue  <img src={rightArrow} alt="" />
                                </button>
                            </div>
                        </Form>

                    </Card.Body>
                </Card>
            }
            {cardNumber === 5 &&

                <Card>
                    <Card.Body className='job_apply_form_body'>
                        <Form onSubmit={(e) => { e.preventDefault(); }} className='job_form_apply_fields'>
                            <h1>{jobTitle}</h1>
                            <h5>{selectedShowPay}</h5>
                            <h1>{selectedFullPart}</h1>
                            <h1>{description}</h1>
                            <h5>{startTime}-{endTime}</h5>
                            <h5>{minPay}-{maxPay}</h5>
                            <h3>{selectedTime}</h3>
                            <h3>{selectedRatePer}</h3>
                            <div className='job_apply_end_btns'>
                                <button className='job_form_back_btn' onClick={() => handleBackBtn(3)}>
                                    <img src={leftArrow} alt="" />
                                    Back</button>
                                <button className='job_form_submit skill_btn' onClick={()=>{
                                    addJobPost()
                                }} >
                                    Submit  <img src={rightArrow} alt="" />
                                </button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            }
        </Container>
    )
}


