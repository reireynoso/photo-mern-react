import React from 'react'
import PhotoCard from './PhotoCard'

function PhotoContainer(props){
    console.log(props.photos)
    return (
        <div style={{marginTop: '14px'}}>
            <div className="ui three column grid">
            {
                props.photos.map(photo => {
                    return <PhotoCard key={photo._id} photo={photo}/>
                })
            }
            </div>
        </div>
    )
}

export default PhotoContainer