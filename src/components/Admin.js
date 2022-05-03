import React, {useContext, useEffect, useState} from 'react'
import database from './Firebase'
import {auth} from './Firebase.js'
import userDetailsContext from '../contexts/userDetails'
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import toast from 'react-hot-toast'


const Admin = (props) => {
    const navigate = useNavigate()
    const { setUserDetails } = useContext(userDetailsContext)
    const [ edit, setEdit ] = useState([""])
    const [ editFood, setEditFood ] = useState({})
    const [ data, setData ] = useState(false)
    const [ newKey, setNewKey ] = useState(Date.now()+"new")
    const dbFood = database.ref('food')

    //Stupid design - needs cleaning up 
    //Please tell me if this code is in any sort of final build, I will hate myself forever
    const signOut = () => {
        setUserDetails({"displayName":""})
        auth.signOut().then(() => {
            navigate("/")
            toast.success("Signed out")
        })
    }

    useEffect(() => {
        const food = {}
        database.ref("food").once("value", (snapshot) => {
            snapshot.forEach(snap => {
                food[snap.val().food] = {
                    "name": snap.val().food,
                    "price": snap.val().price,
                    "stock": snap.val().stock
                }
            })
        }).then(() => {
            setNewKey(Date.now()+"new")
            food["new card"] = {
                "name": "name",
                "price": "0",
                "stock": "0"
            }
            setEditFood(food)
            setNewKey(Date.now()+"new")
            setData(true)
        })
    }, [])

    

    const editButton = (food) => {
        const newEdit = [...edit]
        newEdit.push(food)
        setEdit(newEdit)
    }

    const addFood = () => {
        const food = editFood["new card"].name
        const price = editFood["new card"].price
        const stock = editFood["new card"].stock
        const toastId = toast.loading("Adding "+food)
        if (food !== "name" && price !== "0" && stock !== "0") {
            dbFood.child(Date.now()).set({"food":food, "price":parseInt(price), "stock":parseInt(stock)}).then(() => {toast.success(food + " successfully added", {id:toastId})})
        }

        const newEditFood = Object.assign({}, editFood)
        newEditFood[food] = {
            "name": food,
            "price": price,
            "stock": stock
        }

        setNewKey(Date.now()+"new")
        newEditFood["new card"] = {
            "food": "name",
            "price": "0",
            "stock": "0"
        }

        setEditFood(newEditFood)
        setNewKey(Date.now()+"new")

    }

    const doneButton = (food) => {
        const toastId = toast.loading("Saving "+food.name)
        dbFood.once("value", (snapshot) => {
            snapshot.forEach(snap => {
                if (snap.val().food === food.name) {
                    dbFood.child(snap.key).update({"stock":parseInt(food.stock), "price":food.price}).then(() => {
                        toast.success(food.name + " successfully edited", {id:toastId})

                        const newEdit = [...edit]
                        const index = newEdit.indexOf(food)
                        newEdit.splice(index, 1)
                        setEdit(newEdit)
                    })
                }
            })
        })

        
    }
    const deleteButton = (food) => {
        const toastId = toast.loading("Deleting "+food.name)
        dbFood.once("value", (snapshot) => {
            snapshot.forEach(snap => {
                if (snap.val().food === food.name) {
                    dbFood.child(snap.key).remove().then(() => {

                        toast.success(food.name + " successfully removed", {id:toastId})

                        const newEditFood = Object.assign({}, editFood)
                        delete newEditFood[food.name]
                        setEditFood(newEditFood)
                    })
                }
            })
        })
    }
    const pushEditFood = (key, option, data) => {
        const newEditFood = Object.assign({}, editFood)
        newEditFood[key][option] = data

        setEditFood(newEditFood)
    }

    const newCard = () => {
        return (
            <div key={newKey} className="flex p-3 text-left shadow-inner items-start border-4 border-theme-light rounded-2xl w-full">
                <div className="flex flex-col w-3/4">
                    <div className="flex gap-x-5 py-3">
                        <span className="font-bold">name: </span>
                        <input value={editFood["new card"].name} onChange={(evt) => pushEditFood("new card", "name", evt.target.value)} className="px-2 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light"/>
                    </div>
                    <div className="flex gap-x-2 overflow-hidden">
                        <span className="">price: </span>
                        <input value={editFood["new card"].price} onChange={(evt) => pushEditFood("new card", "price", evt.target.value)} className="px-2 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light"/>
                    </div>
                    <div className="flex gap-x-5">
                        <span className="">stock: </span>
                        <input value={editFood["new card"].stock} onChange={(evt) => pushEditFood("new card", "stock", evt.target.value)} className="px-2 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light"/>
                    </div>
                </div>
                <div className="w-1/4 text-right p-3">
                    <button className="text-sm " onClick={() => {addFood()}}>add</button>
                </div>
            </div>
        )
    }

    const returnCard = (currentFood, key) => {
        if (edit.includes(currentFood.name)) {
            return (
                <div key={key} className="flex p-3 text-left shadow-inner items-start border-4 border-theme-light rounded-2xl w-full">
                    <div className="flex flex-col w-3/4">
                        <div className="flex gap-x-5 py-3 w-full">
                            <span className="font-bold">name: </span>
                            <span>{currentFood.name}</span>
                            
                        </div>
                        <div className="flex gap-x-2 overflow-hidden w-full">
                            <span className="">price: </span>
                            <input value={editFood[currentFood.name].price} onChange={(evt) => pushEditFood(currentFood.name, "price", evt.target.value)} className="px-2 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light"/>
                        </div>
                        <div className="flex gap-x-5 w-full">
                            <span className="">stock: </span>
                            <input value={editFood[currentFood.name].stock} onChange={(evt) => pushEditFood(currentFood.name, "stock", evt.target.value)} className="px-2 border-b-2 rounded-t-lg border-theme w-full focus:outline-none focus:bg-theme-light"/>
                        </div>
                    </div>
                    <div className="w-1/4 text-right p-3">
                        <button className="text-sm " onClick={() => {doneButton(currentFood)}}>done</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={key} className="flex p-3 text-left shadow-inner items-start border-4 border-theme-light rounded-2xl w-full">
                    <div className="flex flex-col w-3/4">
                        <div className="flex gap-x-5 py-3">
                            <span className="font-bold">{currentFood.name}</span>
                        </div>
                        <div className="flex gap-x-5">
                            <span className="">price: {currentFood.price}</span>
                        </div>
                        <div className="flex gap-x-5">
                            <span className="">stock: {currentFood.stock}</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/4 text-right text-sm p-3">
                        <button className="" onClick={() => {editButton(currentFood.name)}}>edit</button>
                        <button className="" onClick={() => {deleteButton(currentFood)}}>delete</button>
                    </div>
                </div>
            )}
    }

    const grabData = () => {
        const output = []
        const output1 = []
        const output2 = []

        if (Object.keys(editFood).length > 2) {
            for (let i = 0; i < Object.keys(editFood).length; i++) {
                const currentFood = editFood[Object.keys(editFood)[i]]
                if (Object.keys(editFood)[i] === "new card") {
                    output1.unshift(newCard())
                } else if (i % 2 === 0) {
                    output1.push(returnCard(currentFood, i))
                } else {
                    output2.push(returnCard(currentFood, i))
                }
            }
            
            return(
                <div className="space-x-5 flex w-full justify-around">
                    <span className="space-y-3 flex flex-col w-1/3">{output1}</span>
                    <span className="space-y-3 flex flex-col w-1/3">{output2}</span>
                </div>
            )
        } else if (data){
            for (let i = 0; i < Object.keys(editFood).length; i++) {
                const currentFood = editFood[Object.keys(editFood)[i]]
                if (Object.keys(editFood)[i] !== "new card") {
                    output.push(returnCard(currentFood, i))
                } else {
                    output.unshift(newCard())
                }
            }

            output.push(newCard())

            return(
                <div className="w-full justify-center flex">
                    <span className="w-1/3 flex flex-col space-y-3">{output}</span>
                </div>
            )
        } 
    }

    if (auth.currentUser === null || auth.currentUser.uid !== "sglIHO7BjfW7solE7uKU6e3PiCb2") {
        return (
            <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white flex flex-col justify-center items-center h-full w-4/5 rounded-lg">
                <span>This page is only accessible for admins</span>
                <span>press <Link state={{prev:"/bookings"}} to="/login" className='text-theme'>here</Link> to sign in</span>
            </div>
            </div>
        )
    } else {
        return(
        <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white flex flex-col justify-between items-center h-full w-4/5 rounded-lg">
                <div className='flex w-full justify-around m-5'>
                    <div className="text-md text-white select-none">log out</div>
                    <span className='text-4xl'>Food Available</span>
                    <button className="text-md" onClick={() => signOut()}>log out</button>
                </div>
                {/* any bookings */}

                <div className="overflow-y-auto w-full items-center justify-center">
                    {grabData()}
                </div>

                {/* placeholder div to center the bookings */}
                <div />
            </div>
        </div>
        )
    }  
}


export default Admin