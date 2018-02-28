const fetchConfig = {
  withCredentials: true
};

export function changePlayPosition(position) {
  return function(dispatch) {
    dispatch({ type: "CHANGE_PLAY_POSITION", position: position });
  };
}
export function toggleLoginBox() {
  return function(dispatch) {
    dispatch({ type: "TOGGLE_LOGIN_BOX" });
  };
}
export function changeVolume(vol) {
  return function(dispatch) {
    dispatch({ type: "CHANGE_VOL", vol: vol });
  };
}
export function togglePlayState() {
  return function(dispatch) {
    dispatch({ type: "TOGGLE_PLAY_STATE" });
  };
}
export function logout() {
  return function(dispatch) {
    dispatch({ type: "LOG_OUT" });
  };
}
export function login(phone, password, cb) {
  return function(dispatch) {
    // dispatch({type})
    dispatch({ type: "TRY_LOGIN" });
    return axios
      .get(`/login/cellphone?phone=${phone}&password=${password}`)
      .then(function({ data }) {
        console.log(data);
        if (data.code === 200) {
          localStorage.setItem("loged", true);
          localStorage.setItem("profile", JSON.stringify(data.profile));
          dispatch({ type: "LOGIN_SUCCESS", profile: data.profile });
          cb(200, "登陆成功");
        } else if (data.code === 502) {
          dispatch({ type: "LOGIN_REJECT", err: data.msg });
          cb(502, "账号密码错误");
        } else {
          dispatch({ type: "LOGIN_REJECT", err: data.msg });
          cb(503, "登陆频繁，请稍后再试");
        }
      })
      .catch(function(err) {
        dispatch({ type: "LOGIN_REJECT", err: err });
        cb(504, "网络有点问题...");
      });
  };
}
export function cookie_alive({ loged, profile }) {
  return function(dispatch) {
    dispatch({ type: "COOKIE_ALIVE", loged: loged, profile: profile });
  };
}
export function unshift_song_list(song_id) {
  return function(dispatch) {
    axios.get(`/song/detail?ids=${song_id}`, fetchConfig).then(({ data }) => {
      console.log("song detail:", data);
      let song = data.songs[0];
      let { name, al, ar, id } = song;
      ar = ar.map(artist => {
        let { id, name } = artist;
        return { id: id, name: name };
      });
      song = {
        name: name,
        album: al,
        artists: ar,
        id: id
      };
      dispatch({ type: "UNSHIFT_LIST", single: song });
    });
  };
}
export function push_song_list(song_id) {
  return function(dispatch) {
    axios.get(`/song/detail?ids=${song_id}`, fetchConfig).then(({ data }) => {
      console.log(data);
      let song = data.songs[0];
      let { name, al, ar, id } = song;
      ar = ar.map(artist => {
        let { id, name } = artist;
        return { id: id, name: name };
      });
      song = {
        name: name,
        album: al,
        artists: ar,
        id: id
      };
      dispatch({ type: "PUSH_LIST", single: song });
    });
  };
}

export function delSong(index) {
  return function(dispatch) {
    dispatch({ type: "DEL_SONG", index: index });
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
    axios
      .get(`/personal_fm?timestamp=${Date.now()}`, fetchConfig)
      .then(({ data }) => {
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
    dispatch({ type: "SWITCH_MODE", isFm: !isFm, curIndex: 0 });
  };
}
export function fetchSingleSong(song_id) {
  return function(dispatch) {
    axios
      .get(`/music/url?id=${song_id}`, fetchConfig)
      .then(function({ data }) {
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

//专辑、歌单中的播放按钮
export function unShiftSongId(song_id) {
  return function(dispatch) {
    dispatch({ type: "UNSHIFT_SONG_ID", id: song_id });
  };
}

//歌单route
export function fetchPlaylist(listId, notRoute) {
  return function(dispatch) {
    axios
      .get(`/playlist/detail${listId}`, fetchConfig)
      .then(function({ data }) {
        console.log(data);
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
    axios
      .get(`/api/search${keywords}&&offset=${page}`, fetchConfig)
      .then(function({ data }) {
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

export function getCollect(uid) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_USER_COLLECTION" });
    axios
      .get(`/user/playlist?uid=${uid}`, fetchConfig)
      .then(function({ data }) {
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
    axios
      .get(`/album${al_id}`, fetchConfig)
      .then(function({ data }) {
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
    axios
      .get(`/artist/album?id=${ar_id}&limit=6`, fetchConfig)
      .then(function({ data }) {});
  };
}
