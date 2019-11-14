import React, {Component, Fragment} from 'react';
import './App.css';
import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm';
import MainComponent from './components/MainComponent'
import ModalDisplay from './components/ModalDisplay'

class App extends Component{
  state = {
    currentUser: {},
    photos: [],
    genres: [],
    viewPage: 'signUp',
    newPhotoForm: false,
    modalOpen: false,
    viewPhoto: {}
  }
  
  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`${process.env.REACT_APP_URL}/user/auto_login`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          currentUser: data
        })
      })
    }

    fetch(`${process.env.REACT_APP_URL}/genres`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        genres: data
      })
    })

    fetch(`${process.env.REACT_APP_URL}/photos`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        photos: data,
      })
    })
  }

  handleAddNewPhoto = (input) => {
    // console.log(input)
    // debugger
    const token = localStorage.getItem("token")
    if(token){
      fetch(`${process.env.REACT_APP_URL}/photos`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: input 
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      // debugger
      this.setState({
        newPhotoForm: false,
        photos: [...this.state.photos, data],
      })
      window.scrollTo(0,document.body.scrollHeight);
    })
    }
   
  }

  handleDeleteComment = (commentObj) => {
    console.log(commentObj)
    const commentRemovedArray = this.state.photos.map(photo => {
      if(photo._id === commentObj.photo){
        console.log('match')
        const removeCommentArr = photo.comments.filter(comment => {
          return comment._id !== commentObj._id
        })
        console.log(removeCommentArr)
        // debugger
        photo.comments = removeCommentArr
        return photo
      }
      return photo
    })
    // console.log(commentRemovedArray)
    this.setState({
      photos: commentRemovedArray
    })
  }

  handleAddNewComment = (newCommentObj) => {
    console.log(newCommentObj)
    const commentAddedArray = this.state.photos.map(photo => {
      if(photo._id === newCommentObj.photo){
        photo.comments = [...photo.comments, newCommentObj]
        return photo
      }
      return photo
    })
    this.setState({
      photos: commentAddedArray
    })
  }

  handleNewPhotoForm = () => {
    this.setState({
      newPhotoForm: !this.state.newPhotoForm
    })
  }

  handleCurrentUser = (user) => {
    // console.log(user)
    this.setState({
      currentUser: user
    })
  }

  handleLogOut = () => {
    localStorage.clear();
    this.setState({
      currentUser: {}
    })
  }

  handleViewPageClick = (input) => {
    this.setState({
      viewPage: input
    })
  }

  handlePhotoRemove = (photoObj) => {
    // console.log(photo)
    let photoRemoved = this.state.photos.filter(photo => {
      return photo._id !== photoObj._id
    })

    this.setState({
      photos: photoRemoved
    })

    
  }

  handlePhotoLike = (photo) => {
    // console.log(photo)
    photo.likes = photo.likes + 1
    const token = localStorage.getItem("token")
    if(token){
      fetch(`${process.env.REACT_APP_URL}/photo/${photo._id}/likes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        likes: photo.likes
      }) 
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      // debugger
      const updatePhoto = this.state.photos.map(photo => {
        if(photo._id === data._id){
          photo.likes = data.likes
        }
        return photo
      })
      this.setState({
        photos: updatePhoto,
      })
    })
    }
  }

  handleOpenModal = (photo) => {
    // console.log(photo)
    this.setState({
      viewPhoto: photo,
      modalOpen: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      viewPhoto: {}
    })
  }

  handleModalClick = (e) => {
    if(e.target.id === "myModal"){
      this.setState({
        modalOpen: false
      })
    }
  }

  render(){
    return (
    <div className="App">
        {
          this.state.modalOpen ?  
          <ModalDisplay handleDeleteComment={this.handleDeleteComment} handleAddNewComment={this.handleAddNewComment} handleCloseModal={this.handleCloseModal} handlePhotoRemove={this.handlePhotoRemove} currentUser={this.state.currentUser} handlePhotoLike={this.handlePhotoLike} viewPhoto={this.state.viewPhoto} handleModalClick={this.handleModalClick}/>
          : 
          null
        }
        <NavBar handleNewPhotoForm={this.handleNewPhotoForm} handleLogOut={this.handleLogOut} handleViewPageClick={this.handleViewPageClick} currentUser={this.state.currentUser}/>
        {
          Object.keys(this.state.currentUser).length === 0 ?
          <Fragment>
            {
              this.state.viewPage === "signUp" ? <SignUpForm handleCurrentUser={this.handleCurrentUser}/> : <LoginForm handleCurrentUser={this.handleCurrentUser}/>
            }
          </Fragment>
          :
          <MainComponent handleOpenModal={this.handleOpenModal}  genres = {this.state.genres} handleGenreSelectFilter={this.handleGenreSelectFilter} handleAddNewPhoto={this.handleAddNewPhoto} photos={this.state.photos} genres={this.state.genres} currentUser={this.state.currentUser} photos={this.state.photos} newPhotoForm={this.state.newPhotoForm}/>   
        }
    </div>
    )
  } 
}

export default App;
