package lab.web3.repository;

import lab.web3.model.SelectedAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelectedAnswerRepository extends JpaRepository<SelectedAnswer,Integer> {
}

