import api from "./utils/api";
import { Answer, Survey } from "./utils/data_types";


api.getAllSurveys().then((response: Survey[]): void => {
	console.log(JSON.stringify(response));
});

// use survey id not answer
api.getAllAnswersFromSurvey(1).then((response: Answer[]): void => {
	console.log(JSON.stringify(response));
});

let surveys: Survey[] = [];
let button: HTMLButtonElement = document.createElement("button");

((): void => {
	loadMain();
})();

function clearPage(): void {
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild);
	}
}

function loadMain(): void {
	api.getAllSurveys().then((response: Survey[]): void => {
		surveys = response;

		surveys.forEach((survey: Survey): void => {
			const bigDiv: HTMLDivElement = document.createElement("div");
			bigDiv.classList.add("survey");

			bigDiv.addEventListener("click", (e: Event): void => {
				e.preventDefault();
				clearPage();
				loadSurvey(survey);
			});

			const textNode: HTMLParagraphElement = document.createElement("p");
			textNode.innerHTML = "<p> " + survey.survey_name + " </p>";

			bigDiv.appendChild(textNode);
			document.body.appendChild(bigDiv);
		});

		//	button.addEventListener("click", openSurvey);
		// button.textContent = "Create new survey";
		// body!.appendChild(button);
	});
}

function loadSurvey(survey: Survey): void {

	api.getAllAnswersFromSurvey(survey.survey_id).then((response: Answer[]): void => {
		let surveyPage: HTMLDivElement = document.createElement("div");
		surveyPage.classList.add("answer");
		surveyPage.innerHTML = `	
		<p>Survey description</p>
		<p>${survey.survey_text}</p>
		<p>Chose one answer</p>
		`;
		response.forEach((answer: Answer): void => {
			let newAnswer: HTMLDivElement = document.createElement("div");
			newAnswer.innerHTML = `
			<input type="checkbox">${answer.answer_text} </input>
			`;
			surveyPage.appendChild(newAnswer);
		});

		document.body.appendChild(surveyPage);

		let postAnswer = document.createElement("button");
		postAnswer.innerText = "post answer";

		document.body.appendChild(postAnswer);

		let toMain: HTMLDivElement = document.createElement("div");
		toMain.innerHTML = `
		<div> main page </div>
		`;
		toMain.addEventListener("click", (e: Event): void => {
			e.preventDefault();
			clearPage();
			loadMain();
		});

		document.body.appendChild(toMain);
	});
}