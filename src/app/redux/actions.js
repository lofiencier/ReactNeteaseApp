const fetch_config = {
  method: "GET",
  mode: "cors"
};

export function fetchAudio(song_id) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_SONG" });
    fetch(`http://localhost:3000/music/url?id=${song_id}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        dispatch({ type: "RECIEVE_SONG_URL", url: data.data["0"].url });
      })
      .catch(function(err) {
        dispatch({ type: "FETCH_SONG_ERR", err: err });
      });
  };
}

export function fetchPlaylist(listId) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_PLAYLIST" });
    fetch(`http://localhost:3000/playlist/detail${listId}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
        let {
          name,
          playCount,
          coverImgUrl,
          creator,
          trackCount,
          tracks
        } = data.playlist;
        tracks = tracks.map(song => {
          let { id, name, mv, dt, al, ar } = song;
          dt =
            parseInt(dt / 1000 / 60).toString() +
            ":" +
            (((dt / 1000) % 60) / 100)
              .toString()
              .split("")
              .slice(2, 4)
              .join("");
          ar = ar.map(artist => {
            let { id, name } = artist;
            return {
              id: id,
              name: name
            };
          });
          return {
            id: id,
            name: name,
            mvid: mv,
            duration: dt,
            artists: ar,
            album: al
          };
        });

        dispatch({
          type: "RECIEVE_PLAYLIST",
          name: name,
          playCount: playCount,
          coverImgUrl: coverImgUrl,
          creator: creator,
          songs: tracks,
          songCount: trackCount
        });
      })
      .catch(function(err) {
        dispatch({ type: "FETCH_PLAYLIST_FAILED", err: err });
      });
  };
}

export function fetchSearchList(keywords) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_SEARCHLIST" });
    fetch(`http://localhost:3000/api/search?keywords=${keywords}&limit=100`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        let songCount = data.result.songCount;
        let songs = data.result.songs;
        songs = songs.map(song => {
          let { id, name, mvid, album, artists, duration } = song;
          artists = artists.map(ar => {
            let { id, name } = ar;
            return {
              id: id,
              name: name
            };
          });
          duration =
            parseInt(duration / 1000 / 60).toString() +
            ":" +
            (((duration / 1000) % 60) / 100)
              .toString()
              .split("")
              .slice(2, 4)
              .join("");
          return {
            id: id,
            name: name,
            mvid: mvid,
            album: album,
            artists: artists,
            duration: duration
          };
        });
        dispatch({
          type: "RECIEVE_SEARCHLIST",
          songs: songs,
          songCount: songCount
        });
      })
      .catch(function(err) {
        dispatch({ type: "FETCH_SEARCHLIST_FAILED", err: err });
      });
  };
}

export function login(phone, password) {
  return function(dispatch) {
    dispatch({ type: "LOGGING" });
    fetch(
      `http://localhost:3000/login/cellphone?phone=${phone}&password=${password}`,
      {
        method: "GET",
        mode: "cors"
      }
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        dispatch({ type: "LOGED", data: data });
      })
      .catch(function(err) {
        dispatch({ type: "LOG_REJECTED", err: err });
      });
  };
}

export function getCollect(uid) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_USER_COLLECTION" });
    fetch(`http://localhost:3000/user/playlist?uid=${uid}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
        let result = data.playlist.map(item => {
          let { id, name, coverImgUrl, trackCount } = item;

          return {
            playlistId: id,
            playlistName: name,
            coverImgUrl: coverImgUrl,
            trackCount: trackCount
          };
        });
        dispatch({ type: "RECIVED_USER_COLLECTION", playlist: result });
      })
      .catch(function(err) {
        dispatch({ type: "FETCH_USER_COLLECTION_REJECTED", err: err });
      });
  };
}

export function fetchAlbum(al_id) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_ALBUMLIST" });
    fetch(`http://localhost:3000/album${al_id}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log("data from album", data);
        let { album, songs } = data;
        songs = songs.map(song => {
          let { id, name, mv, dt, ar, al } = song;
          dt =
            parseInt(dt / 1000 / 60).toString() +
            ":" +
            (((dt / 1000) % 60) / 100)
              .toString()
              .split("")
              .slice(2, 4)
              .join("");
          ar = ar.map(artist => {
            let { id, name } = artist;
            return { id: id, name: name };
          });
          return {
            id: id,
            name: name,
            mvid: mv,
            duration: dt,
            artists: ar,
            album: al
          };
        });

        dispatch({ type: "RECIEVE_ALBUMLIST", album: album, songs: songs });
      })
      .catch(function(err) {
        dispatch({ type: "FETCH_ALBUMLIST_FAILED", err: err });
      });
  };
}

export function fetchArtistAlbum(ar_id) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_ARTIST_ALBUMS", fetching: true });
    fetch(
      `http://localhost:3000/artist/album?id=${ar_id}&limit=6`,
      fetch_config
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
      });
  };
}
// .album.name
// .album.picUrl
// .album.size
// .album.company
// .songs
// .songs["0"].id
// .songs["0"].name
// .songs["0"].mv
// .songs["0"].dt
// .songs["0"].ar["0"].id
// .songs["0"].ar["0"].name
