package lab.web3.repository;

import lab.web3.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey,Integer> {

    @Query(value = "select * from survey where (survey_flag = 0) ",nativeQuery = true)
    public List<Survey> findPublicSurveys();
}
