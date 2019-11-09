import React, {useState} from 'react'
import CommentForm from './CommentForm'
import {Confirm} from 'semantic-ui-react'

export default function ModalDisplay(props) {
    // console.log(props.viewPhoto)
    // console.log(props.currentUser)
    const [open, setOpen] = useState(false)

    function handleConfirm(){
        handleDeletePhoto()
        setOpen(false)
    }
    function handleCancel(){
        setOpen(false)
    }

    function show(){
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

    const handleDeletePhoto = () => {
        props.handlePhotoRemove(props.viewPhoto)
        props.handleCloseModal()
    }
    return (
        <div onClick={props.handleModalClick} id="myModal" style={modal}>
          <div className="ui container" style={innerModal}>
            <div style={headerStyle}>
                <div>
                    <h3>By: {props.viewPhoto.owner.name}</h3>
                </div>
                <div>
                    {
                        props.currentUser._id === props.viewPhoto.owner._id ? 
                        <button onClick={() => show()} className="ui red button"><i className="trash icon"></i>Delete</button>:
                        null
                    }
                    <button onClick={() => props.handlePhotoLike(props.viewPhoto)} className="ui green button"><i className="heart icon"></i>Like</button>
                    <button className="ui orange button" disabled>Likes: {props.viewPhoto.likes}</button>
                </div>
            </div>
                <h1>{props.viewPhoto.name}</h1>
                <div>
                    <img style={{maxWidth: "90%", maxHeight: "100%"}} className="image" src={props.viewPhoto.image}></img>
                </div>
                
                <span data-tooltip="Delete Photo" data-position="bottom left">
                    <Confirm
                        open={open}
                        header='Removing this Photo.'
                        onCancel={() => handleCancel()}
                        onConfirm={() => handleConfirm()}
                        />
                </span>
                <div style={{width: "80%", margin: "auto"}}>
                    <CommentForm handleAddNewComment={props.handleAddNewComment} currentUser={props.currentUser} viewPhoto={props.viewPhoto}/>
                </div>

                {
                    props.viewPhoto.comments.map(comment => {
                        return <div key={comment._id} className="ui comments">
                            <div className="comment">
                                <p>{comment.content}</p>
                            </div>

                            <div className="content">
                                <div className="author">
                                By: {comment.user.name} | Age: {comment.user.age}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
