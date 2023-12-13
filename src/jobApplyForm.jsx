import React, { useState, useEffect } from 'react'
import { Card, button, Container, Form } from 'react-bootstrap';
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseConfig";
import { useNavigate } from 'react-router-dom';

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

    function addSkill(){
        skills.push(skill)
        
    }

    function submitApply(){
        skills?.map( s => (
            submitSkills(s)
        ))
    }
    async function submitSkills (s) {
        const persons = collection(database, "persons");
        const userId = "sarah5401021@gmail.com";
        const userRef = doc(persons, userId);
        const subcollectionRef = collection(userRef, "skills");
        try {
            await setDoc(doc(subcollectionRef, s[0]), {
                createdAt:serverTimestamp(),
                skillName: {s}
            });
            console.log("Document added to subcollection successfully!");
            navigate(-1)

        } catch (error) {
            console.error("Error adding document:", error);
        }
    }

    return (
        <Container>
            {cardNumber === 1 &&
                <Card>
                    <Card.Body>
                        <Form>
                            <h4>Add your contact information</h4>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type='text' onChange={(e) => setFirstName(e.target.value)} required />
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type='text' onChange={(e) => setLastName(e.target.value)} required />
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Label>City (optional)</Form.Label>
                            <Form.Control type='text' onChange={(e) => setCity(e.target.value)} />
                            <label for="phone">Phone number</label>
                            <input type="text" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)} />
                            <br />
                            <button onClick={(e) => setCardNumber(2)} >Continue</button>
                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 2 &&
                <Card>
                    <Card.Body>
                        <Form>
                            <h3>Add a resume for the employer</h3>

                            <Container type='button'>
                                <h4>Upload a resume</h4>
                                <p>Accepted file types: PDF, DOCX</p>
                            </Container>
                            <p>Or</p>
                            <Container type='button' onClick={(e) => setResumeOption(2)}>
                                <p>Recommended</p>
                                <h4>Build a Logoipsum Resume</h4>
                                <p>We’ll guide you through it, there are only a few steps</p>
                            </Container>
                            <p>Or</p>
                            <Container type='button' onClick={(e) => setResumeOption(3)}>
                                <h4>Continue without a resume</h4>
                                <p>We highly recommend that you provide a resume!</p>
                            </Container>
                            <br />
                            <button type="submit"  onClick={handleContinueBtn}>Continue</button>

                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 3 &&

                <Card>
                    <Card.Body>
                        <Form>
                            <h5>Upload a resume</h5>
                            <h6>Acceptable files: docx,pdf</h6>
                            <Container>
                                <h6>Drag and drop here, or</h6>
                                <h6>Select a file</h6>
                                <button>Upload</button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 4 &&
                <Card>
                    <Card.Body>
                        <Form>
                            <h4>Build your resume (1 of 4)</h4>
                            <h4>Do you want to add any education details?</h4>

                            <Form.Label>Level of education *</Form.Label>
                            <Form.Control type='text' required onChange={(e) => setEducationLevel(e.target.value)} />
                            <Form.Label>Field of study</Form.Label>
                            <Form.Control type='text' required onChange={(e) => setStudyField(e.target.value)} />
                            <Form.Label>Name of school</Form.Label>
                            <Form.Control type='text' required onChange={(e) => setSchoolName(e.target.value)} />

                            <Form.Text>Time period</Form.Text>
                            <Form.Group>
                                <Form.Label>From</Form.Label>
                                <input type="number" name="numberInput" min="1" max="12" placeholder='Month' onChange={(e) => setSchoolFromMonth(e.target.value)} />
                                <input type="number"  name="numberInput" min="1960" max="2024" placeholder='Year' onChange={(e) => setSchoolFromYear(e.target.value)} />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>To</Form.Label>
                                <input type="number" name="numberInput" min="1" max="12" placeholder='Month' onChange={(e) => setSchoolToMonth(e.target.value)} />
                                <input type="number" name="numberInput" min="1960" max="2024" placeholder='Year' onChange={(e) => setSchoolToYear(e.target.value)} />
                            </Form.Group>
                            <button onClick={(e) => setCardNumber(5)}>Save and continue</button>

                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 5 &&
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Text>Do you want to add work history?</Form.Text>
                            <Form.Group>
                                <Form.Label>Job title *</Form.Label>
                                <Form.Control type='text' required onChange={(e) => setJobTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Company</Form.Label>
                                <Form.Control type='text' required onChange={(e) => setCompany(e.target.value)} />
                            </Form.Group>
                            <Form.Text>Time period</Form.Text>
                            <Form.Group>
                                <Form.Label>From</Form.Label>
                                <input type="number"  name="numberInput" min="1" max="12" placeholder='Month' onChange={(e) => setJobFromMonth(e.target.value)} />
                                <input type="number" name="numberInput" min="1960" max="2024" placeholder='Year' onChange={(e) => setJobFromYear(e.target.value)} />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>To</Form.Label>
                                <input type="number" name="numberInput" min="1" max="12" placeholder='Month' onChange={(e) => setJobToMonth(e.target.value)} />
                                <input type="number" name="numberInput" min="1960" max="2024" placeholder='Year' onChange={(e) => setJobToYear(e.target.value)} />
                            </Form.Group>
                            <Form.Label>Description</Form.Label>
                            <br />
                            <Form.Text>Describe your position and any significant accomplishments</Form.Text>

                            <textarea
                                id="exampleFormControlTextarea1"
                                rows="5"
                                onChange={(e) => setJobDescription(e.target.value)}
                            />

                            <button onClick={(e) => setCardNumber(6)}>Save and continue</button>

                        </Form>
                    </Card.Body>
                </Card>
            }
            {cardNumber === 6 &&
                <Card>
                    <Card.Body>
                        <Form>
                            <p>Build your resume (3 of 4)</p>
                            <label for="phone">Do you want to share some of your skills?</label>
                            <Form.Text>we recommend adding at least 6 skills</Form.Text>
                            <input type="text" placeholder='Add a skill' onChange={(e) => setSkill(e.target.value)} />
                            {skills?.map(skill => (
                                <h4>{skill}</h4>
                            ))}

                            <button onClick={addSkill}>+</button>
                            <button>Save and continue</button>
                        </Form>
                    </Card.Body>
                </Card>
            }
        </Container>
    )
}
