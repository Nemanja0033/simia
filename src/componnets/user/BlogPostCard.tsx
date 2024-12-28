import {  ArrowRight, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { openModal } from "../../helpers/openModal"
import { useComments } from "../../context/commentContext"
import { useState } from "react"
import { auth } from "../../../config/firebase"

type BlogProps = {
    image: string,
    heading: string,
}

const BlogPostCard = ({image, heading}: BlogProps) => {

    const { comments, addComment, showComments} = useComments();
    const [comment, setComment] = useState<string>("");

    const newComment = {
        author: auth.currentUser?.displayName,
        date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
        content: comment,
    }

    const handleClick = () => {
        openModal('my_modal_2');
        showComments(heading);
    }

  return (
    <div className='w-96 h-96 rounded-md shadow-md flex justify-center border border-base-200 mb-3 cursor-pointer'>
        <div className='flex-row w-[90%]'>
            <div className='flex justify-center mt-3 mb-3'>
                <img src={image} alt={heading} className='w-full h-52 rounded-lg aspect-auto' />
            </div>
            <div className='flex justify-center h-12 overflow-auto'>
                <h1 className='text-xl  font-bold text-center'>{heading}</h1>
            </div>
            <div className="flex justify-center mt-3 mb-3">
                <Link to={`article/${heading}`}><button className="flex gap-2 items-center btn btn-neutral bg-primary rounded-full border-none text-white hover:text-primary btn-sm">Read Article <ArrowRight /></button></Link>
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={handleClick} className="hover:text-primary flex gap-1 items-center"><MessageSquare size={18} /> Comments</button>
                <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex justify-center">
                    <div className="flex-row">
                        <h3 className="font-bold text-lg text-center">Comments</h3>
                        <div className="flex flex-col gap-6 overflow-auto max-h-64 min-h-32">
                            {comments.length < 1 ? <h1 className="text-center font-bold mt-12">No Comments Yet!</h1>
                            :
                            comments.map((c,index) => (
                                <div key={index} className="flex items-start gap-4 p-4 mb-3 rounded-md shadow-md">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                    <span className="font-bold text-primary">{c.author}</span>
                                    <span className="text-sm text-gray-500">{c.date}</span>
                                    </div>
                                    <p className="text-gray-700">{c.content}</p>
                                </div>
                                </div>
                            ))}
                            </div>
                        <div className="flex justify-start gap-3">
                            <input onChange={(e) => setComment(e.target.value)} className="focus:ring-2 focus:ring-primary focus:outline-none rounded-md border border-primary" placeholder="Write Comment. . ." type="text" />
                            <button onClick={() => addComment(heading, newComment)} className="btn border-none btn-sm btn-neutral bg-primary text-white hover:text-primary">Submit</button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                </dialog>
            </div>
        </div>
    </div>
  )
}

export default BlogPostCard