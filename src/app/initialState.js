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
    },
    user: {
      isLoged: false,
      userId: NaN,
      userCookie: null,
      avatarImgURL: "",
      nickname: "",
      signature: "",
      info: [],
      loginErr: null,
      collection: [],
      collection_err: null
    }
  };
}
export default initialState();
