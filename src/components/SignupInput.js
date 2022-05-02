import React, {useContext, useState} from 'react'
import loginInputContext from '../contexts/InputInfo'

const LoginInput = () => {
    const { input, setInput } = useContext(loginInputContext)
    const {email, password, phone, name} = input
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [nameError, setNameError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    const updateEmail = (evt) => {setInput({"email":evt.target.value, "password":password, "phone":phone, "name":name})}
    const updatePassword = (evt) => {setInput({"email":email , "password":evt.target.value, "phone":phone, "name":name})}
    const updatePhone = (evt) => {setInput({"email":email , "password":password, "phone":evt.target.value, "name":name})}
    const updateName = (evt) => {setInput({"email":email , "password":password, "phone":phone, "name":evt.target.value})}


    const checkEmail = () => {
        if (email.includes("@") === false) {
            setEmailError("Email must contain an @")
        } else {
            setEmailError("")
        }
    }
    const checkPassword = () => {
        if (password.length < 6) {
            setPasswordError("Min 6 characters")
        } else if (password === email) {
            setPasswordError("Password and email cannot be the same")
        } else {
            setPasswordError("")
        }
    }
    const checkPhone = () => {
        if (phone.length === 0) {
            setPhoneError("Must include your phone number")
        } else {
            setPhoneError("")
        }
    }
    const checkName = () => {
        if (name.length === 0) {
            setNameError("Must include your name")
        } else {
            setNameError("")
        }
    }

    return (
        <div className="flex flex-col justify-center text-center items-center text-sm md:text-xl gap-y-2 md:gap-y-5">
            <div className="flex items-center gap-x-2 w-4/6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col w-full">
                    <span className="text-left text-red-500 text-xs">{emailError}</span>
                    <input className="py-2 px-5 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light" placeholder="Email" value={email} name="email" onBlur={() => checkEmail()} onChange={evt => updateEmail(evt)}/>
                </div>
            </div>
            <div className="flex items-center gap-x-2 w-4/6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#17252A">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div className="flex flex-col w-full">
                    <span className="text-left text-red-500 text-xs">{passwordError}</span>
                    <input className="py-2 px-5 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light" type="password" placeholder="Password" value={password} name="password" onBlur={() => checkPassword()} onChange={evt => updatePassword(evt)}/>
                </div>
            </div>
            <div className="flex items-center gap-x-2 w-4/6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col w-full">
                    <span className="text-left text-red-500 text-xs">{phoneError}</span>                
                    <input className="py-2 px-5 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light" placeholder="Mobile Phone" value={phone} name="phone" onBlur={() => checkPhone()} onChange={evt => updatePhone(evt)}/>
                </div>
            </div>
            <div className="flex items-center gap-x-2 w-4/6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#17252A">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="flex flex-col w-full">
                    <span className="text-left text-red-500 text-xs">{nameError}</span>
                    <input className="py-2 px-5 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light" placeholder="Name" value={name} name="name" onBlur={() => checkName()} onChange={evt => updateName(evt)}/>
                </div>
            </div>
        </div>
    )
}
export default LoginInput