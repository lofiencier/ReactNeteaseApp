import React from "react"
import ReactDOM from 'react-dom'




ReactDOM.render(
	<div>
	<form id="form_1">
		<input type="text" id="song_name"/>
	</form>
		<button onClick={fetchData}>Search</button></div>
	, document.getElementById('root'))

function fetchData(){
	let keywords=document.getElementById('song_name').value;
	console.log(keywords);
	try{
		fetch(`http://localhost:3000/api/search?keywords=${keywords}`).then(function(res){
			console.log('fetching...');
			return res.json();
		}).then(function(data){
			showData(data);
		}).catch(function(err){
			throw err;
		})
	}catch(err){
		console.log(err)
	}
}

function showData(data){

}