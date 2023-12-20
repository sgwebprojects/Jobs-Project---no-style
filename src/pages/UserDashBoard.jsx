import React, {useEffect} from 'react'
import "../styles/dashboard.css";
import {SideBar} from "../components/dashboard/SideBar";
import {useParams} from "react-router-dom";
import {Header} from "../components/dashboard/Header";
import {Inbox} from "../components/dashboard/Inbox";
import {Jobs} from "../components/dashboard/Jobs";
import {AdminApplications} from "../components/dashboard/AdminApplications";
import {UserSideBar} from "../components/dashboard/UserSidebar";
import {MyResume} from "../components/dashboard/MyResume";
import {Applications} from "../components/dashboard/Application";

export default function UserDashBoard() {

    const {tab = "jobs"} = useParams();

    useEffect(() => {

    }, [])

    return (<div className='dashboard'>
        <UserSideBar/>
        <Header/>
        <div className="dashboard_content">
            {(() => {
                switch (tab) {
                    case "jobs":
                        return <MyResume/>
                    case "applications":
                        return <Applications/>
                    case "inbox":
                        return <Inbox/>
                    default:
                        return <Jobs/>
                }
            })()}
        </div>
    </div>)
}
