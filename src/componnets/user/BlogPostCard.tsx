import {  ArrowRight } from "lucide-react"

type BlogProps = {
    image: string,
    heading: string,
}

const BlogPostCard = ({image, heading}: BlogProps) => {
  return (
    <div className='w-96 h-auto rounded-md shadow-md flex justify-center border border-base-200 mb-3 cursor-pointer'>
        <div className='flex-row w-[90%]'>
            <div className='flex justify-center mt-3 mb-3'>
                <img src={image} alt={heading} className='w-full rounded-lg aspect-auto hover:scale-105 transition-all' />
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl ml-8 font-bold text-center'>{heading}</h1>
            </div>
            <div className="flex justify-center mt-3 mb-3">
                <button className="flex gap-2 items-center btn btn-neutral bg-primary rounded-full border-none text-white hover:text-primary btn-sm">Read Article <ArrowRight /></button>
            </div>
        </div>
    </div>
  )
}

export default BlogPostCard