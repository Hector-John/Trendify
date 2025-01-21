import { useNavigate } from 'react-router-dom';

const FailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fail-page">
      <p>Your payment was unsuccessful. Please try again.</p>
      <button className='but1' onClick={() => navigate('/checkout')}>Go to Checkout</button>
    </div>
  );
};

export default FailPage;
