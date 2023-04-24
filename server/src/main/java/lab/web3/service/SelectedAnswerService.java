package lab.web3.service;

import lab.web3.model.Answer;
import lab.web3.model.SelectedAnswer;
import lab.web3.repository.SelectedAnswerRepository;
import lab.web3.util.SelectedAnswerNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SelectedAnswerService {
    private final SelectedAnswerRepository selectedAnswerRepository;

    public SelectedAnswer findOne(int id){
        Optional<SelectedAnswer> answer = selectedAnswerRepository.findById(id);
        return answer.orElseThrow(()-> new SelectedAnswerNotFoundException("Answer not found" + id));
    }

    public SelectedAnswer findByAnswerId(int id){
        return selectedAnswerRepository.findByAnswerId(id);
    }

    public void saveAnswer(SelectedAnswer answer){
        selectedAnswerRepository.save(answer);
    }
}
