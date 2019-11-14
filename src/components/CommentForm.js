import React, {useState} from 'react'

export default function CommentForm(props) {
    const [comment, setComment] = useState("")

    const handleCommentChange = (e) => {
        // console.log(e.target.value)
        setComment(e.target.value)
        // console.log(comment)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCommentObj = {
            content: comment,
            photo: props.viewPhoto._id,
            // user: props.currentUser._id
        }
        e.target.reset()
        // console.log(newCommentObj)
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_URL}/photo/${props.viewPhoto._id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newCommentObj)
        })
        .then(resp => resp.json())
        .then(comment => {
            props.handleAddNewComment(comment)
        })
        // props.handleAddNewComment(newCommentObj)
    }
    return (
        // console.log(comment)
        <div>
            <form onSubmit={handleSubmit} className="ui form">
                <div className="field">
                    <textarea required name="comment" onChange={handleCommentChange} placeholder="Share your comments or thoughts! Keep it friendly!" rows="2"></textarea>
                </div>
                <button className="ui blue button" type="submit" value="Submit">Comment</button>
            </form>
        </div>
    )
}
