package lab.web3.controller;

import lab.web3.model.Answer;
import lab.web3.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @GetMapping("/{id}")
    public Answer getAnswer(@PathVariable("id") int id) {
        return answerService.findOne(id);
    }

    @GetMapping()
    public List<Answer> getAllAnswers() {
        return answerService.findAll();
    }
}
