import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react'
import { createBlogPost } from '../api/createBlog';

const BlogEditor = () => {

    const [blogHeading, setBlogHeading] = useState<string>("");
    const [blogContent, setBlogContent] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");

  return (
    <div className='w-full h-screen flex justify-center'>
        <div className='w-full flex-row mt-8'>
            <div className='flex justify-center mt-12 mb-5'>
                <h1 className='text-3xl font-bold text-primary'>Write New Blog Post</h1>
            </div>
            <div className='flex justify-center mb-5'>
            <input className="focus:ring-2 focus:ring-primary md:w-1/3 w-[90%] h-12 focus:outline-none rounded-md border border-primary" type="text" placeholder="Group Name. . ." value={groupName} onChange={(e) => {setGroupName(e.target.value)}} />
            </div>
            <div className='flex justify-center w-full mb-6'>
                <input className="focus:ring-2 focus:ring-primary md:w-1/3 w-[90%] h-12 focus:outline-none rounded-md border border-primary" type="text" placeholder="Blog Heading. . ." value={blogHeading} onChange={(e) => {setBlogHeading(e.target.value)}} />
            </div>
            <div className='flex justify-center w-full mb-6'>
                <input className="focus:ring-2 focus:ring-primary md:w-1/3 w-[90%] h-12 focus:outline-none rounded-md border border-primary" type="text" placeholder="Thumbnail URL (beta). . ." value={thumbnail} onChange={(e) => {setThumbnail(e.target.value)}} />
            </div>
            <div className='flex justify-center w-full'>
                <Editor value={blogContent} initialValue='Write Your Blog Content Here. . .' apiKey='eyi1wukwullyehuy1q33z6ypg5liqk2sq6tf32gy9u40drly' onEditorChange={(newText) => setBlogContent(newText) } />
            </div>
            <div className='flex justify-center mt-6'>
                <button onClick={() => createBlogPost(blogHeading, blogContent, groupName, thumbnail)} className="btn-neutral btn bg-primary text-white md:w-1/3 hover:text-primary border-none">Post</button>
            </div>
        </div>
    </div>
  )
}

export default BlogEditor