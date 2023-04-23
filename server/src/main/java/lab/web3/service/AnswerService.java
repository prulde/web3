package lab.web3.service;

import lab.web3.model.Answer;
import lab.web3.repository.AnswerRepository;
import lab.web3.util.AnswerNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public Answer findOne(int id){
        Optional<Answer> answer = answerRepository.findById(id);
        return answer.orElseThrow(()-> new AnswerNotFoundException("Answer not found" + id));
    }

    public List<Answer> findAll() {
        return answerRepository.findAll();
    }

    public void save(Answer answer) {
        answerRepository.save(answer);
    }
}
