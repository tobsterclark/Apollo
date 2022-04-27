import React, {useState, useContext, useEffect} from 'react'
import loginInputContext from '../contexts/InputInfo'
import userDetailsContext from '../contexts/userDetails'
import {Outlet, Link, useLocation, useNavigate} from "react-router-dom"
import {auth} from './Firebase.js'


const Login = (props) => {
    const { input } = useContext(loginInputContext)
    const { setUserDetails } = useContext(userDetailsContext)
    const {email, password, phone, name} = input
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [loginStyles, setLoginStyles] = useState("")
    const [signupStyles, setSignupStyles] = useState("")

    useEffect(() => {
        if (pathname === "/signup"){
            setSignupStyles("bg-theme rounded-xl py-2 px-5 md:px-10 flex-1 shadow-lg")
            setLoginStyles("flex-1 py-2 px-5 md:px-10")
        } else {
            setLoginStyles("bg-theme rounded-xl py-2 px-5 md:px-10 flex-1 shadow-lg")
            setSignupStyles("flex-1 py-2 px-5 md:px-10")            
        }
    }, [email, password, name, phone, pathname])

    const onSubmit = () => {
        if (pathname === "/signup") {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCreds) => {
                    auth.currentUser.updateProfile({displayName:name, name:name}).then(() => {
                        setUserDetails({"displayName":userCreds.user.displayName})
                        navigate(-1)
                    }).catch(()=>{alert("error creating account")})
                }).catch(()=>{alert("error creating account - username and password may be not formatted (min 6 characters for the password)")})
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then((userCreds) => {
                    setUserDetails({"displayName":userCreds.user.displayName})
                    navigate(-1)
                }).catch(()=>{alert("error logging in - username and password may be not right")})
        }
    }

    return (
        <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white h-full w-full text-sm md:text-2xl lg:text-4xl lg:w-2/5 font-sans font-light text-theme-black text-center z-10 rounded-lg flex justify-between flex-col py-10">
                <div className="flex md:gap-x-5 px-10 mb-2 justify-center items-center">
                    <Link to="/login" className={loginStyles}>Log In</Link>
                    <Link to="/signup" className={signupStyles}>Sign Up</Link> 
                </div>
                <Outlet />
                <div>
                    <button className="mt-5 py-2 px-10 bg-theme rounded-2xl shadow-2xl text-white hover:bg-theme-light hover:text-black transition duration-150" onClick={() => onSubmit()}>Submit</button>
                </div>
                
            </div>
        </div>
    )  
}


export default Login