import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { query, where, getDocs, collection } from 'firebase/firestore';
import Loader from '../loader/Loader';

const AdminProtectionRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfUserIsAdmin = async (userID: string) => {
      try {
        console.log("Checking if user is admin with userID:", userID);
        const q = query(collection(db, 'users'), where('userID', '==', userID));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('User document does not exist');
          setIsAdmin(false);
          setLoading(false); 
          return;
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data().admin;
          console.log('Admin status in db:', data);
          if (data === "true") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });

        setLoading(false); 
      } catch (error) {
        console.error('Error fetching admin status:', error);
        setIsAdmin(false);
        setLoading(false); 
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User UID onAuthStateChanged:', user.uid);
        checkIfUserIsAdmin(user.uid);
      } else {
        console.log('No user signed in');
        setIsAdmin(false);
        setLoading(false); 
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    console.log("Loading state...");
    return <Loader />;
  }

  if (isAdmin) {
    return children;
  }

  console.log("Redirecting to login...");
  return <Navigate to="/unauthorized" />;
};

export default AdminProtectionRoute;
