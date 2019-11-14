import React from 'react'

export default function PhotoCard(props){

    return (
        <div className="column">
            {/* <div style={open ? mod}> */}
                <div className="ui fluid card">
                    <div className="image image-card" onClick={() => props.handleOpenModal(props.photo)}>
                        <img alt={props.photo.image} src={props.photo.image}/>
                    </div>

                </div>
                {/* <div className="content">
                    <a className="header">{props.photo.owner.name}</a>
                </div> */}
            {/* </div> */}
        </div>
    )
}