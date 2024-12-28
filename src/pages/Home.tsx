import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import BlogPostCard from '../componnets/user/BlogPostCard';
import { ArrowDown } from 'lucide-react';

const Home = () => {
  
  const [blog, setBlog] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollectionRef = collection(db, 'blogPosts');
      const data = await getDocs(blogCollectionRef);
      setBlog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchBlogs();
  }, []);

  return (
    <div className='md:mt-20 mt-32 w-full flex flex-col items-center'>
      <h1 className='text-center text-2xl flex gap-2 items-center justify-center text-primary font-bold mt-6 mb-6'>
        Most Recent Blog Posts <ArrowDown />
      </h1>
      <div className='flex flex-wrap gap-4 justify-center'>
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
