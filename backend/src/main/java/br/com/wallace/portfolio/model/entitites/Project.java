package br.com.wallace.portfolio.model.entitites;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String slug;
    private String description;
    private String shorDescription;
    private String thumbnail;
    private List<String> imagems;
    private List<String> techonologies;
    private String category;
    private boolean featured;
    private String githubUrl;
    private String liveUrl;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private List<String> tags;
    private List<String> challenges;
    private List<String> learnings;
    private String clientType;

}
