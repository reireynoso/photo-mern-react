import React from 'react'
import PhotoCard from './PhotoCard'

function PhotoContainer(props){
    console.log(props.photos)
    return (
        <div className="ui container">
            {
                props.photos.map(photo => {
                    return <PhotoCard key={photo._id}/>
                })
            }
        </div>
    )
}

export default PhotoContainer