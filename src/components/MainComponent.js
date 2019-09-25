import React, { Component } from 'react'
import NewPhotoForm from './NewPhotoForm'
import PhotoContainer from './PhotoContainer'

export default class MainComponent extends Component {
    render() {
        // console.log(this.props.photos)
        return (
            <div className="ui container">
                {
                    this.props.newPhotoForm ? 
                        <NewPhotoForm handleAddNewPhoto={this.props.handleAddNewPhoto} genres={this.props.genres} currentUser={this.props.currentUser}/> 
                        : 
                        <PhotoContainer photos={this.props.photos}/>
                }
            </div>
        )
    }
}
