import { useEffect, useState } from "react";
import { nextIcon } from "../../assets";
import { collection, doc, getDocs } from "firebase/firestore";
import { database } from "../../firebaseConfig";

const initState = [{
    name: "Bookkeeper", updatedAt: "July 23 2023", payable: "Accounts Payable"
}, {
    name: "Accounts Payable", updatedAt: "July 23 2023", payable: "Accounts Payable"
}, {
    name: "Inventory Management", updatedAt: "July 23 2023", payable: "Accounts Payable"
}, {
    name: "Underwriter", updatedAt: "July 23 2023", payable: "Accounts Payable"
}, {
    name: "Interior Designer", updatedAt: "July 23 2023", payable: "Accounts Payable"
}, {
    name: "CRM Manager", updatedAt: "July 23 2023", payable: "Accounts Payable"
}
]


const fetchJobApplicants = async (userId = "123@gmail.com") => {
    try {
        const persons = collection(database, "persons");
        const userRef = doc(persons, userId);
        const subcollectionRef = collection(userRef, "applyJobs");
        const postedJobs = await getDocs(subcollectionRef);
        let applicantDetails = [];
        postedJobs.forEach(doc => {
            const data = doc.data();
            applicantDetails.push(data)
        })
        return applicantDetails;
    } catch (error) {
        console.log(error)
        return [];
    }

}

const fetchJobPosts = async () => {
    try {
        const persons = collection(database, "persons");
        const userId = "123@gmail.com";
        const userRef = doc(persons, userId);
        const subcollectionRef = collection(userRef, "postingJobs");
        const postedJobs = await getDocs(subcollectionRef);

        let applicantsArray = [];

        const asyncFetches = postedJobs.docs.map(async (doc) => {
            const data = doc.data();
            const { identitiesUserApplyes } = data;
            const applicants = [];

            if (!!identitiesUserApplyes?.length) {
                const fetchPromises = identitiesUserApplyes.map(async e => {
                    let res = await fetchJobApplicants(e);
                    return res;
                });
                const results = await Promise.all(fetchPromises);
                applicants.push(...results);
            }

            applicantsArray.push(...applicants);
            console.log(applicants);
        });

        await Promise.all(asyncFetches);

        return applicantsArray;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export const AdminApplications = () => {


    const [jobs, setJobs] = useState([])
    const [jobsLength, setJobLength] = useState(84);
    const [page, setPage] = useState(1);
    const jobsPerPage = 5

    const fetchJobs = async page => {
        const result = await fetchJobPosts();
        const usedata = result.flat().map((e, i) => {
            e.name = e.name || `test_name_${i}`;
            e.payable = "Accounts Payable"
            if(e.updatedAt){
                const date = new Date(e.updatedAt.seconds * 1000);
                const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                e.updatedAt = formattedDate;
            }
            return e;
        })
        const startIndex = (page - 1) * jobsPerPage;
        const endIndex = page * jobsPerPage;
        return usedata.slice(startIndex, endIndex);
    }

    useEffect(() => {
        fetchJobs(page).then((r) => {
            setJobs(r)
        })
    }, [page]);

    return (<div className='job_dashboard'>
        <h2 className="job_dashboard_title">My Applications ({jobsPerPage})</h2>
        <div className='job_table'>
            <div className='job_table_thead'>
                <div className='job_table_th job_table_td_name'>Applicants</div>
                <div className='job_table_th'>Applied Date</div>
                <div className='job_table_th'>Actions</div>
            </div>
            {jobs.map(({ updatedAt = "", name = "", payable = "" }, i) => (<div key={i} className='job_table_tbody'>
                <div className='job_table_td job_table_td_name app_table_td_name'>{name}
                    <div>{payable}</div>
                </div>
                <div className='job_table_td'>{updatedAt}</div>
                <div className='job_table_td job_table_td_action'>
                    View application
                </div>
            </div>))}
            <div className='pagination_boxes'>
                {(new Array(Math.floor(jobsLength / jobsPerPage)).fill((0))
                    .map((e, i) => (
                        <div key={i} style={i + 1 === page ? { color: "blue", background: "#DADDE0" } : {}}
                            onClick={() => { setPage(i + 1) }}
                            className={'pagination_box'}>{i + 1}
                        </div>)))}
                <img
                    onClick={() => (jobsLength / jobsPerPage) > page ? setPage(c => c + 1) : setPage(1)}
                    src={nextIcon} alt="" className='' />
            </div>
        </div>
    </div>

    )
}