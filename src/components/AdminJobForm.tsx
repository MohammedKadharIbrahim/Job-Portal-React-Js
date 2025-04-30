import React from 'react';
interface Job {
  id: number;
  title: string;
  company: string;
  skills: string[];
  description: string;
}

interface AdminJobFormProps {
  formData: Job;
  setFormData: React.Dispatch<React.SetStateAction<Job>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  editMode: boolean;
}

const AdminJobForm: React.FC<AdminJobFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editMode
}) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editMode ? 'Edit Job' : 'Add Job'}</h2>
        <form className="job-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={formData.skills.join(', ')}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
          />
          <textarea
            placeholder="Job Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">{editMode ? 'Update' : 'Add'} Job</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminJobForm;
