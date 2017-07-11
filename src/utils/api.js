import fire from '../components/fire';
var axios = require('axios');

export default {

	fetchSurveys: function() {

		return new Promise((resolve, reject) => {

			var dbRef = fire.database().ref('survey_details/area_titles');
			var i = 0;
			var areaTitles = [];

			dbRef.on('value', function(snapshot) {

				var allAreas = snapshot.val();

				for (i = 0; i < allAreas.length; i++){
					if(allAreas[i]["active"]){
						areaTitles.push(allAreas[i]['title']);
					}					
				}
				resolve(areaTitles);							
			});
			

		})
	},

	fetchtitle: function() {

		return new Promise((resolve, reject) => {

			var title = "";
			var dbRef = fire.database().ref('survey_details/current_survey/title').on('value', function(snapshot) {
				title = snapshot.val();
				resolve(title);
			});
		});

	},

	fetchquiz: function(area){

		return new Promise((resolve, reject) => {

			var quiz = "";
			var dbRef = fire.database().ref('survey_details/'+area+'/active')
			dbRef.on('value', function(snapshot) {
				var activeQuiz = snapshot.val();
				resolve(activeQuiz);
			});
			
		});

	},

	submitQuiz: function(title, response,quiz,questionSetNo){

		var total = 5 ;

		var db =  fire.database().ref('responses_details/total');

		var getTotal = function() {

			return new Promise((resolve, reject) => {
				db.on('value', function(snapshot) {
					resolve(Number(snapshot.val()));
				});
			});

		}

		getTotal().then(function(tot) { 
			total = tot;
			var survey_response = {};
			var q_with_a = [];

			for (var i = 0 ; i < quiz.length ; i++) {
				var q_object = {}
				q_object["title"] = quiz[i].title;
				var answers = {} 

				for (var j = 0 ; j < quiz[i].choices.length ; j++) {
					answers[quiz[i].choices[j]] = response[i][j];
				}

				q_object["answers"] = answers;

				q_with_a.push(q_object);
			}

			var response_no = total + 1;
			survey_response["response_no"] = response_no;
			survey_response["title"] = title;
			survey_response["question_set_no"] = questionSetNo;
			survey_response["response"] = q_with_a;

			console.log(survey_response);


			fire.database().ref('responses_details/total').set(response_no);
			fire.database().ref('responses_details/responses/'+response_no).set(survey_response);


		});

		
	}     
}
