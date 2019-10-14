import React, { useState } from 'react'
import PhotoCard from './PhotoCard'


function PhotoContainer(props){
    return (
        <div>
            <div className="ui three column grid">
            {
                props.photos.map(photo => {
                    return <PhotoCard key={photo._id} handleOpenModal={props.handleOpenModal} photo={photo}/>
                })
            }
            </div>
        </div>
    )
}

export default PhotoContainer