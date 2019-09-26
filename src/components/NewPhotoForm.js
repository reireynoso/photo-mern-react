import React, { Component } from 'react'

export default class NewPhotoForm extends Component {
    state = {
        name: "",
        description: "",
        likes: 0,
        // image: "",
        owner: this.props.currentUser._id,
        genre: ""
    }

    fileInput = React.createRef();

    handleGenreSelect = (e) => {
        // console.log(e.target.value)
        // console.log(this.props.currentUser)
        this.setState({
            genre: e.target.value
        })
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // console.log(this.fileInput.current.files[0])
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('likes', this.state.likes)
        formData.append('image', this.fileInput.current.files[0])
        formData.append('genre', this.state.genre)
        // console.log(formData)
        this.props.handleAddNewPhoto(formData)
    }

    render() {
        // console.log(this.state)
        return (
            <div className="ui container custom-form">
                <form className="ui error form" onSubmit={this.handleOnSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" required onChange={this.handleOnChange} value={this.state.name} placeholder="Name of Image"/>
                    </div>

                    <div className="field">
                        <label>Description</label>
                        <input type="text" name="description" required onChange={this.handleOnChange} value={this.state.description} placeholder="Description of photo"/>
                    </div>

                    <div className="field">
                        <label>Image</label>
                        <input type="file" name="image" required ref={this.fileInput} value={this.state.image}/>
                    </div>

                    <div className="field">
                        <label>Genre</label>
                        <select required name="genre" onChange={this.handleOnChange}>
                        
                            <option value="">Select Genre</option>
                            {this.props.genres.map(genre => {
                                // console.log(genre)
                                return <option key={genre._id} value={genre._id}>{genre.name}</option>
                            })}

                        </select>
                    </div>
                    <button className="ui button" type="submit">Login</button>
                </form>  
            </div>
        )
    }
}
