import React, {useState} from 'react'

export default function PhotoCard(props){
    // console.log(props)
    const [open, setOpen] = useState(false)

    function handleMouseOff(){
        setOpen(false)
    }

    function handleMouseOver(){
        setOpen(true)
    }
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

    return (
        <div className="column">
            <div className="ui fluid card">
                <div className="image" onClick={() => props.handleOpenModal(props.photo)}>
                    <img src={props.photo.image}/>
                </div>
                <div style={open ? modal: null}>

                </div>
            {/* <div className="content">
                <a className="header">{props.photo.owner.name}</a>
            </div> */}
            </div>
        </div>
    )
}