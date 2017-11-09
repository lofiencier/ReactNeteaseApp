//可以在这里读取cookie重置state哟
function initialState() {
  let AudioDom = document.createElement("Audio");

  return {
    curShowList: {
      fetching: false,
      fetched: false,
      err: null,
      targetList: []
    },
    Audio: {
      AudioDom: AudioDom,
      fetching: false,
      fetched: false,
      err: null,
      targetURL: ""
    }
  };
}
export default initialState();

//AudioDom 行不通？
