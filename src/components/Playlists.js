import React, { Component } from 'react';
import axios from 'axios';

class Playlists extends Component {
  state = {
    token: [],
    search: '',
    playlists: []
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  //we can pass a callback function to the setState method as a second parameter
  happyClick = () => {
    this.setState({
      search: "happy"
    }, this.getPlaylist);
  }

  sadClick = () => {
    this.setState({
      search: "sad"
    }, this.getPlaylist);
  }

  relaxedClick = () => {
    this.setState({
      search: "relaxed"
    }, this.getPlaylist);
  }

  angryClick = () => {
    this.setState({
      search: "angry"
    }, this.getPlaylist);
  }

  excitedClick = () => {
    this.setState({
      search: "excited"
    }, this.getPlaylist);
  }

  //we will use axios (we could also use fetch) inside this function to grab data
  getPlaylist = () => {
    const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
    const credentials = `${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`
    const { search } = this.state;
    
    axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      data: 'grant_type=client_credentials',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        /*btoa() method creates a base-64 encoded ASCII string from a "string" of binary data
          this ensure that data remains intact without modification during transport*/
        'Authorization' : 'Basic ' + btoa(credentials)
      }
    })
      //then method fires when the above promise action is completed
      // that is why we can pass a callback function inside .then()
      // callback function takes the response object from the above link as a parametar
    .then(tokenRes => {
      this.setState({
        token: tokenRes.data.access_token
      })
        return axios.get(`https://api.spotify.com/v1/search?q=${search}&type=playlist&limit=20`, {
        headers: { 'Authorization' : 'Bearer ' + this.state.token}
        /*this action returns a promise (we can't extract playlist from this right away because we
          don't know when it's done)
          promise means that this action will complete at some point in time */
      }).then(playlistRes => {
        this.setState({
          playlists: playlistRes.data.playlists.items            
        })
      })
    })
  }
 
  render() {
    /*grabbing the data about playlists (playlists property) from the state object and 
    assigning it to posts variable using destructuring*/
    const { playlists } = this.state;
    //check if playlists has any data inside the array
    //if the playlists.length is false (0) we want to return JSX stating that we don't have any playlists
    //if the playlists.length is true we want to return JSX with playlists
    //0 is interpreted as false and anything non-zero is interpreted as true
    const playList = playlists.map(playlist => {
        return (
          <div className="playlist-card" key={playlist.id}>
            <a href={playlist.external_urls.spotify} target="_blank" rel="noreferrer">
              <div className="image-container">
                <img src={playlist.images[0].url} alt="" className="playlist-image"/>
              </div>            
              <div className="text-container">
                <p className="playlist-title">{playlist.name}</p>
                <p className="playlist-creator">By: {playlist.owner.display_name}</p>
              </div>
            </a>            
          </div>
        )
      })
    
    return (
      <div className="container">
        <div className="search-container">
          <input type="text" className="search" placeholder="type your mood here..." onChange={this.handleChange}/>
          <button onClick={this.getPlaylist}>Click me!</button>
        </div>
        <div className="moodicons">
          <button onClick={this.happyClick}>Happy</button>          
          <button onClick={this.sadClick}>Sad</button>
          <button onClick={this.relaxedClick}>Relaxed</button>
          <button onClick={this.angryClick}>Angry</button>
          <button onClick={this.excitedClick}>Excited</button>
        </div>
        <div className="playlists">{playList}</div>
      </div>
      )
    }
  }

export default Playlists;