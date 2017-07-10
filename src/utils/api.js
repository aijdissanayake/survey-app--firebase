import fire from '../components/fire';
var axios = require('axios');

export default {

	// fetchSurveys: function() {
	// 	var encodedURI = window.encodeURI("https://script.google.com/macros/s/AKfycbySehYgZd1ftj316wdNYQCchQ8GtTUZaTzQsmroosPX0kLY050/exec?noo=nooo");
	// 	var i = 0;
	// 	return axios.get(encodedURI).then(function(response){		
	// 		var areas = response.data.areas;
	// 		var areaTitles = [];
	// 		for (i = 0; i < areas.length; i++){
	// 			areaTitles.push(areas[i]['title']);
	// 		}

	// 		return areaTitles;
	// 	});

	// },

	fetchSurveys: function() {

		return new Promise((resolve, reject) => {

			var dbRef = fire.database().ref('survey');
			var i = 0;
			var areaTitles = [];

			dbRef.on('value', function(snapshot) {

				console.log(snapshot.val());
				var areas = snapshot.val().areas;

				for (i = 0; i < areas.length; i++){
					areaTitles.push(areas[i]['title']);
				}							
			});

			resolve(areaTitles);

		})
	},

	fetchtitle: function() {

		// var encodedURI = window.encodeURI("https://script.google.com/macros/s/AKfycbySehYgZd1ftj316wdNYQCchQ8GtTUZaTzQsmroosPX0kLY050/exec");

		// return axios.get(encodedURI).then(function(response){
		// 	return response.data.title[0];
		// });
		return new Promise((resolve, reject) => {

			var title = "";
			var dbRef = fire.database().ref('survey/title').on('value', function(snapshot) { title = snapshot.val()});

	},

	fetchquiz: function(area){
		var encodedURI = window.encodeURI("https://script.google.com/macros/s/AKfycbySehYgZd1ftj316wdNYQCchQ8GtTUZaTzQsmroosPX0kLY050/exec");
		var i = 0;

		return axios.get(encodedURI).then(function(response){
			var areas = response.data.areas;
			var quiz= null;
			for (i = 0; i < areas.length; i++){
				if (areas[i].title == area) {
					quiz = areas[i].questions;
				}
			}

			return quiz;
		});

	},

	submitQuiz: function(title, response){

		var resp = {};
		resp["title"] = title;
		resp["choices"] = response;
		var resp_str = JSON.stringify(resp);

		fire.database().ref('responses/new').set(resp);
		fire.database().ref('messages').push( "responsed_api" );

		var encodedURI = window.encodeURI("https://script.google.com/macros/s/AKfycbySehYgZd1ftj316wdNYQCchQ8GtTUZaTzQsmroosPX0kLY050/exec?data="+resp_str);
		var i = 0;

		return axios.get(encodedURI).then(function(response){})
		.catch(function (error) {
			console.log(error);
		});



	}     
}
