import React from 'react'

export default function ModalDisplay(props) {
    // console.log(props.viewPhoto)
    const modal = {
        // display: "none",
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(0,0,0)",
        backgroundColor: "rgb(0,0,0,0.4)"
      }
    const innerModal = {
        marginTop: "5%",
        height: "80%",
        border: "2px solid black",
        borderRadius: "10px",
        backgroundColor: "white",
        overflow: "scroll"
    }

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        margin: "20px"
    }
    return (
        <div onClick={props.handleModalClick} id="myModal" style={modal}>
          <div className="ui container" style={innerModal}>
            <div style={headerStyle}>
                <div>
                    <h3>By: {props.viewPhoto.owner.name}</h3>
                </div>
                <div>
                    <button onClick={() => props.handlePhotoLike(props.viewPhoto)} className="ui red button"><i className="heart icon"></i>Like</button>
                    <button className="ui orange button" disabled>Likes: {props.viewPhoto.likes}</button>
                </div>
            </div>
            <h1>{props.viewPhoto.name}</h1>
            <div>
                <img style={{maxWidth: "90%", maxHeight: "100%"}} className="image" src={props.viewPhoto.image}></img>
            </div>
            </div>
        </div>
    )
}
