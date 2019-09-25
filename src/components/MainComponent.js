import React, { Component } from 'react'
import NewPhotoForm from './NewPhotoForm'

export default class MainComponent extends Component {
    render() {
        return (
            <div>
                {this.props.newPhotoForm ? <NewPhotoForm genres={this.props.genres} currentUser={this.props.currentUser}/> : <p>Off</p>}
            </div>
        )
    }
}
