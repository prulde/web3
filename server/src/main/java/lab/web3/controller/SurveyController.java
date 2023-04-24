package lab.web3.controller;

import lab.web3.dto.AnswerDto;
import lab.web3.dto.PostSurveyDto;
import lab.web3.dto.ReturnSurveyDto;
import lab.web3.model.Answer;
import lab.web3.model.Survey;
import lab.web3.service.AnswerService;
import lab.web3.service.SurveyService;
import lab.web3.util.SurveyNotCreatedException;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/survey")
@RequiredArgsConstructor
public class SurveyController {
    private final SurveyService surveyService;
    private final AnswerService answerService;

    @GetMapping("/{id}")
    public Survey getSurvey(@PathVariable("id") int id) {
        return surveyService.findOne(id);
    }

    @GetMapping()
    public List<Survey> getAllPublicSurveys() {
        return surveyService.findPublicSurveys();
    }

    //{
    //    "survey":{"survey_name":"test",
    //    "survey_text":"123",
    //    "survey_link":"123",
    //    "survey_flag":"0"
    //    },
    //    "answers":[{
    //        "answer_text":"text"
    //    }, {
    //        "answer_text":"222"
    //    }]
    //}
    @PostMapping
    public @ResponseBody ReturnSurveyDto createSurvey(@RequestBody PostSurveyDto survey,
                                                    BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            StringBuilder errorMassage = new StringBuilder();

            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError fieldError : errors) {
                errorMassage.append(fieldError.getField())
                        .append(" - ").append(fieldError.getDefaultMessage())
                        .append(";");
            }
            throw new SurveyNotCreatedException(errorMassage.toString());
        }

        surveyService.save(survey.getSurvey());

        List<Answer> answerList = new ArrayList<Answer>();

        for(AnswerDto answer : survey.getAnswers()){
            Answer newAnswer= new Answer();
            newAnswer.setSurvey_id(survey.getSurvey().getSurvey_id());
            newAnswer.setAnswer_text(answer.getAnswer_text());
            answerList.add(newAnswer);
            answerService.save(newAnswer);
        }
        //survey.getSurvey_id(),survey.getSurvey_name(), survey.getSurvey_text(), survey.getSurvey_link(), survey.getSurvey_flag()
        return new ReturnSurveyDto(survey.getSurvey(), answerList);
    }
}
