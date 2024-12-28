import { useState } from "react"
import { createGroup } from "../api/createGroup";
import { useMember } from "../context/memberContext";


const CreateGroup = () => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { isMember } = useMember();

    if(isMember == ''){
        return (
            <div className="w-full h-96 flex justify-center justify-self-center md:mt-20 mt-32">
                <div className="flex-row mt-20 md:w-1/3 w-full h-full md:shadow-md">
                    <div className="flex justify-center mt-6">
                        <h1 className="font-bold text-xl text-primary">Create New Group</h1>
                    </div>
                   <form onSubmit={(e) => { e.preventDefault(); createGroup(name, description)}}>
                    <div className="flex justify-center mt-6">
                            <input 
                                required
                                type="text" 
                                className="border rounded-md h-9 w-[90%] focus:ring-2 focus:ring-primary focus:outline-none" 
                                placeholder="Give group a name. . ."
                                onChange={(e) => {setName(e.target.value)}} />
                        </div>
                        <div className="flex justify-center mt-6">
                            <textarea
                                required
                                className="border rounded-md min-h-24 max-h-40 w-[90%] focus:ring-2 focus:ring-primary focus:outline-none" 
                                placeholder="Write short description about the gruop ideas, visions etc. . ."
                                onChange={(e) => {setDescription(e.target.value)}} />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="border-none btn btn-md btn-neutral bg-primary text-black hover:text-primary w-[90%]">Submit</button>
                        </div>
                   </form>
                </div>
            </div>
          )
        }

        else{
            return (
                <div className="w-full h-screen flex justify-center items-center">
                    <h1 className="text-3xl">You Are Arleady Member Of <b>{isMember}</b> Group</h1>
                </div>
            )
        }
    }

export default CreateGroup