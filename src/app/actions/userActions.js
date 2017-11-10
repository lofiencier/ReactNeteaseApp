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
