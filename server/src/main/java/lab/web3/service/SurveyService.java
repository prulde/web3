package lab.web3.service;

import lab.web3.model.Survey;
import lab.web3.repository.SurveyRepository;
import lab.web3.util.SurveyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SurveyService {
    private final SurveyRepository surveyRepository;

    public Survey findOne(int id){
        Optional<Survey> survey = surveyRepository.findById(id);
        return survey.orElseThrow(()-> new SurveyNotFoundException("Survey not found" + id));
    }

    public List<Survey> findAll() {
        return surveyRepository.findAll();
    }

    public List<Survey> findPublicSurveys() { return surveyRepository.findPublicSurveys(); }

    public void save(Survey survey) {
        surveyRepository.save(survey);
    }
}
