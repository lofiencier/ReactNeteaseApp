import React from "react";

export default class List extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate() {}

  render() {
    let lists = this.props.songs.map((song, index) => {
      return (
        <tr key={index}>
          <td>
            <span>{index + 1}</span>
          </td>
          <td>{song.name}</td>
          <td>{song.artists[0].name}</td>
          <td>{song.duration}</td>
          <td>
            <a href={"/#/album?id=" + song.album.id}>{song.album.name}</a>
          </td>
          <td>
            <a href={"/#/mv?id=" + song.mvid}>MV</a>
          </td>
          <td>
            <a
              href="javascript:void(0)"
              onClick={this.props.playHandler}
              data-id={song.id}
            >
              PLAY
            </a>
          </td>
          <td>
            <a href="javascript:void(0)">+</a>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left" }} />
            <th style={{ textAlign: "left" }}>NAME</th>
            <th style={{ textAlign: "left" }}>ARITIST</th>
            <th style={{ textAlign: "left" }}>DUR</th>
            <th style={{ textAlign: "left" }}>AL</th>
          </tr>
          {lists}
        </tbody>
      </table>
    );
  }
}

// let lists = this.props.songs.map(song => (
//       <tr key={song.id}>
//         <td>
//           <a
//             href="javascript:void(0)"
//             data-id={song.id}
//             onClick={this.props.playHandler}
//           >
//             <small>PLAY</small>
//           </a>
//         </td>
//         <td>{song.name}</td>
//         <td>{song.artists[0].name}</td>
//         <td>
//           <a href="#" data-id={song.album.id}>
//             <small>{song.album.name}</small>
//           </a>
//         </td>
//       </tr>
//     ));
//     return (
//       <table>
//         <tbody>
//           <tr>
//             <th style={{ textAlign: "left" }}>PLAY</th>
//             <th style={{ textAlign: "left" }}>NAME</th>
//             <th style={{ textAlign: "left" }}>ARITIST</th>
//             <th style={{ textAlign: "left" }}>ALBUM</th>
//           </tr>
//           {lists}
//         </tbody>
//       </table>
//     );
