package lab.web3.repository;

import lab.web3.model.SelectedAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelectedAnswerRepository extends JpaRepository<SelectedAnswer,Integer> {
    @Query(value = "select * from selected_answer where (answer_id = :answer_id) ",nativeQuery = true)
    public SelectedAnswer findByAnswerId(@Param("answer_id") int answer_id);
}

