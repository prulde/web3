package lab.web3.dto;

import lab.web3.model.Survey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostSurveyDto {
//    private int survey_id;
//    private String survey_name;
//    private String survey_text;
//    private String survey_link;
//    private byte survey_flag;
    private Survey survey;
    private List<AnswerDto> answers;
}
