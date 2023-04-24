package lab.web3.controller;

import lab.web3.model.SelectedAnswer;
import lab.web3.service.SelectedAnswerService;
import lab.web3.util.SurveyNotCreatedException;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/selected-answer")
@RequiredArgsConstructor
public class SelectedAnswerController {
    private final SelectedAnswerService selectedAnswerService;

    @GetMapping("/{id}")
    public SelectedAnswer getSelectedAnswer(@PathVariable("id") int id){
        return selectedAnswerService.findByAnswerId(id);
    }

    @PostMapping
    public @ResponseBody SelectedAnswer postSelectedAnswer(@RequestBody SelectedAnswer answer,
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

        selectedAnswerService.saveAnswer(answer);
        return answer;
    }
}
