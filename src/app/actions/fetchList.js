export default function fetchList(keywords) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_LIST" });
    fetch(`http://localhost:3000/api/search?keywords=${keywords}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        dispatch({ type: "RECIEVE_LIST", data: data.result.songs });
      })
      .catch(function(err) {
        dispatch({ type: "FETCH_LIST_FAILED", err: err });
      });
  };
}
