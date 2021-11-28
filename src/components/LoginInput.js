import React, {Component} from 'react'


class loginInput extends Component {
    state = {
        email: "",
        password: ""
    }

    updateInputValue(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        }, () => {
            this.props.value(this.state)
        })
    }
    render() {
        return (
            <div className="flex flex-col justify-center text-center items-center text-xl gap-y-5">
                <div className="flex items-center gap-x-2 w-4/6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#17252A">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input className="py-2 px-5 border-b-2 border-theme w-full focus:outline-none focus:bg-theme-light" placeholder="Email" value={this.state.emailInputValue} name="email" onChange={evt => this.updateInputValue(evt)}/>
                </div>
                <div className="flex items-center gap-x-2 w-4/6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#17252A">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input className="py-2 px-5 border-b-2 border-theme w-full focus:outline-none focus:bg-theme-light" placeholder="Password" value={this.state.passwordInputValue} name="password" onChange={evt => this.updateInputValue(evt)}/>
                </div>
            </div>
        )
    }

}

export default loginInput