const fetchConfig = {
  withCredentials: true
};
export function changePlayPosition(position) {
  return {
    type: "CHANGE_PLAY_POSITION",
    payload: position
  };
}

export function toggleLoginBox() {
  return {
    type: "TOGGLE_LOGIN_BOX"
  };
}

export function logout() {
  return {
    type: "LOG_OUT"
  };
}

export function cookie_alive({ loged, profile }) {
  return {
    type: "COOKIE_ALIVE",
    payload: profile
  };
}

export function toggleList(showlist) {
  return {
    type: "TOGGLE_LIST"
  };
}

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

export function unshiftSongById(id) {
  return function(dispatch) {
    axios.get(`/song/detail?ids=${id}`, fetchConfig).then(({ data }) => {
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
      dispatch(unshiftSong(song));
    });
  };
}

export function pushSongById(id) {
  return function(dispatch) {
    axios.get(`/song/detail?ids=${id}`, fetchConfig).then(({ data }) => {
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
      dispatch(pushSong(song));
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

//playbox actions
export function unshiftSong(song) {
  return function(dispatch, getState) {
    let { curList } = getState().Playbox;
    dispatch({
      type: "UNSHIFT_SONG",
      payload: song
    });
    dispatch(toggleMode("music"));
    dispatch(changeMusicIndex(0));
  };
}

export function fetchSong(id) {
  return function(dispatch) {
    axios
      .get(`/music/url?id=${id}`, fetchConfig)
      .then(function({ data }) {
        let url = data.data[0].url;
        dispatch({ type: "GET_MUSIC_URL", payload: url });
        return dispatch(playSong(url));
      })
      .catch(function(err) {
        return dispatch({ type: "FETCH_SONG_ERR", err: err });
      });
  };
}

export function songEnded() {
  return function(dispatch, getState) {
    const { isFm, curIndex } = getState().Playbox;
    isFm
      ? dispatch(changeFmIndex(curIndex + 1))
      : dispatch(changeMusicIndex(curIndex + 1));
  };
}

export function playSong(url) {
  return function(dispatch, getState) {
    let {
      AudioDom,
      volume,
      curMusicUrl,
      curIndex,
      isFm,
      curList,
      fmList
    } = getState().Playbox;

    if (curMusicUrl !== AudioDom.src) {
      if (url) {
        AudioDom.src = url;
        AudioDom.play();
      } else {
        setTimeout(function() {
          dispatch({ type: "CAN_NOT_PLAY" });
          dispatch(changeMusicIndex(curIndex + 1));
        }, 3000);
      }
    }
    AudioDom.play();
    AudioDom.volume = volume;
    dispatch({ type: "START_PLAY" });
  };
}

export function changeMusicIndex(index) {
  index = parseInt(index);
  return function(dispatch, getState) {
    const list = getState().Playbox.curList;
    const len = list.length;
    if (index < 0) {
      index = len - 1;
    } else if (index > len - 1) {
      index = 0;
    }
    dispatch({
      type: "CHANGE_INDEX",
      payload: index
    });
    dispatch(fetchSong(list[index].id));
    dispatch(getLyric(list[index].id));
  };
}

export function importPreload() {
  return function(dispatch) {
    dispatch({ type: "IMPORT_FM_PRELOAD" });
  };
}

export function coverList(songs) {
  return function(dispatch, getState) {
    dispatch({ type: "COVER_MUSIC_LIST", payload: songs });
    dispatch(changeMusicIndex(0));
    if (getState().Playbox.isFm) {
      dispatch(toggleMode("music", true));
    }
  };
}

export function stopPlay() {
  return function(dispatch, getState) {
    dispatch({ type: "STOP_PLAY" });
    dispatch({ type: "CHANGE_INDEX", payload: 0 });
  };
}

export function delSong(index) {
  return function(dispatch, getState) {
    var list = getState().Playbox.curList,
      len = list.length;
    if (len > 1) {
      dispatch({ type: "DEL_SONG", payload: index });
      dispatch(changeMusicIndex(index));
    } else {
      dispatch({ type: "DEL_SONG", payload: index });
      dispatch(stopPlay());
    }
  };
}

export function pushSong(song) {
  return function(dispatch, getState) {
    const { curList, isFm } = getState().Playbox;
    dispatch({ type: "PUSH_SONG", payload: song });
    if (!isFm && curList.length < 1) {
      dispatch(changeMusicIndex(0));
    }
  };
}

export function togglePlayStatus() {
  return {
    type: "TOGGLE_PLAY_STATUS"
  };
}

export function toggleMode(mode, doNotFetchSong) {
  mode = mode || false;
  return function(dispatch, getState) {
    const { isFm, curList } = getState().Playbox;
    if (mode === "music" && !doNotFetchSong) {
      dispatch({ type: "TOGGLE_MODE", payload: false });
    } else if (mode === "fm") {
      dispatch({ type: "TOGGLE_MODE", payload: true });
    } else {
      dispatch({ type: "TOGGLE_MODE", payload: !isFm });
    }

    if (isFm) {
      if (curList.length > 0) {
        dispatch(fetchSong(curList[0].id), false);
      } else {
        dispatch(stopPlay());
      }
    } else if ((!isFm && !mode) || mode === "fm") {
      dispatch(fetchFm());
    }
  };
}

export function fetchFm(preload) {
  return function(dispatch, getState) {
    const { fmList } = getState().Playbox;

    axios
      .get(`/personal_fm?timestamp=${Date.now()}`, fetchConfig)
      .then(({ data }) => {
        console.log(data);
        if (data.code && data.code === 200) {
          data = data.data.map(song => {
            let { id, name, mvid, duration, artists, album } = song;
            return { id, name, mvid, duration, artists, album };
          });
          if (!preload) {
            dispatch({ type: "RECEIVE_FM_SONG", payload: data });
            dispatch(changeFmIndex(0));
          } else {
            dispatch({ type: "PRELOAD_FM_SONG", payload: data });
            const len = fmList.length;
            if (len < 3) {
              //这里递归，保持fmlist一直有6首歌
              dispatch(fetchFm(true));
            }
          }
        }
      });
  };
}

export function changeFmIndex(index) {
  return function(dispatch, getState) {
    const list = getState().Playbox.fmList;
    try {
      dispatch(fetchSong(list[index].id));
    } catch (e) {
      dispatch(fetchFm(true));
    } finally {
      dispatch(getLyric(list[index].id));
    }
    if (index > 0) {
      dispatch({ type: "DEL_FM_SONG", payload: 0 });
      index = 0;
    }
    dispatch({ type: "CHNAGE_FM_INDEX", payload: index });
    const len = list.length;
    if (len < 3) {
      dispatch(fetchFm(true));
    }
  };
}

export function changeVolume(vol) {
  return {
    type: "CHANGE_VOL",
    payload: vol
  };
}
function parseLRC(lrc) {
  const data = [];
  const lines = lrc.match(/[^\n]+/g);
  lines.forEach(l => {
    const res = l.match(/\[\d\d:\d\d.\d{1,3}\]/g);
    if (!res || !res.length) {
      return;
    }

    const str = res[0].substring(1, res[0].length - 1);
    // 01, 02, 03 => (01 * 60 + 02) * 1000 + 03
    let time = 0;
    str.match(/\d{1,3}/g).forEach((val, index) => {
      if (index === 0) {
        time += parseInt(val, 10) * 60 * 1000;
      } else if (index === 1) {
        time += parseInt(val, 10) * 1000;
      } else {
        time += parseInt(val, 10);
      }
    });

    // 歌词
    const text = l.replace(res[0], "");
    text ? text : "&nbsp";
    data.push({
      time: time / 1000,
      text
    });
  });

  data.sort((a, b) => a.time - b.time);
  return data;
}
export function getLyric(id) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_LRC", payload: ["歌词获取中..."] });
    axios
      .get(`/lyric?id=${id}`, fetchConfig)
      .then(({ data }) => {
        if (data.code === 200) {
          var payload;
          data.nolyric
            ? (payload = ["当前歌曲无歌词..."])
            : (payload = parseLRC(data.lrc.lyric));
          dispatch({ type: "RECIEVE_LRC", payload: payload });
        } else if (data.code === 503) {
          dispatch({ type: "FETCH_LRC_ERROR", payload: ["歌词获取失败"] });
        }
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: "FETCH_LRC_ERROR", payload: ["获取失败"] });
      });
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

export function toggleShowPlaybox() {
  return function(dispatch, getState) {
    const { curIndex, isFm, curList, fmList } = getState().Playbox;
    dispatch({ type: "TOGGLE_PLAY_BOX" });
    var list;
    if (isFm) {
      list = fmList;
    } else {
      list = curList;
    }
  };
}
