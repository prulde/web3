interface Survey {
	survey_id: number;
	survey_name: string;
	survey_text: string;
	survey_link: string;
	survey_flag: number;
}

interface Answer {
	answer_id: number;
	survey_id: number;
	answer_text: string;
}

interface SelectedAnswer {
	answer_id: number;
	ip_address: string;
}

export { Survey, Answer, SelectedAnswer };