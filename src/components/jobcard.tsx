import React from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  skills: string[];
  description: string;
}

interface JobCardProps {
  job: Job;
  setSelectedJob: React.Dispatch<React.SetStateAction<Job | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const JobCard: React.FC<JobCardProps> = ({ job, setSelectedJob, setIsModalOpen }) => {
  return (
    <div className="job-card">
      <h3
        onClick={() => {
          setSelectedJob(job); // Set selected job when clicked
          setIsModalOpen(true); // Open the modal
        }}
        style={{ cursor: 'pointer', color: 'blue' }}
      >
        {job.title}
      </h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
    </div>
  );
};
