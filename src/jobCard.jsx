import React, { useContext, useEffect, useState } from 'react'
import { Card, button } from 'react-bootstrap';
import { JobContext, EstPreviewContext } from './Context';

export default function JobCard({ postingJobsData }) {

  const { estPreview, setEstPreview } = useContext(EstPreviewContext)

  const { job, setJob } = useContext(JobContext);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (postingJobsData && postingJobsData.length > 0) {
      setHasData(true);
    }
  }, []);

  useEffect(() => {
    if (hasData && !job && postingJobsData) {
      setJob(postingJobsData[0]);
    }
  }, [hasData, job, postingJobsData]);

  useEffect(() => {

    if (!job && postingJobsData) {
      setJob(postingJobsData[0]);
    }
  }, [postingJobsData])

  const openJob = (job) => {
    setJob(job);
  };

  function convertTime(timeStr, isEST) {
    console.log("converttimerendered")
    const [hours, minutes] = timeStr.split(":");
    const timeObj = new Date();
    timeObj.setHours(hours);
    timeObj.setMinutes(minutes);
    if (estPreview === "all") {
      return timeObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

    }
    else if (isEST) {
      if (estPreview === "true") {
        return timeObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
      } else {
        timeObj.setHours(timeObj.getHours() + 7);
        return timeObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
      }
    } else {
      if (estPreview === "true") {
        timeObj.setHours(timeObj.getHours() - 7);
        return timeObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
      } else {
        return timeObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
      }
    }
  }

  return (
    <>
      {postingJobsData?.map(job => (
        <Card type='button' onClick={() => openJob(job)} key={job.postingJobId}>
          <div key={job.postingJobId}>

            <Card.Title >{job.jobTitle}</Card.Title>
            {/* location causing error */}
            {/* <Card.Text>  {job.jobLocation}</Card.Text> */}

            <div>
              <button> {job.isFullTimeJob ? "Full Time" : "Part Time"}</button>

              <button>
                {job.startedTimeFrom && job.endedTimeIn ? (
                  <>
                    {convertTime(job.startedTimeFrom, job.isEST).replace(" ", "")}{" - "}
                    {convertTime(job.endedTimeIn, job.isEST).replace(" ", "")}
                    {(job.isEST && estPreview === null) || estPreview === true ? " EST" : ""}
                  </>
                ) : null}
              </button>
            </div>

            <Card.Text>  {job.jobDescription}</Card.Text>

            <button>Apply</button>
          </div>
        </Card>
      ))}
    </>
  )
}
