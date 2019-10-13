import React, { Component, Fragment } from 'react';

export default class NavBar extends Component {
  
  render() {
    // console.log(Object.keys(this.props.currentUser))
    return (
        <div className="nav-bar">
          <div id="nav-bar-container" className="ui container">
              <div className="leftMenu">
                    <div className="ui inverted button">
                      Photo Uploader
                    </div>

                    {/* <div className="ui inverted button">
                      View Favorited Photos
                    </div> */}
                  </div>
                  <div className="rightMenu">
                  {
                    Object.keys(this.props.currentUser).length !== 0 ? 
                    <Fragment>
                      <div className="ui inverted button" onClick={() => this.props.handleNewPhotoForm()}>
                          +
                      </div>
                      
                      <div className="ui inverted button" onClick={() => this.props.handleLogOut()}>
                        Log Out
                      </div>
                    </Fragment>
                    :
                    <Fragment>
                       <div className="ui inverted button" onClick={() => this.props.handleViewPageClick("signUp")}>
                          Sign Up
                      </div>

                      <div className="ui inverted button" onClick={() => this.props.handleViewPageClick("login")}>
                          Log In
                      </div>
                    </Fragment>
                  }
          </div>
                  
          </div>
        </div>
    );
  }
}
