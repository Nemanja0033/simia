import { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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
