const express = require("express");
const router = express();
const { createWebAPIRequest } = require("../util/util");

router.get("/", (req, res) => {
  const id = req.query.id;
  const br = req.query.br || 999000;
  const data = {
    ids: [id],
    br: br,
    csrf_token: ""
  };
  // const cookie = req.get('Cookie')+"; Domain=.music.163.com" ? req.get('Cookie') : ''
  cookie =
    "MUSIC_U=7c288d89fd509469a43d59fb2e408af0edf7eec218ede129cc0c4f606abc646270ce4b68169bdafb54ee1da90b1bfeaffe2897047e8106fb; __csrf=8327bf9a2ed230b561a6407050a0121e; Domain=.music.163.com";
  createWebAPIRequest(
    "music.163.com",
    "/weapi/song/enhance/player/url",
    "POST",
    data,
    cookie,
    music_req => {
      res.setHeader("Content-Type", "application/json");
      res.send(music_req);
    },
    err => {
      res.status(502).send("fetch error");
    }
  );
});

module.exports = router;
