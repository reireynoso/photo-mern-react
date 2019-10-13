import React, { Component, Fragment } from 'react'
import NewPhotoForm from './NewPhotoForm'
import PhotoContainer from './PhotoContainer'
import Filter from './FilterComponent'

export default class MainComponent extends Component {

    state = {
        genreName: "",
        search: "",
        viewUserPhotos: false
    }

    handleViewUserPhotos = () => {
        this.setState({
            viewUserPhotos: !this.state.viewUserPhotos
        })
    }
    handleGenreSelectFilter = (name) => {
        this.setState({
            genreName: name
        })
    }

    handleSearchFilter = (search) => {
        this.setState({
            search: search
        })
    }

    filter = (photos) => {
        // console.log(this.props.currentUser)
        // console.log(photos[0].owner._id)
        if(this.state.viewUserPhotos){
            return photos.filter(photo => photo.owner._id === this.props.currentUser._id && photo.name.includes(this.state.search) && photo.genre.name.includes(this.state.genreName))
        }
        else{
            return photos.filter(photo => photo.name.includes(this.state.search) && photo.genre.name.includes(this.state.genreName))
        }
        
    }
    render() {
        // console.log(this.props.photos)
        return (
            <div className="ui container">
                {
                    this.props.newPhotoForm ? 
                        <NewPhotoForm handleAddNewPhoto={this.props.handleAddNewPhoto} genres={this.props.genres} currentUser={this.props.currentUser}/> 
                        :
                        <Fragment>
                            <Filter handleViewUserPhotos={this.handleViewUserPhotos} handleSearchFilter={this.handleSearchFilter} genres = {this.props.genres} handleGenreSelectFilter={this.handleGenreSelectFilter}/> 
                            <PhotoContainer photos={this.filter(this.props.photos)}/>
                        </Fragment>
                }
            </div>
        )
    }
}
