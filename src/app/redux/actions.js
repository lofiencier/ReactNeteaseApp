const fetch_config = {
  method: "GET",
  mode: "cors",
  credentials: "include"
};

export function cookie_alive() {
  return function(dispatch) {
    dispatch({ type: "COOKIE_ALIVE" });
  };
}
export function unshift_song_list(song_id) {
  return function(dispatch) {
    fetch(`http://localhost:3000/song/detail?ids=${song_id}`, fetch_config)
      .then(res => res.json())
      .then(data => {
        console.log("song detail:", data);
        let song = data.songs[0];
        let { name, al, ar, id } = song;
        ar = ar.map(artist => {
          let { id, name } = artist;
          return { id: id, name: name };
        });
        song = {
          name: name,
          al: al,
          ar: ar,
          id: id
        };
        dispatch({ type: "UNSHIFT_LIST", single: song });
      });
  };
}
export function import_buffer() {
  return function(dispatch) {
    dispatch({ type: "IMPORT_FM_BUFFER" });
  };
}
export function fetchFm(preload) {
  //带参数Boolean：true为preload
  return function(dispatch) {
    fetch(`//localhost:3000/personal_fm?timestamp=${Date.now()}`, fetch_config)
      .then(res => res.json())
      .then(data => {
        if (data.code && data.code === 301) {
          throw new Error("请先登录");
          console.log(data);
        } else if (data.code && data.code === 405) {
          throw new Error("获取失败");
          console.log(data);
        } else {
          data = data.data.map(song => {
            let { id, name, mvid, duration, artists, album } = song;
            return { id, name, mvid, duration, artists, album };
          });
          if (!preload) {
            dispatch({ type: "RECEIVE_FM_SONG", songs: data });
          } else {
            dispatch({ type: "PRELOAD_FM_SONG", songs: data });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function toggleList(showlist) {
  return function(dispatch) {
    dispatch({ type: "TOGGLE_LIST", showlist: !showlist });
  };
}
export function switchMode(isFm) {
  return function(dispatch) {
    dispatch({ type: "SWITCH_MODE", isFm: !isFm });
  };
}
export function fetchSingleSong(song_id) {
  return function(dispatch) {
    fetch(`http://localhost:3000/music/url?id=${song_id}`, fetch_config)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        let url = data.data[0].url;
        let id = data.data[0].id;
        dispatch({ type: "PLAY_SINGLE_SONG", url: url, id: id });
      })
      .catch(function(err) {
        dispatch({ type: "FETCH_SONG_ERR", err: err });
      });
  };
}
export function changeIndex(index) {
  return function(dispatch) {
    dispatch({ type: "CHANGE_INDEX", index: index });
  };
}
export function emptyList() {
  return function(dispatch) {
    dispatch({ type: "EMPTY_LIST" });
  };
}
//album or playlist点击播放，从playlist复制信息到playbox
export function copySongInfo(song, index) {
  return function(dispatch) {
    dispatch({ type: "COPY_SONG_INFO_UNSHIFT", song: song });
  };
}
export function copyAllSongs(songs) {
  return function(dispatch) {
    dispatch({ type: "COPY_ALL_SONGS", songs: songs });
  };
}

//添加到列表 按钮 || 歌单，专辑.map之后的ids?
export function shiftSongId(song_id) {
  return function(dispatch) {
    dispatch({ type: "SHIFT_SONG_ID", id: song_id });
  };
}
//专辑、歌单中的播放按钮
export function unShiftSongId(song_id) {
  return function(dispatch) {
    dispatch({ type: "UNSHIFT_SONG_ID", id: song_id });
  };
}

//歌单route
export function fetchPlaylist(listId, notRoute) {
  return function(dispatch) {
    fetch(`http://localhost:3000/playlist/detail${listId}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        let {
          name,
          playCount,
          coverImgUrl,
          creator,
          trackCount,
          tracks,
          description
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
        if (notRoute) {
          dispatch({
            type: "RECIEVE_PLAYLIST_NOT_ROUTE",
            songs: tracks
          });
        } else {
          dispatch({
            type: "RECIEVE_PLAYLIST",
            name: name,
            playCount: playCount,
            coverImgUrl: coverImgUrl,
            creator: creator,
            songs: tracks,
            songCount: trackCount,
            description: description
          });
        }
      });
  };
}

export function fetchSearchList(keywords, page) {
  page = page || 1;
  return function(dispatch) {
    dispatch({ type: "FETCHING_SEARCHLIST" });
    fetch(`http://localhost:3000/api/search${keywords}&&offset=${page}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log("songcount:", data.result.songCount);
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
          songCount: songCount,
          offset: page
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
      fetch_config
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
    fetch(`http://localhost:3000/user/playlist?uid=${uid}`, fetch_config)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
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
        let artistId = album.artist.id;
        dispatch({
          type: "RECIEVE_ALBUMLIST",
          album: album,
          songs: songs,
          artistId: artistId
        });
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
      .then(function(data) {});
  };
}
