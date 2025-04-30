
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './joblist.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import AdminJobForm from './AdminJobForm';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store'; 

interface Job {
  id: number;
  title: string;
  company: string;
  skills: string[];
  description: string;
}

const JobList: React.FC = () => {
  const appliedJobs = useSelector((state: RootState) => state.jobs.appliedJobs);
  console.log(appliedJobs)

  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Job>({
    id: 0,
    title: '',
    company: '',
    skills: [],
    description: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const adminEmail = 'admin@example.com';
  const adminPassword = '111111';

  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');

  const isAdmin = storedEmail === adminEmail && storedPassword === adminPassword;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get<Job[]>('http://localhost:3000/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm) ||
    job.company.toLowerCase().includes(searchTerm) ||
    job.skills.join(', ').toLowerCase().includes(searchTerm)
  );

  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const resetForm = () => {
    setFormData({ id: 0, title: '', company: '', skills: [], description: '' });
    setEditMode(false);
    setShowForm(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/jobs/${formData.id}`, formData);
      } else {
        await axios.post('http://localhost:3000/jobs', formData);
      }
      fetchJobs();
      resetForm();
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (job: Job) => {
    setFormData({ ...job });
    setEditMode(true);
    setShowForm(true);
  };
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);


  const closeModal = () => setSelectedJob(null);


  return (
    <>
      <Navbar />
      <div className='container'>
      <div className="job-list-container">
        <h1>Job Listings</h1>

        {isAdmin && (
          <button className="add-job-btn" onClick={() => {
            resetForm();
            setShowForm(true);
          }}>
            + Add Job
          </button>
        )}

        <h2>Search Job</h2>
        <input
          type="text"
          placeholder="Search by title, company, skills..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-box"
        />

        <ul className="job-list">
          {currentJobs.map((job) => (
            <li key={job.id} className="job-card">
              {/* <h3>{job.title}</h3> */}
              <h3 className="job-title" onClick={() => setSelectedJob(job)}>
  {job.title}
</h3>

              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
              <div className="job-actions">
                
          {isAdmin ? (
  <>
    <button onClick={() => handleEdit(job)}>Edit</button>
    <button onClick={() => handleDelete(job.id)}>Delete</button>
  </>
) : appliedJobs.includes(Number(job.id)) ? (
  <span className="applied-tag">Applied</span>
) : (
  <button onClick={() => navigate(`/applyjob/${job.id}`)}>Apply</button>
)}

              </div>
            </li>
          ))}
        </ul>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? 'active' : ''}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {showForm && isAdmin && (
          <AdminJobForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            onCancel={resetForm}
            editMode={editMode}
          />
        )}

        {selectedJob && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>{selectedJob.title}</h2>
      <p><strong>Company:</strong> {selectedJob.company}</p>
      <p><strong>Skills:</strong> {selectedJob.skills.join(', ')}</p>
      <p><strong>Description:</strong> {selectedJob.description}</p>
      <button onClick={closeModal} style={{ marginTop: '1rem' }}>Close</button>
    </div>
  </div>
)}

      </div>
      </div>
    </>
  );
};

export default JobList;
