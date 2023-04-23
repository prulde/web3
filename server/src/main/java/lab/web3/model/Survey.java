package lab.web3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "survey")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private int survey_id;

    @Column(name = "survey_name")
    private String survey_name;

    @Column(name = "survey_text")
    private String survey_text;

    @Column(name = "survey_link")
    private String survey_link;

    @Column(name = "survey_flag")
    private byte survey_flag;
}
