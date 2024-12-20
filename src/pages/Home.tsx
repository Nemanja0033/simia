import { useAuth } from '../context/authContext';

const Home = () => {
  const {userName, isAuth} = useAuth()

  return (
    <div className='md:mt-20 mt-32'>
      Home
      <p>{isAuth ? `Welcome, ${userName}` : 'No user is logged in.'}</p>
    </div>
  );
};

export default Home;
