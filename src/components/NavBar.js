import React, { Component } from 'react';

export default class NavBar extends Component {
  render() {
    return (
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui container">
            <div className="ui large secondary inverted pointing menu" style={{justifyContent: "space-between"}}>
              <div className="leftMenu">
                    <div className="ui inverted button">
                      View your Photos
                    </div>
                    <div className="ui inverted button">
                      View Categories
                    </div>

                    <div className="ui inverted button">
                      View Favorited Photos
                    </div>
                  </div>

                  <div className="rightMenu">
                    <div className="ui inverted button">
                      Log Out
                    </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
