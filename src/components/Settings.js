import React, {useContext} from 'react'
import {auth} from './Firebase.js'
import userDetailsContext from '../contexts/userDetails'
import { useNavigate } from 'react-router'


const Settings = (props) => {
    const navigate = useNavigate()
    const { setUserDetails } = useContext(userDetailsContext)

    //Stupid design - needs cleaning up 
    //Please tell me if this code is in any sort of final build, I will hate myself forever
    const signOut = () => {
        setUserDetails({"displayName":""})
        auth.signOut().then(() => {
            navigate("/")
        })
    }


    return (
        <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white h-full w-full text-sm md:text-2xl lg:text-4xl lg:w-2/5 font-sans font-light text-theme-black text-center z-10 rounded-lg flex justify-between flex-col py-10">
                <div className="flex md:gap-x-5 px-10 mb-2 justify-center items-center">Settings</div>
                <button onClick={() => signOut()}>Sign Out</button>
                <div>
                    <span>name: {auth.currentUser.displayName}</span>
                </div>
                
            </div>
        </div>
    )  
}


export default Settings