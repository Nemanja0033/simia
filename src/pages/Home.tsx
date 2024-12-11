import { useState } from 'react';
import { useAuth } from '../context/authContext';

const Home = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const {userName, isAuth} = useAuth()

  return (
    <div>
      Home
      <p>{isAuth ? `Welcome, ${userName}` : 'No user is logged in.'}</p>
    </div>
  );
};

export default Home;
