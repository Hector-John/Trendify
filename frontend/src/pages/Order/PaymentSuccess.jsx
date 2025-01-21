import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 60000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page">
      <div className="loader">Processing your order...</div>
      <p>Your payment was successful! You will be redirected shortly.</p>
      <button className='but1' onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default SuccessPage;
