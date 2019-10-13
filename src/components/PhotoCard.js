import React from 'react'

export default function PhotoCard(props){
    // console.log(props)
    return (
        <div className="column">
            <div className="ui fluid card">
            <div className="image">
                <img src={props.photo.image}/>
            </div>
            <div className="content">
                <a className="header">{props.photo.owner.name}</a>
            </div>
            </div>
        </div>
    )
}