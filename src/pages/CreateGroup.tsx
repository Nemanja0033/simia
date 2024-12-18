import { useState } from "react"
import { createGroup } from "../api/createGroup";


const CreateGroup = () => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

  return (
    <div className="w-full h-96 flex justify-center justify-self-center">
        <div className="flex-row mt-20 md:w-1/3 w-full h-full shadow-md">
            <div className="flex justify-center mt-6">
                <h1 className="font-bold text-xl text-primary">Create New Group</h1>
            </div>
            <div className="flex justify-center mt-6">
                <input 
                    type="text" 
                    className="border rounded-md h-9 w-[90%] focus:ring-2 focus:ring-primary focus:outline-none" 
                    placeholder="Give group a name. . ."
                    onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className="flex justify-center mt-6">
                <textarea 
                    className="border rounded-md min-h-24 max-h-40 w-[90%] focus:ring-2 focus:ring-primary focus:outline-none" 
                    placeholder="Write short description about the gruop ideas, visions etc. . ."
                    onChange={(e) => {setDescription(e.target.value)}} />
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={() => createGroup(name, description)} className="border-none btn btn-md btn-neutral bg-primary text-black hover:text-primary w-[90%]">Submit</button>
            </div>
        </div>
    </div>
  )
}

export default CreateGroup