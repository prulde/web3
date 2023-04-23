package lab.web3.dto;

import lab.web3.model.Answer;
import lab.web3.model.Survey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReturnSurveyDto {
    Survey survey;
    List<Answer> answerList;
}
