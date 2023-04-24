import api from "./utils/api";
import { Answer, Survey, SelectedAnswer } from "./utils/data_types";


// api.getAllSurveys().then((response: Survey[]): void => {
// 	console.log(JSON.stringify(response));
// });

// // use survey id not answer
// api.getAllAnswersFromSurvey(1).then((response: Answer[]): void => {
// 	console.log(JSON.stringify(response));
// });

let surveys: Survey[] = [];

((): void => {
	loadMain();
})();

function clearPage(): void {
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild);
	}
}

// htmlpage
function loadMain(): void {

	let button: HTMLButtonElement = document.createElement("button");
	api.getAllSurveys().then((response: Survey[]): void => {
		console.log(JSON.stringify(response));

		surveys = response;

		surveys.forEach((survey: Survey): void => {
			const bigDiv: HTMLDivElement = document.createElement("div");
			bigDiv.classList.add("survey");

			bigDiv.addEventListener("click", (e: Event): void => {
				e.preventDefault();
				clearPage();
				addToMainButton();
				loadSurvey(survey);
			});

			const textNode: HTMLParagraphElement = document.createElement("p");
			textNode.innerHTML = "<p> " + survey.survey_name + " </p>";

			bigDiv.appendChild(textNode);
			document.body.appendChild(bigDiv);
		});

		button.addEventListener("click", (e: Event): void => {
			e.preventDefault();
			clearPage();
			addToMainButton();
			postSurvey();
		});

		button.textContent = "Create new survey";
		document.body.appendChild(button);
	});
}

// htmlpage
function loadSurvey(survey: Survey): void {

	api.getAllAnswersFromSurvey(survey.survey_id).then((response: Answer[]): void => {
		console.log(JSON.stringify(response));

		//////////////////////////////////////////////////////////////////////////////////////////////////////////

		for (const answer of response) {
			api.getSelectedAnswer(answer.answer_id).then((response: SelectedAnswer): void => {

				if (response.answer_id === answer.answer_id) {

					api.getIP().then((resp: any): void => {
						console.log(JSON.stringify(resp));
						if (response.ip_address == resp) {
							clearPage();
							addToMainButton();
							answeredSurvey(response, survey);
							return;
						}

					});
				}

			});
		}

		//////////////////////////////////////////////////////////////////////////////////////////////////////////

		let surveyPage: HTMLDivElement = document.createElement("div");
		surveyPage.classList.add("surveypage");
		surveyPage.innerHTML = `	
		<p>Survey description</p>
		<p>${survey.survey_text}</p>
		<p>Chose one answer</p>
		`;

		let select: HTMLSelectElement = document.createElement("select");
		select.classList.add("sel");

		response.forEach((answer: Answer): void => {
			let newAnswer: HTMLOptionElement = document.createElement("option");
			newAnswer.value = answer.answer_id.toString();
			newAnswer.innerText = answer.answer_text;
			select.appendChild(newAnswer);
		});

		surveyPage.appendChild(select);
		document.body.appendChild(surveyPage);

		let postAnswer = document.createElement("button");
		postAnswer.innerText = "post answer";
		postAnswer.addEventListener("click", (e: Event): void => {
			let sel: HTMLSelectElement | null = document.querySelector("select");

			if (!sel)
				return;


			api.getIP().then((response: any): void => {
				console.log(JSON.stringify(response));

				api.createSelectedAnswer({ answer_id: parseInt(sel!.value), ip_address: response }).then((resp: SelectedAnswer): void => {
					console.log(resp);
				});

			});

		});

		document.body.appendChild(postAnswer);
	});
}

// htmlpage
function answeredSurvey(answ: SelectedAnswer, survey: Survey): void {
	console.log(answ);

	api.getAllAnswersFromSurvey(survey.survey_id).then((response: Answer[]): void => {

		let surveyPage: HTMLDivElement = document.createElement("div");
		surveyPage.classList.add("surveypage");
		surveyPage.innerHTML = `	
		<p>Survey description</p>
		<p>${survey.survey_text}</p>
		`;

		let select: HTMLSelectElement = document.createElement("select");
		select.classList.add("sel");

		response.forEach((answer: Answer): void => {

			if (answer.answer_id == answ.answer_id) {
				surveyPage.innerHTML += `<p>You chose "${answer.answer_text}" answer</p>`;
			}
			let newAnswer: HTMLOptionElement = document.createElement("option");
			newAnswer.value = answer.answer_id.toString();
			newAnswer.innerText = answer.answer_text;
			select.appendChild(newAnswer);
		});

		surveyPage.appendChild(select);
		document.body.appendChild(surveyPage);

		let postAnswer = document.createElement("button");
		postAnswer.innerText = "post answer";
		postAnswer.addEventListener("click", (e: Event): void => {
			let sel: HTMLSelectElement | null = document.querySelector("select");

			if (!sel)
				return;


			api.getIP().then((response: any): void => {
				console.log(JSON.stringify(response));

				api.createSelectedAnswer({ answer_id: parseInt(sel!.value), ip_address: response }).then((resp: SelectedAnswer): void => {
					console.log(resp);
				});

			});

		});

		document.body.appendChild(postAnswer);
	});

}

function addToMainButton(): void {
	let toMain: HTMLDivElement = document.createElement("div");
	toMain.classList.add("tomain");
	let innText: HTMLParagraphElement = document.createElement("p");
	innText.innerText = "main page";
	innText.addEventListener("click", (e: Event): void => {
		e.preventDefault();
		clearPage();
		loadMain();
	});

	toMain.appendChild(innText);
	document.body.appendChild(toMain);
}

// htmlpage
function postSurvey(): void {
	let post: HTMLDivElement = document.createElement("div");
	post.classList.add("post");
	post.innerHTML = `
	Enter survey name:
	<div>
		<input type="text" id="name">
	</div>
	Enter survey description:
	<div>
		<input type="text" id="description">
	</div>
	Make this survey private:
	<div>
		<input type="checkbox" id="private">
	</div>
	`;

	let butt: HTMLInputElement = document.createElement("input");
	butt.type = "button";
	butt.value = "add answer";
	butt.addEventListener("click", (): void => {
		let inp: HTMLDivElement = document.createElement("div");
		inp.classList.add("answerinput");
		inp.innerHTML = `
	Enter answer:
	<div>
		<input type="text" id="answer">
	</div>
	`;
		post.appendChild(inp);
	});

	let postButt: HTMLInputElement = document.createElement("input");
	postButt.type = "button";
	postButt.value = "post answer";
	postButt.addEventListener("click", (): void => {
		let answerCount: number = 0;
		let survey;
		let name: HTMLInputElement | null = document.querySelector("#name");
		let description: HTMLInputElement | null = document.querySelector("#description");
		let makePrivate: HTMLInputElement | null = document.querySelector("#private");
		let answers: NodeListOf<HTMLInputElement> = document.querySelectorAll("#answer");

		console.log(name?.value);
		console.log(description?.value);
		console.log(makePrivate?.checked);

		answers.forEach((answ: HTMLInputElement): void => {
			console.log(answ.value);
			answerCount++;
		});

		if (!name?.value || !description?.value || answerCount < 2) {
			console.log("cant post");
			return;
		}

		let toPost: any[] = [];
		answers.forEach((answ: HTMLInputElement): void => {
			toPost.push({
				answer_text: answ.value
			});
		});

		survey = {
			survey: {
				survey_name: name.value,
				survey_text: description.value,
				survey_link: "not_used",
				survey_flag: makePrivate?.checked === false ? 0 : 1
			},
			answers: toPost
		};

		api.createSurvey(survey).then((response): void => {
			console.log(JSON.stringify(response));

		});

	});

	post.appendChild(butt);
	post.appendChild(postButt);
	document.body.appendChild(post);
}

