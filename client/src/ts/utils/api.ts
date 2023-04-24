import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { Answer, Survey } from "./data_types";

const axios: AxiosInstance = Axios.create({ baseURL: 'http://localhost:8000' });


async function getAllSurveys(): Promise<Survey[]> {
	return await axios.get<Survey[]>("api/survey")
		.then((response: AxiosResponse<Survey[], any>): Survey[] => { return response.data; });
}

async function getAllAnswersFromSurvey(id: number): Promise<Answer[]> {
	return await axios.get<Answer[]>("api/answer/" + id)
		.then((response: AxiosResponse<Answer[], any>): Answer[] => { return response.data; });
}


export default { getAllSurveys, getAllAnswersFromSurvey };