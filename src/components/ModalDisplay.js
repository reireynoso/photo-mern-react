import React, {useState} from 'react'
import CommentForm from './CommentForm'
import {Confirm} from 'semantic-ui-react'

export default function ModalDisplay(props) {
    // console.log(props.viewPhoto)
    // console.log(props.currentUser)
    const [open, setOpen] = useState(false)
    const [commentModal, setComment] = useState(false)
    const [commentObject, setCommentObject] = useState({})

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

    function handleOpenComment(comment){
        console.log(commentObject)
        setComment(true)
        setCommentObject(comment)
    }

    function handleCloseComment(){
        setComment(false)
    }

    const commentDiv = {
        width: "80%",
        margin: "auto",
        marginTop: "2%"
    }
    
    const handleDeletePhoto = () => {
        // console.log(commentObject)
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/photo`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(props.viewPhoto)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                props.handlePhotoRemove(props.viewPhoto)
                props.handleCloseModal()
            }
            console.log(data)
        })
        // props.handlePhotoRemove(props.viewPhoto)
        // props.handleCloseModal()
    }

    const handleDeleteComment = () => {
        // console.log(commentObject)
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/comment`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(commentObject)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                props.handleDeleteComment(commentObject)
                setComment(false)
            }
            console.log(data)
        })
    }
    const modal = {
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
                <div style={commentDiv}>
                    <h3 className="ui dividing header">Comments</h3>
                    <div style={{margin: "auto"}} className="ui comments">
                    <span data-tooltip="Remove Comment" data-position="top left">
                        <Confirm
                            open={commentModal}
                            header='Removing this Comment.'
                            onCancel={handleCloseComment}
                            onConfirm={() => handleDeleteComment()}
                            />
                    </span> 
                    {
                        props.viewPhoto.comments.length !== 0 ?
                        props.viewPhoto.comments.map(comment => {
                            return <div key={comment._id} className="comment">
                                    <div className="content">
                                        <div className="text">{comment.content}</div>
                                        <div className="author">
                                            By: {comment.user.name} | Age: {comment.user.age} 
                                            {
                                            comment.user._id === props.currentUser._id ? 
                                            <span onClick={() => handleOpenComment(comment)}>| <i className="trash icon"></i></span>
                                            : 
                                            null
                                            }
                                        </div>
                                    </div>
                                </div>
                        })
                        :
                        <div className="ui segment">No Comments...yet</div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
