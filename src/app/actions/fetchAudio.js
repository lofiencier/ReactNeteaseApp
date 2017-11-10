export default function fetchList(song_id) {
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
//不同的actions可以对应同一个reducer
//所以大概在getAlbum的时候可以复用那个reducer咯
