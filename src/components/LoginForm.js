import React, { Component, Fragment } from 'react'

export default class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    handleOnChange = (e) => {
        // console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
            //    this.state 
                {
                   email: this.state.email,
                   password: this.state.password 
                }
            )
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                this.setState({
                    error: data.error
                })
                return console.log(data.error)
            }
            // console.log(data)
            localStorage.setItem("token", data.token)
            this.props.handleCurrentUser(data.user)
        })
    }
    
    render() {
        return (
            <div className="ui container custom-form">
                <form className="ui error form" onSubmit={this.handleOnSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" required onChange={this.handleOnChange} value={this.state.username} placeholder="Email"/>
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" required onChange={this.handleOnChange} value={this.state.password} placeholder="Password"/>
                    </div>

                    {
                        this.state.error ? 
                        <Fragment>
                            <div className="ui error message">
                                <div className="header">Error</div>
                                <p>{this.state.error}</p>
                            </div>
                        </Fragment>
                        :
                        null
                    }

                    <button className="ui button" type="submit">Login</button>
                </form>  
            </div>
        )
    }
}
