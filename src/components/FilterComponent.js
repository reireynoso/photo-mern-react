import React, { Component } from 'react'

export default class FilterComponent extends Component {
    
    handleOnChange = (e) => {
        // console.log(e.target.value)
        this.props.handleGenreSelectFilter(e.target.value)
    }
    render() {
        return (
            <div style={{margin: "40px"}}>
                <button onClick={() => this.props.handleViewUserPhotos()}>View Your Photos</button>
                <input onChange={(e) => this.props.handleSearchFilter(e.target.value)}></input>
                <select onChange={this.handleOnChange}>
                    <option value="">Filter by Genre</option>
                    {this.props.genres.map(genre => {
                        return <option key={genre._id} value={genre.name}>{genre.name}</option>
                    })}
                </select>
            </div>
        )
    }
}
