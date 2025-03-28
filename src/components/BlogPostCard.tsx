import {  ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { BlogProps } from "../types/BlogPostCardType"

const BlogPostCard = ({image, heading}: BlogProps) => {

  return (
    <div className='w-96 h-96 rounded-md shadow-md flex justify-center border border-base-200 md:mb-3 cursor-pointer mb-12'>
        <div className='flex-row w-[90%]'>
            <div className='flex justify-center mt-3 mb-3'>
                <img src={image} alt={heading} className='w-full h-52 rounded-lg aspect-auto' />
            </div>
            <div className='flex justify-center h-20 overflow-auto'>
                <h1 className='text-xl  font-bold text-center'>{heading}</h1>
            </div>
            <div className="flex justify-center mt-3 mb-3">
                <Link to={`article/${heading}`}><button className="flex gap-2 items-center btn btn-neutral bg-primary rounded-full border-none text-white hover:text-primary btn-sm">Read Article <ArrowRight /></button></Link>
            </div>
        </div>
    </div>
  )
}

export default BlogPostCard