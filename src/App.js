import React, {Component, Fragment} from 'react';
import './App.css';
import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm';
import MainComponent from './components/MainComponent'

class App extends Component{
  state = {
    currentUser: {},
    photos: [],
    genres: [],
    viewPage: 'signUp',
    newPhotoForm: false
  }
  
  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if(token){
      fetch("http://localhost:3000/user/auto_login",{
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

    fetch("http://localhost:3000/genres")
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        genres: data
      })
    })

    fetch('http://localhost:3000/photos')
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
      fetch("http://localhost:3000/photos", {
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
    })
    }
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

  render(){
    // console.log(this.state)
    return (
    <div className="App">
        <NavBar handleNewPhotoForm={this.handleNewPhotoForm} handleLogOut={this.handleLogOut} handleViewPageClick={this.handleViewPageClick} currentUser={this.state.currentUser}/>
        {
          Object.keys(this.state.currentUser).length === 0 ?
          <Fragment>
            {
              this.state.viewPage === "signUp" ? <SignUpForm handleCurrentUser={this.handleCurrentUser}/> : <LoginForm handleCurrentUser={this.handleCurrentUser}/>
            }
          </Fragment>
          :
          <MainComponent  genres = {this.state.genres} handleGenreSelectFilter={this.handleGenreSelectFilter} handleAddNewPhoto={this.handleAddNewPhoto} photos={this.state.photos} genres={this.state.genres} currentUser={this.state.currentUser} photos={this.state.photos} newPhotoForm={this.state.newPhotoForm}/>   
        }
        {/* <div id="pic-container" className="ui container">
        <div class="ui three column grid">
  <div class="column">
    <div class="ui fluid card">
      <div class="image">
        <img src="/images/avatar/large/daniel.jpg"/>>
      </div>
      <div class="content">
        <a class="header">Daniel Louise</a>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="ui fluid card">
      <div class="image">
        <img src="/images/avatar/large/helen.jpg"/>>
      </div>
      <div class="content">
        <a class="header">Helen Troy</a>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="ui fluid card">
      <div class="image">
        <img src="/images/avatar/large/elliot.jpg"/>>
      </div>
      <div class="content">
        <a class="header">Elliot Fu</a>
      </div>
    </div>
  </div>
</div>
</div> */}


    </div>
    )
  } 
}

export default App;
