import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { markJobAsApplied } from '../store/jobSlice';
import { MultiValue } from 'react-select';
import './applyjob.css';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';

const skillOptions = Array.from({ length: 30 }, (_, i) => ({
  label: `Skill ${i + 1}`,
  value: `skill_${i + 1}`,
}));
interface OptionType {
  label: string;
  value: string;
}

export default function ApplyJob() {
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numericJobId = jobId ? parseInt(jobId, 10) : null;

  // Log jobId and numericJobId for debugging
  useEffect(() => {
    console.log('jobId:', jobId);
    console.log('numericJobId:', numericJobId);
  }, [jobId, numericJobId]);

  return (
    <div className="apply-job-form">
      <h2>Apply for Job {numericJobId}</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          skills: [],
          aboutMe: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          skills: Yup.array().min(1, 'Select at least one skill'),
        })}
        onSubmit={(values, { setSubmitting }) => {
  if (numericJobId && !isNaN(numericJobId)) {
    dispatch(markJobAsApplied(numericJobId)); // Dispatch the job ID to mark as applied
    alert('Application submitted!');
    navigate('/joblist'); // Navigate back to the job list
  } else {
    console.error('Invalid job ID:', numericJobId);
    alert('Error: Invalid job ID');
  }
  setSubmitting(false);
}}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div>
              <label>First Name</label>
              <Field name="firstName" className="form-input" />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>

            <div>
              <label>Last Name</label>
              <Field name="lastName" className="form-input" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div>
              <label>Email</label>
              <Field name="email" type="email" className="form-input" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label>Skills</label>
              <Select<OptionType, true>
                isMulti
                name="skills"
                options={skillOptions}
                value={values.skills}
                onChange={(val: MultiValue<OptionType>) =>
                  setFieldValue('skills', val)
                }
              />
              <ErrorMessage name="skills" component="div" className="error" />
            </div>

            <div>
              <label>About Me</label>
              <ReactQuill
                value={values.aboutMe}
                onChange={(content) => setFieldValue('aboutMe', content)}
              />
            </div>

            <button type="submit" className="submit-btn">Submit Application</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
