import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { Answer, SelectedAnswer, Survey } from "./data_types";

const axios: AxiosInstance = Axios.create({ baseURL: 'http://localhost:8000' });


async function getAllSurveys(): Promise<Survey[]> {
	return await axios.get<Survey[]>("api/survey")
		.then((response: AxiosResponse<Survey[], any>): Survey[] => { return response.data; });
}

async function getAllAnswersFromSurvey(id: number): Promise<Answer[]> {
	return await axios.get<Answer[]>("api/answer/" + id)
		.then((response: AxiosResponse<Answer[], any>): Answer[] => { return response.data; });
}

async function createSurvey(survey: any): Promise<any> {
	return await axios.post<any>("api/survey", survey)
		.then((response) => { return response.data; });
}

async function createSelectedAnswer(answer: SelectedAnswer): Promise<SelectedAnswer> {
	return await axios.post<SelectedAnswer>("/api/selected-answer", answer)
		.then((response: AxiosResponse<SelectedAnswer>): SelectedAnswer => { return response.data; });
}

async function getSelectedAnswer(id: number): Promise<SelectedAnswer> {
	return await axios.get<SelectedAnswer>("api/selected-answer/" + id)
		.then((response: AxiosResponse<SelectedAnswer>): SelectedAnswer => { return response.data; });
}

async function getIP(): Promise<any> {
	return await Axios.get<any>("https://api.ipify.org")
		.then((response) => { return response.data; });
}


export default { getAllSurveys, getAllAnswersFromSurvey, createSurvey, createSelectedAnswer, getSelectedAnswer, getIP };