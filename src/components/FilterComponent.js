import React, { Component } from 'react'

export default class FilterComponent extends Component {
    
    handleOnChange = (e) => {
        // console.log(e.target.value)
        this.props.handleGenreSelectFilter(e.target.value)
    }
    render() {
        const divStyle = {
            margin: "40px 0px",
            display: "flex",
            justifyContent: "space-between",
            height: "40px"
        }

        const searchBarStyle = {
            width: "300px",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "10px",
            textAlign: "center"
        }

        const buttonStyle = {
            borderRadius: "10px",
            width: "160px"
        }
        return (
            <div style={divStyle}>
                <button className="ui button" style={buttonStyle} onClick={() => this.props.handleViewUserPhotos()}>View Your Photos</button>
                <input placeholder="Search by Photo Name" style={searchBarStyle} onChange={(e) => this.props.handleSearchFilter(e.target.value.trim())}></input>
                <select style={{width: "160px"}} onChange={this.handleOnChange}>
                    <option value="">Filter by Genre</option>
                    {this.props.genres.map(genre => {
                        return <option key={genre._id} value={genre.name}>{genre.name}</option>
                    })}
                </select>
            </div>
        )
    }
}
