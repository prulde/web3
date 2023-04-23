import api from "./api";
import { Answer, Survey } from "./data_types";


api.getAllSurveys().then((response: Survey[]): void => {
	console.log(JSON.stringify(response));
});

// use survey id not answer
api.getAllAnswersFromSurvey(1).then((response: Answer[]): void => {
	console.log(JSON.stringify(response));
});