import React, {Component, Fragment} from 'react';
import './App.css';
import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm';

class App extends Component{
  state = {
    currentUser: {},
    photos: [],
    viewPage: 'signUp'
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
    // console.log(this.state.viewPage === 'login')
    return (
    <div className="App">
        <NavBar handleLogOut={this.handleLogOut} handleViewPageClick={this.handleViewPageClick} currentUser={this.state.currentUser}/>
        {
          Object.keys(this.state.currentUser).length === 0 ?
          <Fragment>
            {
              this.state.viewPage === "signUp" ? <SignUpForm handleCurrentUser={this.handleCurrentUser}/> : <LoginForm handleCurrentUser={this.handleCurrentUser}/>
            }
          </Fragment>
          :
          <div>
            Photo container
          </div>
          
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
