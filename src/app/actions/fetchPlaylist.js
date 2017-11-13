export default function fetchPlaylist(listId) {
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
          dt = dt =
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
// .playlist.name
// .playlist.playCount
// .playlist.coverImgUrl
// .playlist.creator.avatarImgId
// .playlist.creator.city
// .playlist.creator.nickname
// .playlist.creator.signature
// .playlist.trackCount

// .playlist.tracks["0"].id
// .playlist.tracks["0"].name
// .playlist.tracks["0"].mv
// .playlist.tracks["0"].dt
// .playlist.tracks["0"].al.id
// .playlist.tracks["0"].al.name
// .playlist.tracks["0"].ar["0"].id
// .playlist.tracks["0"].ar["0"].name
