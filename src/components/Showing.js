import React, {Component} from 'react'

class Showing extends Component {
    render() {
        return (
            <div className="bg-white z-10 w-full py-20">
                <div className="flex flex-col items-center gap-y-20 font-sans font-light">
                    <span className="text-4xl">Now Showing</span>
                    <div className="flex gap-x-20">
                        <div>
                            <span>Movie 1</span>
                        </div>
                        <div>
                            <span>Movie 2</span>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }

}

export default Showing