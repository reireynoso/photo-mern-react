import React, {useState} from 'react'

export default function PhotoCard(props){
    // console.log(props)
    // const [open, setOpen] = useState(false)

    // function handleMouseOff(){
    //     setOpen(false)
    // }

    // function handleMouseOver(){
    //     setOpen(true)
    //     console.log(open)
    // }
    

    return (
        <div className="column">
            {/* <div style={open ? mod}> */}
                <div className="ui fluid card">
                    <div className="image image-card" onClick={() => props.handleOpenModal(props.photo)}>
                        <img src={props.photo.image}/>
                    </div>

                </div>
                {/* <div className="content">
                    <a className="header">{props.photo.owner.name}</a>
                </div> */}
            {/* </div> */}
        </div>
    )
}