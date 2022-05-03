import React, {useState, useContext, useEffect} from 'react'
import loginInputContext from '../contexts/InputInfo'
import userDetailsContext from '../contexts/userDetails'
import {Outlet, Link, useLocation, useNavigate} from "react-router-dom"
import {auth} from './Firebase.js'
import toast from 'react-hot-toast'


const Login = (props) => {
    const {state, pathname} = useLocation()
    const [ previous, setPrevious] = useState("")
    const { input } = useContext(loginInputContext)
    const { setUserDetails } = useContext(userDetailsContext)
    const {email, password, phone, name} = input
    const navigate = useNavigate()
    const [loginStyles, setLoginStyles] = useState("")
    const [signupStyles, setSignupStyles] = useState("")

    useEffect(() => {
        if (state !== null) {
            setPrevious(state.prev)
        } 

        if (pathname === "/signup"){
            setSignupStyles("bg-theme py-2 px-5 md:px-10 flex-1 rounded-2xl shadow-2xl text-white")
            setLoginStyles("flex-1 py-2 px-5 md:px-10 hover:bg-theme-light transition duration-150 rounded-2xl")
        } else {
            setLoginStyles("bg-theme py-2 px-5 md:px-10 flex-1 rounded-2xl shadow-2xl text-white ")
            setSignupStyles("flex-1 py-2 px-5 md:px-10 hover:bg-theme-light transition duration-150 rounded-2xl")            
        }
    }, [email, password, name, phone, pathname, state])

    const onSubmit = () => {
        if (pathname === "/signup") {
            if (name === "") {
                toast.error("no name entered, please give a name")
            } else {
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCreds) => {
                        auth.currentUser.updateProfile({displayName:name, name:name}).then(() => {
                            setUserDetails({"displayName":userCreds.user.displayName})
                            toast.success("Successfully logged in!")
                            if (previous === "") {
                                navigate("/")
                            } else {
                                navigate(previous)
                            }  
                        }).catch((error)=>{toast.error("Error adding profile information - " + error.message)})
                    }).catch((error)=>{toast.error("Error creating account - " + error.message)})
            }
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then((userCreds) => {
                    setUserDetails({"displayName":userCreds.user.displayName})
                    toast.success("Successfully logged in!")
                    if (previous === "") {
                        navigate("/")
                    } else {
                        navigate(previous)
                    }
                }).catch((error)=>{toast.error("Error logging in - " + error.message)})
        }
    }

    return (
        <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white h-full w-full text-sm md:text-2xl lg:text-4xl lg:w-2/5 font-sans font-light text-theme-black text-center z-10 rounded-lg flex justify-between flex-col py-10">
                <div className="flex md:gap-x-5 px-10 mb-2 justify-center items-center">
                    <Link state={{prev:previous}} to="/login" className={loginStyles}>Log In</Link>
                    <Link state={{prev:previous}} to="/signup" className={signupStyles}>Sign Up</Link> 
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