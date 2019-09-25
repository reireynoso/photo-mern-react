import React, { Component } from 'react'

export default class NewPhotoForm extends Component {
    state = {
        name: "",
        description: "",
        likes: "",
        image: "",
        owner: "",
        genre: ""
    }

    handleGenreSelect = (e) => {
        console.log(e.target.value)
    }
    render() {
        return (
            <div className="ui container custom-form">
                <form className="ui error form" onSubmit={this.handleOnSubmit}>
                    <div className="field">
                        <label>Email</label>
                        {/* <input type="text" name="email" required onChange={this.handleOnChange} value={this.state.username} placeholder="Email"/> */}
                    </div>

                    <div className="field">
                        <label>Password</label>
                        {/* <input type="password" name="password" required onChange={this.handleOnChange} value={this.state.password} placeholder="Password"/> */}
                    </div>

                    <select onChange={this.handleGenreSelect}>
                        <option>Select</option>
                        {this.props.genres.map(genre => {
                            return <option>Two</option>
                        })}

                    </select>
                    <button className="ui button" type="submit">Login</button>
                </form>  
            </div>
        )
    }
}
