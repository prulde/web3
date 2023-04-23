package lab.web3.repository;

import lab.web3.model.Answer;
import lab.web3.model.SelectedAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Integer> {

    @Query(value = "select * from answer where (survey_id = :survey_id) ",nativeQuery = true)
    public List<Answer> findBySurveyId(@Param("survey_id") int survey_id);
}


