import React from "react"
import ReactDOM from 'react-dom'




function fetchData(){
	let keywords=document.querySelector('#song_name').value;

	fetch(`http://localhost:3000/api/search?keywords=${keywords}`).then(function(res){
		return res.json();
	}).then(function(data){
		console.log(data);
	})
}

ReactDOM.render(
	<h1>hello again and agian</h1>
	, document.getElementById('root'))


