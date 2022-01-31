import React from 'react'



const Book = (props) => {

    return (
        <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white flex flex-col justify-between items-center h-full w-4/5 rounded-lg">
                <div>
                    <span>Your bookings</span>
                </div>
                {/* any bookings */}

                <div>
                    <span>example booking</span>
                </div>

                {/* placeholder div to center the bookings */}
                <div />
            </div>
        </div>
    )  
}


export default Book