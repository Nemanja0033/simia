import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import BlogPostCard from '../componnets/BlogPostCard';
import { ArrowDown } from 'lucide-react';
import Loader from '../ui/Loader';

const Home = () => {
  const [blog, setBlog] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollectionRef = collection(db, 'blogPosts');
      const data = await getDocs(blogCollectionRef);
      setBlog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  if(loading){
    return <Loader />
  }

  return (
    <div className='md:mt-20 mt-32 w-full flex flex-col items-center'>
      <h1 className='text-center text-2xl flex gap-2 items-center justify-center text-primary font-bold mt-6 mb-6'>
        Most Recent Blog Posts <ArrowDown />
      </h1>
      <div className='flex w-fulls md:h-screen flex-wrap gap-4 justify-center'>
        {blog.map((b, index) => (
          <div key={index}>
            <BlogPostCard image={b.thumbnail} heading={b.heading} />
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Home;
