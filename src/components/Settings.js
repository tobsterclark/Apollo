import React, {useContext} from 'react'
import {auth} from './Firebase.js'
import userDetailsContext from '../contexts/userDetails'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'


const Settings = (props) => {
    const navigate = useNavigate()
    const { setUserDetails } = useContext(userDetailsContext)

    //Stupid design - needs cleaning up 
    //Please tell me if this code is in any sort of final build, I will hate myself forever
    const signOut = () => {
        setUserDetails({"displayName":""})
        auth.signOut().then(() => {
            navigate("/")
            toast.success("Signed out")
        })
    }


    return (
        <div className="h-full w-full z-10 flex justify-center items-center bg-theme-white rounded-lg lg:w-2/5">
            <div className="bg-theme-white h-full text-sm md:text-2xl lg:text-4xl font-sans font-light text-theme-black text-center z-10 flex justify-between flex-col py-10">
                <div className="flex md:gap-x-5 px-5 mb-2 justify-center items-center">Settings</div>
                <button className="mt-5 py-2 px-10 bg-theme rounded-2xl shadow-2xl text-white hover:bg-theme-light hover:text-black transition duration-150" onClick={() => signOut()}>Sign Out</button>
                <div>
                    <span className="text-lg">Display name: {auth.currentUser.displayName}</span>
                </div>
                
            </div>
        </div>
    )  
}


export default Settings