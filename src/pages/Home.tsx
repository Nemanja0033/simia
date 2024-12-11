import { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    // Očisti listener kada se komponenta uništi
    return () => unsubscribe();
  }, []);

  return (
    <div>
      Home
      <p>{userEmail ? `Welcome, ${userEmail}` : 'No user is logged in.'}</p>
    </div>
  );
};

export default Home;
