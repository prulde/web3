package lab.web3.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "selected_answer")
public class SelectedAnswer {
    @Id
    @Column(name = "selected_answer_id")
    private int selected_answer_id;

    @Column(name = "answer_id")
    private int answer_id;

    @Column(name = "ip_address")
    private String ip_address;

    @Column(name = "answer_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
   // @JsonProperty("beginTime")
    private ZonedDateTime answer_date;
}
