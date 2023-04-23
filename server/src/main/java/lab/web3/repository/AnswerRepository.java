package lab.web3.repository;

import lab.web3.model.Answer;
import lab.web3.model.SelectedAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Integer> {
}


