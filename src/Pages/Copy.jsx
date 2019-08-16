import React from "react";
import { Link } from "react-router-dom";
import { StateContext } from "State";
import { setToken } from "Modules/token";
import { getHashFragment, hideHashFragment } from "Helpers/hash";
import {
  getCurrentUserProfile,
  createPlaylist,
  getPlaylistInfo,
  getPlaylistTracks,
  addTracksToPlaylist
} from "Helpers/spotify";
import MainContainer from "Components/MainContainer";
import SomethingWentWrong from "Components/SomethingWentWrong";

import Spinner from "Assets/green-spinner-200px.svg";

import "./Copy.css";

const placeholder = "open.spotify.com/playlist/37i9dQZEV";

export default class Copy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "",
      playlistToCopy: "",
      isCopying: false,
      copyCompleted: true
    };
  }

  componentDidMount = async () => {
    const { location } = this.props;

    let hash = getHashFragment(location);

    hideHashFragment();

    if (!hash) return;

    let token = hash.access_token;

    if (token) {
      // const [ { token }, dispatch ] = this.context;
      let dispatch = this.context[1];

      let userData = await getCurrentUserProfile(token);
      // console.log(userData);
      this.setState({
        currentUser: userData
      });

      dispatch(setToken(token));
    }
  };

  onFormSubmit = async e => {
    e.preventDefault();

    let { currentUser, playlistToCopy } = this.state;

    let playlistToCopyArr = playlistToCopy.split("/").filter(Boolean);

    if (playlistToCopyArr.length === 0) {
      alert(
        "Your 'Playlist to copy' link isn't in the right format. Should look like this: " +
          placeholder +
          ""
      );
      return;
    }

    playlistToCopy = playlistToCopyArr.pop();

    const [{ token }] = this.context;

    let tracks = [];
    let data = undefined;
    let next = undefined;
    let index = 0;

    let playlistInfo = await getPlaylistInfo(token, playlistToCopy);
    console.log("Playlist Info", playlistInfo);

    // Create new playlist with the same name
    let newPlaylist = await createPlaylist(
      token,
      currentUser.id,
      playlistInfo.name,
      playlistInfo.description
    );
    console.log("New playlist", newPlaylist);

    // Get playlist tracks only allow 100 at a time.
    // The spotify api kindly provides a 'next' property with a url
    // to get the next 100 tracks.
    do {
      data = await getPlaylistTracks(token, playlistToCopy, next);
      next = data.next;
      // tracks = tracks.concat(data.items);
      tracks[index] = data.items;
      index++;
    } while (next);

    console.log(tracks);

    // 'Add tracks to playlists' only allows 100 tracks at a time
    for (let i = 0; i < tracks.length; i++) {
      let tracklist = tracks[i].map(item => {
        return item.track.uri;
      });

      let returnedData = await addTracksToPlaylist(
        token,
        newPlaylist.id,
        tracklist
      );

      if (returnedData.error) {
        console.log("Something went wrong!", returnedData);
        break;
      }
      console.log(`Added track set ${i + 1} of ${tracks.length}`);
    }
  };

  onChangePlaylistToCopy = e => {
    this.setState({
      playlistToCopy: e.target.value
    });
  };

  onReset = () => {
    this.setState({
      playlistToCopy: "",
      isCopying: false,
      copyCompleted: false
    });
  };

  render = () => {
    const [{ token }] = this.context;

    if (!token) {
      return <SomethingWentWrong />;
    }

    const {
      currentUser,
      playlistToCopy,
      isCopying,
      copyCompleted
    } = this.state;

    if (!currentUser || isCopying) {
      return (
        <MainContainer>
          <img className="green-spinner" src={Spinner} alt={"Loading..."} />
        </MainContainer>
      );
    }

    if (copyCompleted) {
      return (
        <MainContainer>
          <div className="copy-container">
            <div className="copy-again">
              <h1>Playlist created!</h1>
              <p>You can find it here.</p>
              <button className="btn-link">Copy another playlist</button>
            </div>
          </div>
        </MainContainer>
      );
    }

    return (
      <MainContainer>
        <div className="copy-container">
          <div className="copy-centered">
            <h1>{`Welcome, ${currentUser.id}`}</h1>
            <form className="copy-form" onSubmit={this.onFormSubmit}>
              <h3>Playlist link</h3>
              <input
                required
                className="copy-form-link-input"
                type="text"
                onChange={this.onChangePlaylistToCopy}
                value={playlistToCopy}
                placeholder={placeholder}
              />
              <input
                className="copy-form-submit btn-link"
                type="submit"
                value="Copy!"
              />
            </form>
          </div>
        </div>
      </MainContainer>
    );
  };
}
Copy.contextType = StateContext;
