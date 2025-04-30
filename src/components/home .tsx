import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => navigate('/apply-job')}>Apply for Job</button>
      <br /><br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
 